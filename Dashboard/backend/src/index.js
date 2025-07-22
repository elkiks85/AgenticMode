import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

import { FileWatcher } from './services/fileWatcher.js';
import { AgentMonitor } from './services/agentMonitor.js';
import { ProjectTracker } from './services/projectTracker.js';
import { CommunicationMonitor } from './services/communicationMonitor.js';
import { SystemHealth } from './services/systemHealth.js';

import agentRoutes from './routes/agents.js';
import projectRoutes from './routes/projects.js';
import taskRoutes from './routes/tasks.js';
import messageRoutes from './routes/messages.js';
import systemRoutes from './routes/system.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Initialize services
const AGENTIC_MODE_PATH = process.env.AGENTIC_MODE_PATH || join(__dirname, '../../../');

const fileWatcher = new FileWatcher(AGENTIC_MODE_PATH);
const agentMonitor = new AgentMonitor(AGENTIC_MODE_PATH);
const projectTracker = new ProjectTracker(AGENTIC_MODE_PATH);
const communicationMonitor = new CommunicationMonitor(AGENTIC_MODE_PATH);
const systemHealth = new SystemHealth(AGENTIC_MODE_PATH);

// Routes
app.use('/api/agents', agentRoutes(agentMonitor));
app.use('/api/projects', projectRoutes(projectTracker));
app.use('/api/tasks', taskRoutes(projectTracker));
app.use('/api/messages', messageRoutes(communicationMonitor));
app.use('/api/system', systemRoutes(systemHealth));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// WebSocket connections
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send initial data
  socket.emit('agents:update', agentMonitor.getAgentStatuses());
  socket.emit('projects:update', projectTracker.getProjects());
  socket.emit('system:update', systemHealth.getMetrics());

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// File watcher events
fileWatcher.on('agent:update', (data) => {
  io.emit('agents:update', agentMonitor.getAgentStatuses());
});

fileWatcher.on('project:update', (data) => {
  io.emit('projects:update', projectTracker.getProjects());
});

fileWatcher.on('task:update', (data) => {
  io.emit('tasks:update', projectTracker.getTasks());
});

fileWatcher.on('message:new', (message) => {
  io.emit('messages:new', message);
});

fileWatcher.on('system:update', () => {
  io.emit('system:update', systemHealth.getMetrics());
});

// Start services
fileWatcher.start();
agentMonitor.start();
projectTracker.start();
communicationMonitor.start();
systemHealth.start();

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Dashboard backend running on port ${PORT}`);
  console.log(`Monitoring AgenticMode at: ${AGENTIC_MODE_PATH}`);
});