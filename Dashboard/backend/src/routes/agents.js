import { Router } from 'express';

export default function agentRoutes(agentMonitor) {
  const router = Router();

  // Get all agents
  router.get('/', (req, res) => {
    try {
      const agents = agentMonitor.getAgentStatuses();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get specific agent
  router.get('/:name', (req, res) => {
    try {
      const agent = agentMonitor.getAgentStatus(req.params.name);
      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }
      res.json(agent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get agent heartbeats
  router.get('/:name/heartbeats', (req, res) => {
    try {
      const heartbeats = agentMonitor.getAgentHeartbeats(req.params.name);
      res.json(heartbeats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get agent metrics
  router.get('/:name/metrics', (req, res) => {
    try {
      const metrics = agentMonitor.getAgentMetrics(req.params.name);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}