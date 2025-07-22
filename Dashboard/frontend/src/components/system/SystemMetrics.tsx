'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Cpu, 
  HardDrive, 
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Gauge
} from 'lucide-react';
import { useSystemStore } from '@/store/systemStore';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SystemMetrics() {
  const { metrics, fetchMetrics } = useSystemStore();
  const [performanceHistory, setPerformanceHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchMetrics();
    // Update metrics every 10 seconds
    const interval = setInterval(() => {
      fetchMetrics();
      // Add to history for charts
      setPerformanceHistory(prev => {
        const newEntry = {
          time: new Date().toLocaleTimeString(),
          cpu: metrics.performance.cpu,
          memory: metrics.performance.memory,
          tasks: metrics.agentUtilization
        };
        const history = [...prev, newEntry].slice(-20); // Keep last 20 entries
        return history;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getHealthColor = (value: number) => {
    if (value < 50) return 'text-green-500';
    if (value < 80) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getHealthBadge = (health: string) => {
    const variants: Record<string, any> = {
      healthy: 'success',
      degraded: 'warning',
      critical: 'destructive',
      unknown: 'secondary'
    };
    return variants[health] || 'secondary';
  };

  return (
    <div className="space-y-6">
      {/* Resource Usage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">CPU Usage</span>
            </div>
            <span className={`text-2xl font-bold ${getHealthColor(metrics.performance.cpu)}`}>
              {metrics.performance.cpu}%
            </span>
          </div>
          <Progress value={metrics.performance.cpu} className="h-2" />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Memory</span>
            </div>
            <span className={`text-2xl font-bold ${getHealthColor(metrics.performance.memory)}`}>
              {metrics.performance.memory}%
            </span>
          </div>
          <Progress value={metrics.performance.memory} className="h-2" />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Disk Usage</span>
            </div>
            <span className={`text-2xl font-bold ${getHealthColor(metrics.performance.diskUsage)}`}>
              {metrics.performance.diskUsage}%
            </span>
          </div>
          <Progress value={metrics.performance.diskUsage} className="h-2" />
        </Card>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Agent Utilization</p>
            <p className="text-2xl font-bold">{metrics.agentUtilization}%</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Gauge className="h-3 w-3" />
              <span>Average workload</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Task Success Rate</p>
            <p className="text-2xl font-bold">
              {metrics.totalTasks > 0 
                ? Math.round((metrics.completedTasks / metrics.totalTasks) * 100)
                : 0}%
            </p>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-green-500">{metrics.completedTasks}</span>
              <span className="text-muted-foreground">/</span>
              <span>{metrics.totalTasks}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Error Rate</p>
            <p className={`text-2xl font-bold ${metrics.errorRate > 5 ? 'text-red-500' : 'text-green-500'}`}>
              {metrics.errorRate.toFixed(1)}%
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {metrics.errorRate > 5 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-red-500" />
                  <span>Above threshold</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-green-500" />
                  <span>Normal</span>
                </>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Messages/min</p>
            <p className="text-2xl font-bold">{metrics.messageVolume}</p>
            <Badge variant={getHealthBadge(metrics.systemHealth)}>
              {metrics.systemHealth}
            </Badge>
          </div>
        </Card>
      </div>

      {/* Performance Chart */}
      {performanceHistory.length > 0 && (
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-4">Performance Trends</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={performanceHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="cpu" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.3} 
                name="CPU %"
              />
              <Area 
                type="monotone" 
                dataKey="memory" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.3} 
                name="Memory %"
              />
              <Area 
                type="monotone" 
                dataKey="tasks" 
                stroke="#f59e0b" 
                fill="#f59e0b" 
                fillOpacity={0.3} 
                name="Agent Util %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Alerts Summary */}
      {metrics.alerts > 0 && (
        <Card className="p-4 border-yellow-500/50">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <span className="font-medium">Active Alerts</span>
            <Badge variant="warning" className="ml-auto">
              {metrics.alerts}
            </Badge>
          </div>
        </Card>
      )}
    </div>
  );
}