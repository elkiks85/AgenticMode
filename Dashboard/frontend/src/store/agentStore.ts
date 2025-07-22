import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface Capability {
  name: string;
  score: number;
}

interface Agent {
  name: string;
  status: 'ONLINE' | 'OFFLINE' | 'WARNING' | 'WORKING';
  capabilities: Capability[];
  currentTask: string | null;
  lastHeartbeat: Date | null;
  taskProgress?: number;
  metrics?: {
    tasksCompleted?: number;
    successRate?: number;
  };
}

interface AgentStore {
  agents: Agent[];
  socket: Socket | null;
  connected: boolean;
  fetchAgents: () => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
  updateAgent: (agent: Agent) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const useAgentStore = create<AgentStore>((set, get) => ({
  agents: [],
  socket: null,
  connected: false,

  fetchAgents: async () => {
    try {
      const response = await fetch(`${API_URL}/api/agents`);
      const data = await response.json();
      set({ agents: data });
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    }
  },

  connectSocket: () => {
    const currentSocket = get().socket;
    if (currentSocket?.connected) return;

    const socket = io(API_URL);

    socket.on('connect', () => {
      console.log('Connected to dashboard backend');
      set({ connected: true });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from dashboard backend');
      set({ connected: false });
    });

    socket.on('agents:update', (agents: Agent[]) => {
      set({ agents });
    });

    socket.on('agent:heartbeat', (data: { agentName: string; heartbeat: any }) => {
      const agents = get().agents.map(agent => {
        if (agent.name === data.agentName) {
          return {
            ...agent,
            lastHeartbeat: new Date(data.heartbeat.timestamp),
            status: data.heartbeat.status
          };
        }
        return agent;
      });
      set({ agents });
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, connected: false });
    }
  },

  updateAgent: (updatedAgent: Agent) => {
    const agents = get().agents.map(agent => 
      agent.name === updatedAgent.name ? updatedAgent : agent
    );
    set({ agents });
  }
}));