# AgenticMode Dashboard

A real-time monitoring and management dashboard for the AgenticMode multi-agent development system.

## Overview

The AgenticMode Dashboard provides a web-based interface to monitor and interact with your multi-agent development system. It offers real-time visibility into agent status, project progress, inter-agent communications, and system health.

## Features

### Core Features
- **Real-time Agent Monitoring**: View status, capabilities, and current tasks of all agents
- **Project Tracking**: Monitor project progress, tasks, and team assignments
- **Activity Feed**: Live stream of system events and agent activities
- **System Metrics**: Performance monitoring including CPU, memory, and task statistics
- **Guided Tour**: Interactive onboarding for new users
- **WebSocket Updates**: Real-time data synchronization

### Dashboard Views
1. **Overview**: System-wide statistics and quick insights
2. **Agents**: Detailed agent status and performance metrics
3. **Projects**: Active project management and progress tracking
4. **Activity**: Complete system activity log

## Architecture

```
Dashboard/
├── backend/                 # Node.js Express API server
│   ├── src/
│   │   ├── index.js        # Main server entry point
│   │   ├── routes/         # API endpoints
│   │   └── services/       # Core services (monitoring, tracking)
│   └── package.json
├── frontend/               # Next.js React application
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # React components
│   │   └── store/         # Zustand state management
│   └── package.json
└── start-dashboard.bat/sh  # Quick start scripts
```

## Installation

### Prerequisites
- Node.js 16+ and npm
- The AgenticMode system set up and running

### Setup

1. Navigate to the Dashboard directory:
```bash
cd AgenticMode/Dashboard
```

2. Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Running the Dashboard

### Quick Start (Recommended)

**Windows:**
```bash
./start-dashboard.bat
```

**Linux/Mac:**
```bash
chmod +x start-dashboard.sh
./start-dashboard.sh
```

### Manual Start

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```

3. Open your browser to http://localhost:3000

## Configuration

### Backend Configuration (.env)
```env
PORT=3001                    # API server port
FRONTEND_URL=http://localhost:3000
AGENTIC_MODE_PATH=../../     # Path to AgenticMode root
```

### Frontend Configuration
The frontend automatically connects to the backend at `http://localhost:3001`.

## Usage Guide

### First Time Setup
1. Ensure at least the core agents are running:
   - AGENT_MANAGER
   - CLIENT
   - ORCHESTRATOR

2. Open the dashboard and follow the guided tour

### Creating a New Project
1. Click "New Project" in Quick Actions
2. The CLIENT agent will create a project request
3. Follow the prompts in your CLIENT agent terminal

### Monitoring Agents
- Green status: Agent is online and healthy
- Yellow status: Agent has warnings or high load
- Red status: Agent is offline or has errors

### Understanding Metrics
- **Agent Utilization**: Percentage of agents actively working
- **Task Success Rate**: Completed tasks vs total tasks
- **Error Rate**: Percentage of failed operations
- **System Health**: Overall system status

## API Reference

### Agent Endpoints
- `GET /api/agents` - List all agents
- `GET /api/agents/:name` - Get specific agent details
- `GET /api/agents/:name/heartbeats` - Agent heartbeat history
- `GET /api/agents/:name/metrics` - Agent performance metrics

### Project Endpoints
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details
- `GET /api/projects/:id/tasks` - Project tasks
- `GET /api/projects/:id/timeline` - Project timeline

### System Endpoints
- `GET /api/system/metrics` - System-wide metrics
- `GET /api/system/health` - Health status
- `GET /api/system/alerts` - Active alerts

### WebSocket Events
- `agents:update` - Agent status changes
- `projects:update` - Project updates
- `tasks:update` - Task status changes
- `messages:new` - New inter-agent messages
- `system:update` - System metrics updates

## Tech Stack

- **Frontend**: Next.js 14 with React 18 and TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Real-time Updates**: Socket.io
- **Charts**: Recharts
- **Backend**: Node.js + Express
- **File Watching**: Chokidar
- **Tour Guide**: Driver.js

## Troubleshooting

### Dashboard won't start
- Ensure Node.js 16+ is installed: `node --version`
- Check if ports 3000 and 3001 are available
- Verify the AGENTIC_MODE_PATH in backend/.env

### No agents showing
- Confirm agents are running and creating heartbeat files
- Check the backend logs for file reading errors
- Verify the path to AgenticMode in backend configuration

### Real-time updates not working
- Check WebSocket connection in browser console
- Ensure backend file watcher has proper permissions
- Verify no firewall is blocking WebSocket connections

## Development

### Backend Development
```bash
cd backend
npm run dev     # Development with auto-reload
npm run build   # Production build
npm start       # Production server
```

### Frontend Development
```bash
cd frontend
npm run dev     # Development server
npm run build   # Production build
npm start       # Production server
npm run lint    # Run linting
```

### Adding New Features

1. **New Agent Monitoring**:
   - Update `AgentMonitor` service in backend
   - Add agent icon/description in `AgentGrid` component

2. **New Metrics**:
   - Add to `SystemHealth` service
   - Update `SystemMetrics` component

3. **New API Endpoints**:
   - Create route in `backend/src/routes/`
   - Add corresponding service method

## Security Notes

- The dashboard is read-only by design
- No agent control capabilities to maintain system integrity
- Runs locally only - not exposed to network by default
- For production use, add authentication and HTTPS

## Contributing

When adding new features:
1. Maintain the read-only principle
2. Follow the existing component structure
3. Add proper TypeScript types
4. Include loading and error states
5. Test with the multi-agent system running

## License

This dashboard is part of the AgenticMode system and follows the same license terms.