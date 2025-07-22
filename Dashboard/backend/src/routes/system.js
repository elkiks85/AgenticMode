import { Router } from 'express';

export default function systemRoutes(systemHealth) {
  const router = Router();

  // Get system metrics
  router.get('/metrics', (req, res) => {
    try {
      const metrics = systemHealth.getMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get system health
  router.get('/health', (req, res) => {
    try {
      const health = systemHealth.getHealthStatus();
      res.json(health);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get alerts
  router.get('/alerts', (req, res) => {
    try {
      const alerts = systemHealth.getAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get performance metrics
  router.get('/performance', (req, res) => {
    try {
      const performance = systemHealth.getPerformanceMetrics();
      res.json(performance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get configuration
  router.get('/config', (req, res) => {
    try {
      const config = systemHealth.getSystemConfiguration();
      res.json(config);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}