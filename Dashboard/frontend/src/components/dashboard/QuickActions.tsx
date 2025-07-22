'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  PlayCircle, 
  Settings, 
  FileText,
  Users,
  RefreshCw,
  Terminal,
  Eye
} from 'lucide-react';

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      icon: <Plus className="h-5 w-5" />,
      title: 'New Project',
      description: 'Start a new development project',
      onClick: () => {
        // Create a new project request file for CLIENT agent
        console.log('Creating new project...');
        router.push('/projects/new');
      },
      variant: 'default' as const,
      'data-tour': 'start-project'
    },
    {
      icon: <Terminal className="h-5 w-5" />,
      title: 'Launch Agents',
      description: 'Start agent terminals',
      onClick: () => {
        router.push('/agents/launcher');
      },
      variant: 'outline' as const
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: 'View Messages',
      description: 'Inter-agent communications',
      onClick: () => {
        router.push('/communications');
      },
      variant: 'outline' as const
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'System Docs',
      description: 'View system documentation',
      onClick: () => {
        router.push('/docs');
      },
      variant: 'outline' as const
    }
  ];

  return (
    <Card data-tour="quick-actions">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and operations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="h-auto flex flex-col items-center justify-center p-4 space-y-2"
              onClick={action.onClick}
              data-tour={action['data-tour']}
            >
              {action.icon}
              <span className="font-medium">{action.title}</span>
              <span className="text-xs text-muted-foreground text-center">
                {action.description}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}