import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class ProjectTracker {
  constructor(agenticPath) {
    this.agenticPath = agenticPath;
    this.projectsPath = path.join(agenticPath, 'PROJECTS');
    this.tasksPath = path.join(agenticPath, 'WORK');
  }

  async start() {
    console.log('ProjectTracker started');
  }

  async getProjects() {
    try {
      const projects = [];
      const entries = await fs.readdir(this.projectsPath, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory() && entry.name.startsWith('PROJECT-')) {
          const project = await this.loadProject(entry.name);
          if (project) projects.push(project);
        }
      }
      
      return projects;
    } catch (error) {
      console.error('Error reading projects:', error);
      return [];
    }
  }

  async getProject(projectId) {
    try {
      return await this.loadProject(projectId);
    } catch (error) {
      console.error(`Error loading project ${projectId}:`, error);
      return null;
    }
  }

  async loadProject(projectId) {
    try {
      const projectPath = path.join(this.projectsPath, projectId);
      const readmePath = path.join(projectPath, 'README.md');
      const statusPath = path.join(projectPath, 'STATUS.md');
      
      // Check if project exists
      try {
        await fs.access(readmePath);
      } catch {
        return null;
      }

      // Read project files
      const readme = await fs.readFile(readmePath, 'utf-8');
      let status = '';
      try {
        status = await fs.readFile(statusPath, 'utf-8');
      } catch {
        // Status file might not exist yet
      }

      // Parse project info (simplified)
      const project = {
        id: projectId,
        name: this.extractProjectName(readme) || projectId,
        type: this.extractProjectType(readme) || 'Unknown',
        status: this.extractStatus(status) || 'PLANNING',
        description: this.extractDescription(readme) || '',
        progress: this.calculateProgress(status) || 0,
        startDate: new Date(), // Would parse from files
        taskCount: await this.countProjectTasks(projectId),
        completedTasks: await this.countCompletedTasks(projectId),
        team: await this.getProjectTeam(projectId)
      };

      return project;
    } catch (error) {
      console.error(`Error loading project ${projectId}:`, error);
      return null;
    }
  }

  extractProjectName(content) {
    const match = content.match(/^#\s*PROJECT-.*?:\s*(.+)$/m);
    return match ? match[1] : null;
  }

  extractProjectType(content) {
    const match = content.match(/\*\*Type\*\*:\s*(.+)$/m);
    return match ? match[1] : null;
  }

  extractStatus(content) {
    const match = content.match(/\*\*Status\*\*:\s*(.+)$/m);
    return match ? match[1] : 'PLANNING';
  }

  extractDescription(content) {
    const match = content.match(/##\s*Description\s*\n([\s\S]*?)(?=\n##|$)/);
    return match ? match[1].trim() : '';
  }

  calculateProgress(statusContent) {
    const match = statusContent.match(/Overall:\s*(\d+)%/);
    return match ? parseInt(match[1]) : 0;
  }

  async countProjectTasks(projectId) {
    // Simplified - would actually count task files
    return Math.floor(Math.random() * 20) + 5;
  }

  async countCompletedTasks(projectId) {
    // Simplified - would actually check task statuses
    const total = await this.countProjectTasks(projectId);
    return Math.floor(Math.random() * total);
  }

  async getProjectTeam(projectId) {
    // Simplified - would read from TEAM.md
    return ['ARCHITECT', 'BACKEND_DEV', 'FRONTEND_DEV'];
  }

  async getProjectTasks(projectId) {
    // Return tasks for a specific project
    return [];
  }

  async getProjectTimeline(projectId) {
    // Return timeline for a project
    return {
      milestones: [],
      currentPhase: 'PLANNING'
    };
  }

  async getProjectMetrics(projectId) {
    // Return project metrics
    return {
      velocity: 0,
      qualityScore: 0,
      timeEstimate: 0
    };
  }

  async getTasks() {
    // Get all tasks from WORK directory
    try {
      const tasks = [];
      const inboxPath = path.join(this.tasksPath, 'INBOX');
      const activePath = path.join(this.tasksPath, 'ACTIVE');
      
      // Read from different task directories
      const inboxTasks = await this.readTasksFromDir(inboxPath, 'PENDING');
      const activeTasks = await this.readTasksFromDir(activePath, 'IN_PROGRESS');
      
      return [...inboxTasks, ...activeTasks];
    } catch (error) {
      console.error('Error reading tasks:', error);
      return [];
    }
  }

  async readTasksFromDir(dirPath, defaultStatus) {
    try {
      const tasks = [];
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isFile() && entry.name.endsWith('.md')) {
          // Simplified task reading
          tasks.push({
            id: entry.name.replace('.md', ''),
            status: defaultStatus,
            title: entry.name,
            assignedTo: null
          });
        }
      }
      
      return tasks;
    } catch {
      return [];
    }
  }

  async getTasksByStatus(status) {
    const allTasks = await this.getTasks();
    return allTasks.filter(task => task.status === status);
  }

  async getTasksByAgent(agentName) {
    const allTasks = await this.getTasks();
    return allTasks.filter(task => task.assignedTo === agentName);
  }

  async getTaskStatistics() {
    const tasks = await this.getTasks();
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'PENDING').length,
      inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
      completed: tasks.filter(t => t.status === 'COMPLETED').length
    };
  }
}