# PROJECT LIFECYCLE PROTOCOL v1.0

## Project Structure

Every project follows this structure:
```
/PROJECTS/[PROJECT_ID]/
├── BRIEF.md              # Original requirements
├── BLUEPRINT.md          # Architectural design
├── TASKS/               # Individual task files
├── STATUS.md            # Current progress
├── DECISIONS/           # Decision log
├── ARTIFACTS/           # Generated code/docs
└── REVIEWS/             # Quality checkpoints
```

## Project Phases

### 1. INCEPTION (CLIENT → ORCHESTRATOR)
```yaml
Duration: 1-2 hours
Participants: CLIENT, ORCHESTRATOR, ARCHITECT
Deliverables:
  - PROJECT_BRIEF.md
  - Initial task breakdown
  - Resource estimation
```

### 2. PLANNING (ARCHITECT leads)
```yaml
Duration: 2-4 hours
Participants: ARCHITECT, ORCHESTRATOR, Senior Developers
Deliverables:
  - BLUEPRINT.md (technical design)
  - TASK_BREAKDOWN.md (detailed tasks)
  - DEPENDENCY_GRAPH.md
  - RISK_ASSESSMENT.md
```

### 3. DEVELOPMENT (Multiple agents)
```yaml
Duration: Variable
Participants: All development agents
Activities:
  - Task execution
  - Code generation
  - Unit testing
  - Integration
  - Documentation
Checkpoints:
  - Daily progress updates
  - Milestone reviews
  - Blocker resolution
```

### 4. TESTING (QA_ENGINEER leads)
```yaml
Duration: 20% of development time
Participants: QA_ENGINEER, Developers
Activities:
  - Test plan creation
  - Test execution
  - Bug reporting
  - Regression testing
  - Performance testing
```

### 5. DEPLOYMENT (DEVOPS leads)
```yaml
Duration: 1-2 hours
Participants: DEVOPS, ARCHITECT
Activities:
  - Environment setup
  - Deployment execution
  - Monitoring setup
  - Rollback planning
```

### 6. HANDOVER (CLIENT + DOCUMENTOR)
```yaml
Duration: 1-2 hours
Participants: CLIENT, DOCUMENTOR, ARCHITECT
Deliverables:
  - User documentation
  - Deployment guide
  - Maintenance instructions
  - Known issues list
```

## Task Lifecycle

### Task States
```
CREATED → ASSIGNED → IN_PROGRESS → REVIEW → COMPLETED
                ↓         ↓           ↓
             BLOCKED   FAILED    REJECTED
```

### Task File Format
```yaml
---
id: TASK-[PROJECT_ID]-[NUMBER]
project: [PROJECT_ID]
title: [Brief description]
type: [FEATURE|BUG|REFACTOR|TEST|DOCS]
priority: [CRITICAL|HIGH|MEDIUM|LOW]
status: [Current state]
assigned_to: [AGENT_NAME or NONE]
created_by: [AGENT_NAME]
created_at: [ISO_TIMESTAMP]
started_at: [ISO_TIMESTAMP or NULL]
completed_at: [ISO_TIMESTAMP or NULL]
estimated_hours: [NUMBER]
actual_hours: [NUMBER or NULL]
complexity: [1-5]
capabilities_required:
  - capability_name: minimum_score
dependencies: [TASK_IDs]
blockers: [Description or NONE]
---

## Description
[Detailed task description]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Technical Notes
[Implementation details]

## Progress Log
[Agents append updates here]
```

## Project Status Tracking

### STATUS.md Format
```yaml
---
project_id: [ID]
name: [Project Name]
phase: [INCEPTION|PLANNING|DEVELOPMENT|TESTING|DEPLOYMENT|COMPLETE]
health: [GREEN|YELLOW|RED]
started: [ISO_TIMESTAMP]
deadline: [ISO_TIMESTAMP or NONE]
last_updated: [ISO_TIMESTAMP]
---

## Progress Summary
- Total Tasks: [NUMBER]
- Completed: [NUMBER] ([PERCENTAGE]%)
- In Progress: [NUMBER]
- Blocked: [NUMBER]
- Not Started: [NUMBER]

## Active Team
- [AGENT_NAME]: [Current task or IDLE]

## Recent Activity
- [TIMESTAMP]: [Activity description]

## Upcoming Milestones
- [DATE]: [Milestone name]

## Risks and Issues
- [Risk/Issue description]

## Decisions Needed
- [Decision description]
```

## Communication Flow

### Project Kickoff
```
CLIENT → ORCHESTRATOR: New project request
ORCHESTRATOR → ARCHITECT: Design request
ARCHITECT → ORCHESTRATOR: Design complete
ORCHESTRATOR → ALL_AGENTS: Task assignments
```

### Daily Flow
```
AGENTS → TASKS: Progress updates
ORCHESTRATOR → STATUS: Aggregated progress
CLIENT ← STATUS: Progress summary
```

### Escalation Flow
```
DEVELOPER → ARCHITECT: Technical decision needed
ARCHITECT → DECISION: Decision logged
DEVELOPER ← ARCHITECT: Decision communicated
```

## Quality Gates

### Code Review Process
1. Developer completes task
2. Creates review request
3. Reviewer assigned (different agent)
4. Review performed
5. Feedback provided
6. Changes made if needed
7. Approval granted
8. Task marked complete

### Testing Requirements
- Unit tests: Required for all code
- Integration tests: Required for APIs
- E2E tests: Required for user features
- Performance tests: Required for critical paths

## Project Completion

### Completion Checklist
- [ ] All tasks completed
- [ ] All tests passing
- [ ] Documentation complete
- [ ] Deployment successful
- [ ] Handover complete
- [ ] Client acceptance received

### Archive Process
1. Move to `/PROJECTS/ARCHIVE/[PROJECT_ID]/`
2. Generate final report
3. Extract learnings
4. Update agent memories
5. Clean up resources