'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  FolderOpen, 
  CheckCircle, 
  AlertCircle,
  Activity,
  MessageSquare,
  PlayCircle,
  BookOpen
} from 'lucide-react';

import { useAgentStore } from '@/store/agentStore';
import { useProjectStore } from '@/store/projectStore';
import { useSystemStore } from '@/store/systemStore';

import AgentGrid from '@/components/agents/AgentGrid';
import ProjectList from '@/components/projects/ProjectList';
import ActivityFeed from '@/components/system/ActivityFeed';
import QuickActions from '@/components/dashboard/QuickActions';
import SystemMetrics from '@/components/system/SystemMetrics';
import GuidedTour from '@/components/guide/GuidedTour';

export default function Dashboard() {
  const router = useRouter();
  const agentStore = useAgentStore();
  const projectStore = useProjectStore();
  const systemStore = useSystemStore();
  
  // Ensure we always have arrays even if store returns undefined
  const agents = Array.isArray(agentStore?.agents) ? agentStore.agents : [];
  const projects = Array.isArray(projectStore?.projects) ? projectStore.projects : [];
  const metrics = systemStore?.metrics || {
    systemHealth: 'unknown',
    alerts: 0,
    totalTasks: 0,
    completedTasks: 0,
    failedTasks: 0,
    averageTaskTime: 0,
    agentUtilization: 0,
    messageVolume: 0,
    errorRate: 0,
    performance: {
      cpu: 0,
      memory: 0,
      diskUsage: 0
    }
  };

  useEffect(() => {
    // Initial data fetch
    if (agentStore?.fetchAgents) agentStore.fetchAgents();
    if (projectStore?.fetchProjects) projectStore.fetchProjects();
    if (systemStore?.fetchMetrics) systemStore.fetchMetrics();
  }, []);

  const activeAgents = agents.filter(a => a?.status === 'ONLINE').length;
  const activeProjects = projects.filter(p => p?.status === 'ACTIVE').length;
  const totalTasks = projects.reduce((sum, p) => sum + (p?.taskCount || 0), 0);
  const completedTasks = projects.reduce((sum, p) => sum + (p?.completedTasks || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <GuidedTour />
      
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            AgenticMode Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor and manage your multi-agent development system
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow" data-tour="agents-overview">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeAgents}/{agents.length}</div>
              <p className="text-xs text-muted-foreground">
                {agents.length - activeAgents} offline
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow" data-tour="projects-overview">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProjects}</div>
              <p className="text-xs text-muted-foreground">
                {projects.length} total projects
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow" data-tour="tasks-overview">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Task Progress</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
              </div>
              <Progress 
                value={totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0} 
                className="mt-2"
              />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow" data-tour="health-overview">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Badge variant={metrics.systemHealth === 'healthy' ? 'success' : 'destructive'}>
                  {metrics.systemHealth || 'Unknown'}
                </Badge>
                {metrics.alerts > 0 && (
                  <Badge variant="warning" className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {metrics.alerts}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Metrics</CardTitle>
                  <CardDescription>Real-time performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <SystemMetrics />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system events</CardDescription>
                </CardHeader>
                <CardContent>
                  <ActivityFeed limit={5} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agents">
            <Card>
              <CardHeader>
                <CardTitle>Agent Status</CardTitle>
                <CardDescription>Monitor all agents in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <AgentGrid />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
                <CardDescription>Track project progress and tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>System Activity</CardTitle>
                <CardDescription>Complete activity log</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityFeed />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}