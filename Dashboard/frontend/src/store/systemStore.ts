import { create } from 'zustand';

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  source: string;
}

interface SystemMetrics {
  systemHealth: 'healthy' | 'degraded' | 'critical' | 'unknown';
  alerts: number;
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  averageTaskTime: number;
  agentUtilization: number;
  messageVolume: number;
  errorRate: number;
  performance: {
    cpu: number;
    memory: number;
    diskUsage: number;
  };
}

interface SystemStore {
  metrics: SystemMetrics;
  alerts: Alert[];
  fetchMetrics: () => Promise<void>;
  fetchAlerts: () => Promise<void>;
  updateMetrics: (metrics: Partial<SystemMetrics>) => void;
  addAlert: (alert: Alert) => void;
  dismissAlert: (id: string) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const defaultMetrics: SystemMetrics = {
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

export const useSystemStore = create<SystemStore>((set, get) => ({
  metrics: defaultMetrics,
  alerts: [],

  fetchMetrics: async () => {
    try {
      const response = await fetch(`${API_URL}/api/system/metrics`);
      const metrics = await response.json();
      set({ metrics });
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    }
  },

  fetchAlerts: async () => {
    try {
      const response = await fetch(`${API_URL}/api/system/alerts`);
      const alerts = await response.json();
      set({ alerts, metrics: { ...get().metrics, alerts: alerts.length } });
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    }
  },

  updateMetrics: (newMetrics: Partial<SystemMetrics>) => {
    set({ metrics: { ...get().metrics, ...newMetrics } });
  },

  addAlert: (alert: Alert) => {
    const alerts = [...get().alerts, alert];
    set({ alerts, metrics: { ...get().metrics, alerts: alerts.length } });
  },

  dismissAlert: (id: string) => {
    const alerts = get().alerts.filter(alert => alert.id !== id);
    set({ alerts, metrics: { ...get().metrics, alerts: alerts.length } });
  }
}));