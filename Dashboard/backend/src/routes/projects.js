import { Router } from 'express';

export default function projectRoutes(projectTracker) {
  const router = Router();

  // Get all projects
  router.get('/', (req, res) => {
    try {
      const projects = projectTracker.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get specific project
  router.get('/:id', (req, res) => {
    try {
      const project = projectTracker.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get project tasks
  router.get('/:id/tasks', (req, res) => {
    try {
      const tasks = projectTracker.getProjectTasks(req.params.id);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get project timeline
  router.get('/:id/timeline', (req, res) => {
    try {
      const timeline = projectTracker.getProjectTimeline(req.params.id);
      res.json(timeline);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get project metrics
  router.get('/:id/metrics', (req, res) => {
    try {
      const metrics = projectTracker.getProjectMetrics(req.params.id);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}