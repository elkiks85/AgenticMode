# Projects Directory

This directory contains all projects managed by the multi-agent system.

## Project Structure

Each project has its own directory with:

```
PROJECT-[ID]/
├── README.md           # Project overview
├── REQUIREMENTS.md     # Detailed requirements
├── ARCHITECTURE.md     # Technical architecture
├── TIMELINE.md        # Project timeline
├── TEAM.md           # Assigned agents
├── STATUS.md         # Current status
└── DELIVERABLES/     # Project outputs
```

## Project Lifecycle

1. **PLANNING** - Requirements gathering and design
2. **ACTIVE** - Development in progress
3. **TESTING** - Quality assurance phase
4. **REVIEW** - Final review and approval
5. **COMPLETED** - Project delivered
6. **CANCELLED** - Project terminated

## Project Format

```markdown
# PROJECT-[ID]: [Name]

**Type**: [Web App|API|Library|Service|etc]
**Client**: [CLIENT_AGENT or External]
**Status**: [PLANNING|ACTIVE|TESTING|REVIEW|COMPLETED|CANCELLED]
**Start Date**: [ISO_DATE]
**Target Date**: [ISO_DATE]
**Actual End**: [ISO_DATE or TBD]

## Description
[Project description]

## Objectives
1. [Objective 1]
2. [Objective 2]

## Team
- **Lead**: [AGENT_NAME]
- **Members**: [List of agents]

## Progress
- Overall: [0-100]%
- Current Phase: [Phase name]
- Blockers: [Any blockers]

## Metrics
- Tasks Total: [Number]
- Tasks Completed: [Number]
- Quality Score: [0-100]
- On Schedule: [YES|NO|AT_RISK]
```