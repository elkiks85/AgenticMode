# SYSTEM CAPABILITIES MATRIX

This matrix maps capabilities to agents for optimal task assignment.

## Capability Definitions

### Development Capabilities
- `frontend_development`: React, Vue, Angular, HTML/CSS, JavaScript
- `backend_development`: APIs, databases, server-side logic
- `api_development`: REST, GraphQL, WebSocket, authentication
- `database_design`: Schema design, optimization, migrations
- `testing`: Unit tests, integration tests, E2E tests
- `devops`: CI/CD, deployment, monitoring, infrastructure

### Architecture & Design
- `system_architecture`: High-level design, patterns, decisions
- `technical_design`: Detailed implementation planning
- `ui_design`: User interface, UX, accessibility
- `api_design`: Contract definition, versioning, documentation

### Management & Operations
- `project_management`: Planning, tracking, coordination
- `agent_management`: Agent lifecycle, registration, monitoring
- `requirements_gathering`: Understanding and documenting needs
- `human_communication`: Interacting with humans effectively

### Quality & Maintenance
- `code_review`: Quality assessment, best practices
- `refactoring`: Code improvement, technical debt
- `documentation`: Technical writing, guides, README
- `debugging`: Problem solving, root cause analysis

### Specialized
- `security`: Authentication, authorization, vulnerability assessment
- `performance_optimization`: Speed, efficiency, resource usage
- `data_processing`: ETL, analytics, transformations
- `integration`: Third-party services, APIs, webhooks

## Agent Capability Scores

Format: capability_name: score (0.0-1.0)

### AGENT_MANAGER
- agent_management: 1.0
- system_monitoring: 1.0
- error_recovery: 1.0
- system_architecture: 0.9
- security_management: 0.9
- performance_optimization: 0.8
- documentation: 0.7

### CLIENT
- requirements_gathering: 1.0
- human_communication: 1.0
- project_translation: 0.95
- status_reporting: 0.95
- expectation_management: 0.9
- decision_facilitation: 0.9
- technical_translation: 0.85

### ORCHESTRATOR
- task_coordination: 1.0
- workload_balancing: 1.0
- dependency_management: 0.95
- conflict_resolution: 0.95
- system_architecture: 0.9
- performance_optimization: 0.85

### ARCHITECT
- system_architecture: 1.0
- technical_design: 1.0
- api_design: 0.95
- database_design: 0.9
- security: 0.85
- documentation: 0.8
- code_review: 0.85

### BACKEND_DEV
- backend_development: 1.0
- api_development: 1.0
- database_design: 0.9
- testing: 0.85
- security: 0.8
- performance_optimization: 0.85
- debugging: 0.9

### FRONTEND_DEV
- frontend_development: 1.0
- ui_design: 0.9
- testing: 0.85
- performance_optimization: 0.8
- debugging: 0.85
- documentation: 0.7
- integration: 0.8

### QA_ENGINEER
- testing: 1.0
- debugging: 0.95
- documentation: 0.85
- code_review: 0.9
- security: 0.7
- performance_optimization: 0.75
- integration: 0.8

### DEVOPS
- devops: 1.0
- system_monitoring: 0.95
- performance_optimization: 0.9
- security: 0.85
- documentation: 0.8
- debugging: 0.85
- integration: 0.9

### DOCUMENTOR
- documentation: 1.0
- technical_translation: 0.95
- requirements_gathering: 0.8
- code_review: 0.7
- testing: 0.6

## Capability Requirements

Minimum scores for task assignment:
- PRIMARY capability: >= 0.8
- SECONDARY capabilities: >= 0.6
- SUPPORTIVE capabilities: >= 0.4

## Update Protocol

This matrix is updated:
1. When new agents register
2. When agents complete tasks (learning)
3. During weekly performance reviews
4. When new capabilities are defined