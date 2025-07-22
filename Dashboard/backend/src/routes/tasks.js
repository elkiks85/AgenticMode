import { Router } from 'express';

export default function taskRoutes(projectTracker) {
  const router = Router();

  // Get all tasks
  router.get('/', (req, res) => {
    try {
      const tasks = projectTracker.getTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get tasks by status
  router.get('/status/:status', (req, res) => {
    try {
      const tasks = projectTracker.getTasksByStatus(req.params.status);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get tasks by agent
  router.get('/agent/:agentName', (req, res) => {
    try {
      const tasks = projectTracker.getTasksByAgent(req.params.agentName);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get task statistics
  router.get('/stats', (req, res) => {
    try {
      const stats = projectTracker.getTaskStatistics();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}