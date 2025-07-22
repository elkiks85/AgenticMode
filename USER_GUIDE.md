# 🚀 AgenticMode Complete User Guide

Welcome to AgenticMode - a multi-agent development framework powered by Claude Code. This guide consolidates all setup, usage, and reference information.

## Table of Contents
1. [Quick Start](#quick-start)
2. [System Requirements](#system-requirements)
3. [Installation & Setup](#installation--setup)
4. [Launching Agents](#launching-agents)
5. [Using Cursor/VS Code](#using-cursorvs-code)
6. [Dashboard](#dashboard)
7. [Creating Projects](#creating-projects)
8. [Agent Reference](#agent-reference)
9. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Fastest Way to Get Started
1. Open terminal in AgenticMode directory
2. Launch core agents:
   ```bash
   # Option 1: Individual terminals
   claude You are AGENT_MANAGER
   claude You are CLIENT
   claude You are ORCHESTRATOR
   
   # Option 2: Use batch file (Windows)
   ./start-core-agents.bat
   ```
3. In CLIENT terminal, type `1` to create a new project

---

## System Requirements

- **Claude Code CLI**: Must be installed and accessible via `claude` command
- **Node.js**: v18+ for Dashboard
- **OS**: Windows, macOS, or Linux
- **IDE**: Cursor or VS Code (recommended)
- **Terminal**: Multiple terminal support

---

## Installation & Setup

### 1. Verify Claude Code Installation
```bash
claude --version
```

### 2. Clone or Download AgenticMode
```bash
cd G:/SoftDev/AgenticMode
```

### 3. Install Dashboard Dependencies (Optional)
```bash
cd Dashboard/backend && npm install
cd ../frontend && npm install
```

---

## Launching Agents

### Method 1: Direct Claude Commands (Recommended)
Open separate terminals and run:

```bash
# Core Agents (Start these first!)
claude You are AGENT_MANAGER
claude You are CLIENT  
claude You are ORCHESTRATOR

# Development Team
claude You are ARCHITECT
claude You are BACKEND_DEV
claude You are FRONTEND_DEV
claude You are QA_ENGINEER
claude You are DOCUMENTOR

# Support Team
claude You are SECURITY
claude You are DEVOPS
claude You are DEPLOYMENT
claude You are MONITOR
claude You are PERFORMANCE
claude You are INTEGRATOR
claude You are AUDITOR
claude You are TESTER
claude You are REVIEWER
```

### Method 2: Batch Files (Windows)
```bash
# Start core agents (3 agents)
./start-core-agents.bat

# Start development team (5 agents)
./start-dev-agents.bat

# Start support team (9 agents)
./start-support-agents.bat

# Start all agents (17 agents)
./start-all-agents.bat
```

### Method 3: Using Cursor/VS Code Tasks
1. Press `Ctrl+Shift+P`
2. Type: `Tasks: Run Task`
3. Select agent or team to start

---

## Using Cursor/VS Code

### Setup VS Code Integration
The `.vscode` folder contains pre-configured tasks for launching agents inside Cursor/VS Code.

### Available Tasks
- **Individual Agents**: Start any single agent
- **Core Agents**: Start AGENT_MANAGER, CLIENT, ORCHESTRATOR
- **Development Team**: Start all 5 dev agents
- **Support Team**: Start all 9 support agents
- **Dashboard**: Start the web dashboard

### Running Tasks
1. Press `Ctrl+Shift+P`
2. Type: `run task`
3. Select the task you want

### Terminal Management
- **Create Terminal**: `` Ctrl+` ``
- **Split Terminal**: `Ctrl+Shift+5`
- **Switch Terminals**: `Ctrl+PageUp/PageDown`
- **Rename Terminal**: Right-click tab → Rename
- **Color Code**: Right-click tab → Change Color

### Pro Tips
1. Save your terminal layout: File → Save Workspace As
2. Name terminals after agents for easy identification
3. Use color coding: Red for core, Yellow for dev, Green for support

---

## Dashboard

### Starting the Dashboard
```bash
# Option 1: Direct command
cd Dashboard && npm run dev

# Option 2: Batch file
./start-dashboard.bat

# Option 3: VS Code task
Run task: "Start Dashboard"
```

### Accessing Dashboard
Open browser to: http://localhost:3000

### Dashboard Features
- Real-time agent status monitoring
- Project progress tracking
- Inter-agent message viewing
- System health metrics
- Activity feed

---

## Creating Projects

### Using CLIENT Agent
1. Start core agents (AGENT_MANAGER, CLIENT, ORCHESTRATOR)
2. In CLIENT terminal, choose:
   - `1` or `new project` - Create new project
   - `2` or `status` - Check project status
   - `3` or `list` - List all projects
   - `help` - Show all commands

### Project Workflow
1. CLIENT creates project brief
2. ORCHESTRATOR assigns tasks
3. ARCHITECT designs system
4. Developers implement features
5. QA tests implementation
6. DEVOPS handles deployment

---

## Agent Reference

### Core Agents (Always Required)
| Agent | Role | Key Commands |
|-------|------|--------------|
| **CLIENT** | Project interface | `new project`, `status`, `list` |
| **AGENT_MANAGER** | Team coordination | Automatic |
| **ORCHESTRATOR** | Task distribution | Automatic |

### Development Team
| Agent | Specialization |
|-------|----------------|
| **ARCHITECT** | System design, technical decisions |
| **BACKEND_DEV** | APIs, databases, server logic |
| **FRONTEND_DEV** | UI/UX, components, styling |
| **QA_ENGINEER** | Testing, quality assurance |
| **DOCUMENTOR** | Documentation, guides |

### Support Team
| Agent | Specialization |
|-------|----------------|
| **SECURITY** | Security analysis, vulnerabilities |
| **DEVOPS** | Infrastructure, CI/CD |
| **DEPLOYMENT** | Release management |
| **MONITOR** | System monitoring |
| **PERFORMANCE** | Optimization |
| **INTEGRATOR** | System integration |
| **AUDITOR** | Code review, compliance |
| **TESTER** | Specialized testing |
| **REVIEWER** | Code review |

---

## Troubleshooting

### Common Issues

#### "Command 'claude' not found"
- Ensure Claude Code is installed
- Add Claude to system PATH
- Restart terminal after installation

#### Only some agents start
- VS Code has terminal limits
- Start agents individually or in smaller groups
- Close unused terminals first

#### Agent not responding
- Wait for Claude to fully load before typing agent name
- Make sure you typed exactly: `You are [AGENT_NAME]`
- Check if agent files exist in AGENTS directory

#### Dashboard connection issues
- Ensure backend is running on port 3001
- Check if port is already in use: `taskkill /F /IM node.exe`
- Verify frontend is on port 3000

#### Agents can't find each other
- Ensure all agents are in same directory
- Check COMMUNICATION folder permissions
- Verify message files are being created

### Reset Commands
```bash
# Kill all Node processes (Windows)
taskkill /F /IM node.exe

# Clear communication folder
rm COMMUNICATION/MESSAGES/*.md

# Reset agent states
rm AGENTS/*/STATE.md
```

---

## Keyboard Shortcuts

### VS Code/Cursor
- **Command Palette**: `Ctrl+Shift+P`
- **Terminal**: `` Ctrl+` ``
- **New Terminal**: `` Ctrl+Shift+` ``
- **Split Terminal**: `Ctrl+Shift+5`
- **Run Task**: `Ctrl+Shift+P` → "Run Task"

### Agent Commands
- **New Project**: Type `1` in CLIENT
- **Status**: Type `2` in CLIENT
- **Help**: Type `help` in any agent

---

## File Structure

```
AgenticMode/
├── AGENTS/              # Agent definitions
│   └── [AGENT_NAME]/
│       ├── IDENTITY.md
│       ├── INSTRUCTIONS.md
│       └── STATE.md
├── COMMUNICATION/       # Inter-agent messages
├── PROJECTS/           # Active projects
├── Dashboard/          # Web monitoring UI
├── Scripts/            # Launch scripts
├── .vscode/           # VS Code integration
└── USER_GUIDE.md      # This file
```

---

## Best Practices

1. **Start Order**: Always start core agents first
2. **Terminal Names**: Rename terminals to agent names
3. **Message Monitoring**: Check COMMUNICATION folder for issues
4. **Regular Saves**: Save VS Code workspace layout
5. **Resource Management**: Close unused agents to free resources

---

## Next Steps

1. Start with core agents and CLIENT
2. Create a test project to understand the flow
3. Gradually add more agents as needed
4. Use Dashboard for monitoring
5. Customize agents for your needs

---

## Support

- Check agent logs in `AGENTS/[name]/STATE.md`
- Review messages in `COMMUNICATION/MESSAGES/`
- Dashboard logs in browser console
- System health at http://localhost:3000

---

**Happy Agent Development! 🤖**