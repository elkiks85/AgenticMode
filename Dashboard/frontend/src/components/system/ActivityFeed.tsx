'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Activity,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  Zap,
  GitBranch,
  FileText,
  Users
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: string;
  type: 'task' | 'message' | 'system' | 'agent' | 'project';
  action: string;
  description: string;
  timestamp: Date;
  source: string;
  severity?: 'info' | 'success' | 'warning' | 'error';
  metadata?: Record<string, any>;
}

interface ActivityFeedProps {
  limit?: number;
}

const typeIcons = {
  task: <CheckCircle className="h-4 w-4" />,
  message: <MessageSquare className="h-4 w-4" />,
  system: <Activity className="h-4 w-4" />,
  agent: <Users className="h-4 w-4" />,
  project: <GitBranch className="h-4 w-4" />
};

const severityColors = {
  info: 'default',
  success: 'success',
  warning: 'warning',
  error: 'destructive'
} as const;

export default function ActivityFeed({ limit }: ActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration
    const mockActivities: ActivityItem[] = [
      {
        id: '1',
        type: 'agent',
        action: 'ONLINE',
        description: 'BACKEND_DEV agent came online',
        timestamp: new Date(Date.now() - 5 * 60000),
        source: 'AGENT_MANAGER',
        severity: 'success'
      },
      {
        id: '2',
        type: 'task',
        action: 'ASSIGNED',
        description: 'Task "Implement user authentication" assigned to BACKEND_DEV',
        timestamp: new Date(Date.now() - 10 * 60000),
        source: 'ORCHESTRATOR',
        severity: 'info'
      },
      {
        id: '3',
        type: 'project',
        action: 'CREATED',
        description: 'New project "E-commerce Platform" created',
        timestamp: new Date(Date.now() - 15 * 60000),
        source: 'CLIENT',
        severity: 'success'
      },
      {
        id: '4',
        type: 'message',
        action: 'SENT',
        description: 'ARCHITECT sent design proposal to FRONTEND_DEV',
        timestamp: new Date(Date.now() - 20 * 60000),
        source: 'ARCHITECT',
        severity: 'info'
      },
      {
        id: '5',
        type: 'system',
        action: 'ALERT',
        description: 'High memory usage detected on agent TESTER',
        timestamp: new Date(Date.now() - 25 * 60000),
        source: 'MONITOR',
        severity: 'warning'
      },
      {
        id: '6',
        type: 'task',
        action: 'COMPLETED',
        description: 'Task "Setup database schema" completed',
        timestamp: new Date(Date.now() - 30 * 60000),
        source: 'BACKEND_DEV',
        severity: 'success'
      },
      {
        id: '7',
        type: 'agent',
        action: 'ERROR',
        description: 'DEPLOYMENT agent failed to connect to server',
        timestamp: new Date(Date.now() - 35 * 60000),
        source: 'DEPLOYMENT',
        severity: 'error'
      },
      {
        id: '8',
        type: 'system',
        action: 'UPDATE',
        description: 'System configuration updated',
        timestamp: new Date(Date.now() - 40 * 60000),
        source: 'AGENT_MANAGER',
        severity: 'info'
      }
    ];

    setActivities(limit ? mockActivities.slice(0, limit) : mockActivities);
    setLoading(false);

    // TODO: Connect to WebSocket for real-time updates
  }, [limit]);

  const getActionIcon = (activity: ActivityItem) => {
    if (activity.severity === 'error') return <AlertCircle className="h-4 w-4 text-red-500" />;
    if (activity.severity === 'warning') return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    if (activity.severity === 'success') return <CheckCircle className="h-4 w-4 text-green-500" />;
    return typeIcons[activity.type] || <Info className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ScrollArea className={limit ? "h-[300px]" : "h-[600px]"}>
      <div className="space-y-2 pr-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="p-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {getActionIcon(activity)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{activity.source}</span>
                  <Badge 
                    variant={severityColors[activity.severity || 'info']} 
                    className="text-xs"
                  >
                    {activity.action}
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                {activity.metadata && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {Object.entries(activity.metadata).map(([key, value]) => (
                      <Badge key={key} variant="outline" className="text-xs">
                        {key}: {value}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}