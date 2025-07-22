import { Router } from 'express';

export default function messageRoutes(communicationMonitor) {
  const router = Router();

  // Get recent messages
  router.get('/recent', (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const messages = communicationMonitor.getRecentMessages(limit);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get messages by agent
  router.get('/agent/:agentName', (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const messages = communicationMonitor.getMessagesByAgent(req.params.agentName, limit);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get messages by type
  router.get('/type/:type', (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const messages = communicationMonitor.getMessagesByType(req.params.type, limit);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get communication statistics
  router.get('/stats', (req, res) => {
    try {
      const stats = communicationMonitor.getCommunicationStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}