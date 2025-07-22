'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  FolderOpen, 
  Clock, 
  Users, 
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  MoreVertical
} from 'lucide-react';
import { useProjectStore } from '@/store/projectStore';
import { formatDistanceToNow } from 'date-fns';

const statusColors = {
  PLANNING: 'secondary',
  ACTIVE: 'default',
  COMPLETED: 'success',
  PAUSED: 'warning',
  CANCELLED: 'destructive'
} as const;

const statusIcons = {
  PLANNING: <Clock className="h-4 w-4" />,
  ACTIVE: <Play className="h-4 w-4" />,
  COMPLETED: <CheckCircle className="h-4 w-4" />,
  PAUSED: <Pause className="h-4 w-4" />,
  CANCELLED: <AlertCircle className="h-4 w-4" />
};

export default function ProjectList() {
  const router = useRouter();
  const { projects = [], fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
    // Refresh every 30 seconds
    const interval = setInterval(fetchProjects, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  // Ensure projects is always an array
  const projectList = Array.isArray(projects) ? projects : [];

  return (
    <div className="space-y-4">
      {projectList.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground">No projects yet</p>
            <p className="text-sm text-muted-foreground mb-4">Start a new project to see it here</p>
            <Button onClick={() => router.push('/projects/new')}>
              Create First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        projectList.map((project) => (
          <Card 
            key={project.id} 
            className="hover:shadow-lg transition-all cursor-pointer"
            onClick={() => handleProjectClick(project.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {project.type} • Started {formatDistanceToNow(new Date(project.startDate), { addSuffix: true })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={statusColors[project.status as keyof typeof statusColors]}>
                    <span className="flex items-center gap-1">
                      {statusIcons[project.status as keyof typeof statusIcons]}
                      {project.status}
                    </span>
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Add dropdown menu for actions
                    }}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Description */}
                {project.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                )}

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span className="font-medium">{Math.round(project.progress)}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Task Stats */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Tasks</p>
                    <p className="font-medium text-lg">{project.taskCount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Completed</p>
                    <p className="font-medium text-lg text-green-600">{project.completedTasks}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Remaining</p>
                    <p className="font-medium text-lg">{project.taskCount - project.completedTasks}</p>
                  </div>
                </div>

                {/* Team */}
                {project.team && project.team.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div className="flex gap-1">
                      {project.team.slice(0, 3).map((agent) => (
                        <Badge key={agent} variant="outline" className="text-xs">
                          {agent}
                        </Badge>
                      ))}
                      {project.team.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.team.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Metrics */}
                {project.metrics && (
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    {project.metrics.velocity && (
                      <span>Velocity: {project.metrics.velocity}</span>
                    )}
                    {project.metrics.qualityScore && (
                      <span>Quality: {project.metrics.qualityScore}%</span>
                    )}
                    {project.metrics.timeEstimate && (
                      <span>Est: {project.metrics.timeEstimate}h</span>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}