import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class SystemHealth {
  constructor(agenticPath) {
    this.agenticPath = agenticPath;
    this.registryPath = path.join(agenticPath, '_SYSTEM', 'REGISTRY');
    this.logsPath = path.join(agenticPath, 'OPERATIONS', 'LOGS');
    this.metrics = {
      systemHealth: 'healthy',
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
    this.alerts = [];
  }

  async start() {
    console.log('SystemHealth monitor started');
    this.updateMetrics();
    // Update metrics every 30 seconds
    setInterval(() => this.updateMetrics(), 30000);
  }

  async updateMetrics() {
    try {
      // Update system performance metrics
      this.metrics.performance = {
        cpu: this.getCPUUsage(),
        memory: this.getMemoryUsage(),
        diskUsage: await this.getDiskUsage()
      };

      // Update agent metrics
      const agentStats = await this.getAgentStatistics();
      this.metrics.agentUtilization = agentStats.utilization;

      // Update task metrics
      const taskStats = await this.getTaskStatistics();
      this.metrics.totalTasks = taskStats.total;
      this.metrics.completedTasks = taskStats.completed;
      this.metrics.failedTasks = taskStats.failed;

      // Calculate health status
      this.metrics.systemHealth = this.calculateSystemHealth();
      
      // Check for alerts
      this.checkAlerts();
      this.metrics.alerts = this.alerts.length;

    } catch (error) {
      console.error('Error updating metrics:', error);
    }
  }

  getCPUUsage() {
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;

    cpus.forEach(cpu => {
      for (const type in cpu.times) {
        totalTick += cpu.times[type];
      }
      totalIdle += cpu.times.idle;
    });

    const idle = totalIdle / cpus.length;
    const total = totalTick / cpus.length;
    const usage = 100 - ~~(100 * idle / total);
    
    return Math.min(100, Math.max(0, usage));
  }

  getMemoryUsage() {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    return Math.round((usedMem / totalMem) * 100);
  }

  async getDiskUsage() {
    // Simplified disk usage - in real implementation would check actual disk
    return Math.floor(Math.random() * 30) + 40; // Random between 40-70%
  }

  async getAgentStatistics() {
    try {
      const heartbeatsPath = path.join(this.registryPath, 'HEARTBEATS');
      const entries = await fs.readdir(heartbeatsPath, { withFileTypes: true });
      
      const activeAgents = entries.filter(e => e.isFile() && e.name.endsWith('.md')).length;
      const totalAgents = 17; // Total possible agents
      
      return {
        active: activeAgents,
        total: totalAgents,
        utilization: Math.round((activeAgents / totalAgents) * 100)
      };
    } catch {
      return { active: 0, total: 17, utilization: 0 };
    }
  }

  async getTaskStatistics() {
    // Simplified task statistics
    return {
      total: Math.floor(Math.random() * 50) + 20,
      completed: Math.floor(Math.random() * 20) + 10,
      failed: Math.floor(Math.random() * 5),
      inProgress: Math.floor(Math.random() * 10) + 5
    };
  }

  calculateSystemHealth() {
    const { cpu, memory, diskUsage } = this.metrics.performance;
    const { errorRate, agentUtilization } = this.metrics;

    // Simple health calculation
    if (cpu > 90 || memory > 90 || diskUsage > 90 || errorRate > 10) {
      return 'critical';
    } else if (cpu > 75 || memory > 75 || diskUsage > 75 || errorRate > 5) {
      return 'degraded';
    } else if (agentUtilization < 20) {
      return 'degraded';
    }
    
    return 'healthy';
  }

  checkAlerts() {
    this.alerts = [];

    // Check CPU
    if (this.metrics.performance.cpu > 90) {
      this.alerts.push({
        id: 'cpu-high',
        type: 'error',
        message: 'CPU usage is critically high',
        timestamp: new Date(),
        source: 'SystemHealth'
      });
    }

    // Check Memory
    if (this.metrics.performance.memory > 90) {
      this.alerts.push({
        id: 'memory-high',
        type: 'error',
        message: 'Memory usage is critically high',
        timestamp: new Date(),
        source: 'SystemHealth'
      });
    }

    // Check Agent Utilization
    if (this.metrics.agentUtilization < 20) {
      this.alerts.push({
        id: 'agents-low',
        type: 'warning',
        message: 'Few agents are active',
        timestamp: new Date(),
        source: 'SystemHealth'
      });
    }

    // Check Error Rate
    if (this.metrics.errorRate > 5) {
      this.alerts.push({
        id: 'errors-high',
        type: 'warning',
        message: 'Error rate is above threshold',
        timestamp: new Date(),
        source: 'SystemHealth'
      });
    }
  }

  getMetrics() {
    return this.metrics;
  }

  getHealthStatus() {
    return {
      status: this.metrics.systemHealth,
      timestamp: new Date(),
      checks: {
        cpu: this.metrics.performance.cpu < 75 ? 'pass' : 'fail',
        memory: this.metrics.performance.memory < 75 ? 'pass' : 'fail',
        disk: this.metrics.performance.diskUsage < 75 ? 'pass' : 'fail',
        agents: this.metrics.agentUtilization > 20 ? 'pass' : 'fail',
        errors: this.metrics.errorRate < 5 ? 'pass' : 'fail'
      }
    };
  }

  getAlerts() {
    return this.alerts;
  }

  getPerformanceMetrics() {
    return {
      current: this.metrics.performance,
      history: [], // Would store historical data
      thresholds: {
        cpu: 75,
        memory: 75,
        disk: 75
      }
    };
  }

  getSystemConfiguration() {
    return {
      totalAgents: 17,
      platform: os.platform(),
      cpus: os.cpus().length,
      totalMemory: Math.round(os.totalmem() / (1024 * 1024 * 1024)) + ' GB',
      nodeVersion: process.version,
      uptime: Math.round(os.uptime() / 3600) + ' hours'
    };
  }
}