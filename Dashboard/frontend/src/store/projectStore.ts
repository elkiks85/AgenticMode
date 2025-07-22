import { create } from 'zustand';

interface Task {
  id: string;
  title: string;
  status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  assignedTo: string | null;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Project {
  id: string;
  name: string;
  type: string;
  status: 'PLANNING' | 'ACTIVE' | 'COMPLETED' | 'PAUSED' | 'CANCELLED';
  description: string;
  progress: number;
  startDate: Date;
  endDate?: Date;
  taskCount: number;
  completedTasks: number;
  tasks: Task[];
  team: string[];
  metrics?: {
    velocity?: number;
    qualityScore?: number;
    timeEstimate?: number;
  };
}

interface ProjectStore {
  projects: Project[];
  selectedProject: Project | null;
  fetchProjects: () => Promise<void>;
  fetchProject: (id: string) => Promise<void>;
  selectProject: (project: Project | null) => void;
  updateProject: (project: Project) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  selectedProject: null,

  fetchProjects: async () => {
    try {
      const response = await fetch(`${API_URL}/api/projects`);
      const data = await response.json();
      set({ projects: data });
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  },

  fetchProject: async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/projects/${id}`);
      const project = await response.json();
      
      // Fetch tasks for the project
      const tasksResponse = await fetch(`${API_URL}/api/projects/${id}/tasks`);
      const tasks = await tasksResponse.json();
      
      project.tasks = tasks;
      set({ selectedProject: project });
      
      // Update project in the list
      const projects = get().projects.map(p => 
        p.id === project.id ? project : p
      );
      set({ projects });
    } catch (error) {
      console.error('Failed to fetch project:', error);
    }
  },

  selectProject: (project: Project | null) => {
    set({ selectedProject: project });
  },

  updateProject: (updatedProject: Project) => {
    const projects = get().projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    set({ projects });
    
    if (get().selectedProject?.id === updatedProject.id) {
      set({ selectedProject: updatedProject });
    }
  }
}));