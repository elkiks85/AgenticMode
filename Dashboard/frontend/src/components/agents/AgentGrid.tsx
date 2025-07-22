'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Cpu, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Activity
} from 'lucide-react';
import { useAgentStore } from '@/store/agentStore';
import { formatDistanceToNow } from 'date-fns';

const statusColors = {
  ONLINE: 'success',
  OFFLINE: 'destructive',
  WARNING: 'warning',
  WORKING: 'default'
} as const;

const statusIcons = {
  ONLINE: <CheckCircle className="h-4 w-4" />,
  OFFLINE: <AlertCircle className="h-4 w-4" />,
  WARNING: <Clock className="h-4 w-4" />,
  WORKING: <Activity className="h-4 w-4" />
};

export default function AgentGrid() {
  const { agents, connectSocket, disconnectSocket } = useAgentStore();

  useEffect(() => {
    connectSocket();
    return () => disconnectSocket();
  }, []);

  const getAgentIcon = (agentName: string) => {
    const icons: Record<string, string> = {
      ORCHESTRATOR: '🎯',
      CLIENT: '👤',
      AGENT_MANAGER: '👨‍💼',
      ARCHITECT: '🏗️',
      BACKEND_DEV: '⚙️',
      FRONTEND_DEV: '🎨',
      QA_ENGINEER: '🧪',
      DEVOPS: '🚀',
      SECURITY: '🛡️',
      DOCUMENTOR: '📝',
      AUDITOR: '📊',
      REVIEWER: '👁️',
      TESTER: '🤖',
      DEPLOYMENT: '📦',
      MONITOR: '📡',
      PERFORMANCE: '⚡',
      INTEGRATOR: '🔌'
    };
    return icons[agentName] || '🤖';
  };

  const getAgentDescription = (agentName: string) => {
    const descriptions: Record<string, string> = {
      ORCHESTRATOR: 'Task distribution and coordination',
      CLIENT: 'Human interface and project management',
      AGENT_MANAGER: 'System administration',
      ARCHITECT: 'System design and architecture',
      BACKEND_DEV: 'Server-side development',
      FRONTEND_DEV: 'User interface development',
      QA_ENGINEER: 'Quality assurance and testing',
      DEVOPS: 'Infrastructure and deployment',
      SECURITY: 'Security assessment',
      DOCUMENTOR: 'Technical documentation',
      AUDITOR: 'Compliance and auditing',
      REVIEWER: 'Code review and quality',
      TESTER: 'Automated testing',
      DEPLOYMENT: 'Release management',
      MONITOR: 'Production monitoring',
      PERFORMANCE: 'Performance optimization',
      INTEGRATOR: 'Third-party integrations'
    };
    return descriptions[agentName] || 'Specialized agent';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map((agent) => (
        <Card 
          key={agent.name} 
          className={`hover:shadow-lg transition-all cursor-pointer ${
            agent.status === 'ONLINE' ? 'border-green-500/50' : ''
          }`}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="text-2xl">
                    {getAgentIcon(agent.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {getAgentDescription(agent.name)}
                  </p>
                </div>
              </div>
              <Badge variant={statusColors[agent.status as keyof typeof statusColors]}>
                <span className="flex items-center gap-1">
                  {statusIcons[agent.status as keyof typeof statusIcons]}
                  {agent.status}
                </span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Current Task */}
              {agent.currentTask && (
                <div>
                  <p className="text-sm font-medium mb-1">Current Task</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {agent.currentTask}
                  </p>
                  <Progress value={agent.taskProgress || 0} className="mt-2 h-2" />
                </div>
              )}

              {/* Capabilities */}
              <div>
                <p className="text-sm font-medium mb-2">Top Capabilities</p>
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities?.slice(0, 3).map((cap) => (
                    <Badge key={cap.name} variant="secondary" className="text-xs">
                      {cap.name} ({cap.score})
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Last Heartbeat */}
              {agent.lastHeartbeat && (
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Last seen</span>
                  <span>
                    {formatDistanceToNow(new Date(agent.lastHeartbeat), { addSuffix: true })}
                  </span>
                </div>
              )}

              {/* Metrics */}
              {agent.metrics && (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {agent.metrics.tasksCompleted && (
                    <div>
                      <span className="text-muted-foreground">Tasks: </span>
                      <span className="font-medium">{agent.metrics.tasksCompleted}</span>
                    </div>
                  )}
                  {agent.metrics.successRate && (
                    <div>
                      <span className="text-muted-foreground">Success: </span>
                      <span className="font-medium">{agent.metrics.successRate}%</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}