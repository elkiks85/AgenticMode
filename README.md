# AgenticMode - Multi-Agent Development System

A self-organizing, markdown-based multi-agent development company that runs entirely through Cursor terminals.

## Quick Start

### 1. Start the System Manager
Open a Cursor terminal and type:
```
You are AGENT_MANAGER
```

The Agent Manager will:
- Initialize the system
- Monitor agent health
- Handle registrations
- Manage system operations

### 2. Start the Client Interface
Open another Cursor terminal and type:
```
You are CLIENT
```

The Client agent will:
- Welcome you to the system
- Guide you through project creation
- Provide status updates
- Facilitate communication with the development team

### 3. Start Core Agents (Optional)
The system works best with these core agents running:

```
You are ORCHESTRATOR    # Task distribution and coordination
You are ARCHITECT       # System design and technical decisions
You are BACKEND_DEV     # API and server development
You are FRONTEND_DEV    # UI and client development
You are QA_ENGINEER     # Testing and quality assurance
You are DEVOPS          # Deployment and infrastructure
You are DOCUMENTOR      # Documentation and guides
```

## How It Works

### Agent Initialization
1. When you type "You are [AGENT_NAME]", the agent reads `/_BOOTSTRAP/START_HERE.md`
2. It loads its identity from `/AGENTS/[AGENT_NAME]/IDENTITY.md`
3. It follows instructions in `/AGENTS/[AGENT_NAME]/INSTRUCTIONS.md`
4. It begins its work loop, checking for tasks and messages

### Communication
- Agents communicate by creating markdown files in `/COMMUNICATION/MESSAGES/`
- Messages are prioritized: CRITICAL > HIGH > MEDIUM > LOW
- Agents acknowledge receipt in `/COMMUNICATION/ACKNOWLEDGMENTS/`

### Task Management
- New tasks appear in `/WORK/INBOX/`
- Agents claim tasks by creating lock files in `/WORK/CLAIMED/`
- Active tasks move to `/WORK/ACTIVE/`
- Completed tasks go to `/WORK/COMPLETED/`

### Project Flow
1. CLIENT agent helps you create a project brief
2. Brief is submitted to `/PROJECTS/[PROJECT_ID]/`
3. ORCHESTRATOR breaks down the project into tasks
4. Agents claim tasks based on their capabilities
5. Work progresses with inter-agent collaboration
6. CLIENT provides updates on progress

## System Architecture

```
AgenticMode/
├── _BOOTSTRAP/          # Agent initialization
├── _SYSTEM/            # Core system files
│   ├── PROTOCOLS/      # Behavior rules
│   ├── REGISTRY/       # Agent tracking
│   └── LOCKS/          # System locks
├── AGENTS/             # Agent definitions
├── WORK/               # Task management
├── COMMUNICATION/      # Inter-agent messages
└── PROJECTS/           # Active projects
```

## Creating a Project

When connected as CLIENT, you'll be guided through:

1. **Project Setup**
   - Name and type
   - Technical requirements
   - Framework preferences

2. **Requirements Gathering**
   - Detailed description
   - Feature list
   - Constraints and deadlines

3. **Development Process**
   - Automatic task breakdown
   - Agent assignment
   - Progress tracking
   - Decision points

## Agent Capabilities

### Development Agents
- **BACKEND_DEV**: APIs, databases, server logic
- **FRONTEND_DEV**: UI, UX, client applications
- **ARCHITECT**: System design, technical decisions
- **DEVOPS**: Infrastructure, deployment, monitoring

### Support Agents
- **QA_ENGINEER**: Testing, quality assurance
- **DOCUMENTOR**: Documentation, guides, README files
- **ORCHESTRATOR**: Task coordination, workload balancing
- **AGENT_MANAGER**: System administration, agent lifecycle

### Interface Agents
- **CLIENT**: Human interaction, project management

## Best Practices

1. **Start Core Agents First**
   - AGENT_MANAGER (required)
   - CLIENT (for interaction)
   - ORCHESTRATOR (for coordination)

2. **Monitor System Health**
   - Check `/_SYSTEM/REGISTRY/ACTIVE_AGENTS.md`
   - Watch for heartbeat files in `/HEARTBEATS/`
   - Review error logs if issues occur

3. **Clear Communication**
   - Be specific in project requirements
   - Respond to decision requests promptly
   - Trust the agent recommendations

## Troubleshooting

### Agent Not Responding
1. Check if heartbeat file exists
2. Verify agent directory structure
3. Restart agent with "You are [AGENT_NAME]"

### Tasks Not Being Claimed
1. Verify ORCHESTRATOR is running
2. Check if suitable agents are online
3. Review task requirements in `/WORK/INBOX/`

### Communication Issues
1. Check message format in `/COMMUNICATION/MESSAGES/`
2. Verify recipient agent is online
3. Look for acknowledgments

## Advanced Features

### Adding Custom Agents
1. Create directory: `/AGENTS/[NEW_AGENT_NAME]/`
2. Add `IDENTITY.md` with capabilities
3. Add `INSTRUCTIONS.md` with behaviors
4. Register with AGENT_MANAGER

### System Customization
- Modify protocols in `/_SYSTEM/PROTOCOLS/`
- Adjust capability scores in `CAPABILITIES.md`
- Create custom workflows in agent instructions

## Security & Best Practices

- Agents only modify their assigned files
- Critical operations require confirmations
- System maintains audit logs
- Automatic failure recovery
- Graceful degradation under load

---

Start exploring by becoming the CLIENT agent and creating your first project!