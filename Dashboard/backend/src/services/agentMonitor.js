import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import { glob } from 'glob';
import yaml from 'js-yaml';

export class AgentMonitor {
  constructor(basePath) {
    this.basePath = basePath;
    this.agentStatuses = new Map();
  }

  async start() {
    await this.scanAgents();
    setInterval(() => this.checkHeartbeats(), 30000); // Check every 30 seconds
  }

  async scanAgents() {
    try {
      const agentDirs = await readdir(join(this.basePath, 'AGENTS'));
      
      for (const agentName of agentDirs) {
        const agentPath = join(this.basePath, 'AGENTS', agentName);
        const agent = await this.loadAgentData(agentName, agentPath);
        this.agentStatuses.set(agentName, agent);
      }
    } catch (error) {
      console.error('Error scanning agents:', error);
    }
  }

  async loadAgentData(agentName, agentPath) {
    const agent = {
      name: agentName,
      status: 'OFFLINE',
      capabilities: [],
      currentTask: null,
      lastHeartbeat: null,
      metrics: {}
    };

    try {
      // Load identity
      const identityPath = join(agentPath, 'IDENTITY.md');
      const identityContent = await this.readFile(identityPath);
      if (identityContent) {
        agent.capabilities = this.parseCapabilities(identityContent);
      }

      // Load state
      const statePath = join(agentPath, 'STATE.md');
      const stateContent = await this.readFile(statePath);
      if (stateContent) {
        const state = this.parseState(stateContent);
        agent.currentTask = state.currentTask;
        agent.metrics = state.metrics || {};
      }

      // Check heartbeat
      const heartbeat = await this.getLatestHeartbeat(agentName);
      if (heartbeat) {
        agent.lastHeartbeat = heartbeat.timestamp;
        agent.status = this.calculateStatus(heartbeat.timestamp);
      }

    } catch (error) {
      console.error(`Error loading agent ${agentName}:`, error);
    }

    return agent;
  }

  async getLatestHeartbeat(agentName) {
    try {
      const pattern = join(this.basePath, '_SYSTEM/REGISTRY/HEARTBEATS', `${agentName}-*.md`);
      const files = await glob(pattern);
      
      if (files.length === 0) return null;

      // Sort by timestamp in filename
      files.sort().reverse();
      const latestFile = files[0];
      
      const content = await this.readFile(latestFile);
      return this.parseHeartbeat(content);
    } catch (error) {
      console.error(`Error getting heartbeat for ${agentName}:`, error);
      return null;
    }
  }

  parseCapabilities(content) {
    const capabilities = [];
    const capMatch = content.match(/## Core Capabilities\n([\s\S]*?)##/);
    if (capMatch) {
      const lines = capMatch[1].split('\n');
      for (const line of lines) {
        const match = line.match(/- (\w+): ([\d.]+)/);
        if (match) {
          capabilities.push({
            name: match[1],
            score: parseFloat(match[2])
          });
        }
      }
    }
    return capabilities;
  }

  parseState(content) {
    const state = {
      currentTask: null,
      metrics: {}
    };

    const taskMatch = content.match(/Current Task: (.+)/);
    if (taskMatch && taskMatch[1] !== 'NONE') {
      state.currentTask = taskMatch[1];
    }

    return state;
  }

  parseHeartbeat(content) {
    if (!content) return null;
    
    const heartbeat = {
      timestamp: null,
      status: 'UNKNOWN'
    };

    const timestampMatch = content.match(/Last Update: (.+)/);
    if (timestampMatch) {
      heartbeat.timestamp = new Date(timestampMatch[1]);
    }

    const statusMatch = content.match(/Status: (.+)/);
    if (statusMatch) {
      heartbeat.status = statusMatch[1];
    }

    return heartbeat;
  }

  calculateStatus(lastHeartbeat) {
    if (!lastHeartbeat) return 'OFFLINE';
    
    const now = new Date();
    const diff = now - lastHeartbeat;
    const minutes = diff / 1000 / 60;

    if (minutes < 2) return 'ONLINE';
    if (minutes < 5) return 'WARNING';
    return 'OFFLINE';
  }

  async checkHeartbeats() {
    for (const [agentName, agent] of this.agentStatuses) {
      const heartbeat = await this.getLatestHeartbeat(agentName);
      if (heartbeat) {
        agent.lastHeartbeat = heartbeat.timestamp;
        agent.status = this.calculateStatus(heartbeat.timestamp);
      } else {
        agent.status = 'OFFLINE';
      }
    }
  }

  getAgentStatuses() {
    return Array.from(this.agentStatuses.values());
  }

  getAgent(agentName) {
    return this.agentStatuses.get(agentName);
  }

  async readFile(filePath) {
    try {
      return await readFile(filePath, 'utf-8');
    } catch (error) {
      return null;
    }
  }
}