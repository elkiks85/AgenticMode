# Project Structure Template

When the CLIENT agent creates a new project, it follows this structure:

## Project Directory Structure

```
PROJECTS/
└── PROJECT-[UNIQUE_ID]/
    ├── README.md              # Project overview and status
    ├── REQUIREMENTS.md        # Detailed requirements from client
    ├── ARCHITECTURE.md        # Technical architecture (by ARCHITECT)
    ├── TIMELINE.md           # Project schedule and milestones
    ├── TEAM.md              # Assigned agents and roles
    ├── STATUS.md            # Current progress and metrics
    ├── TASKS.md             # Task breakdown and assignments
    ├── DELIVERABLES/        # Final outputs
    │   ├── SOURCE/          # Source code
    │   │   ├── backend/     # Backend code (if applicable)
    │   │   ├── frontend/    # Frontend code (if applicable)
    │   │   ├── mobile/      # Mobile app code (if applicable)
    │   │   └── ...         # Other components
    │   ├── DOCUMENTATION/   # Project documentation
    │   ├── TESTS/          # Test suites and results
    │   └── BUILDS/         # Compiled/built versions
    └── WORK_LOGS/          # Agent work logs for this project
```

## Example: E-commerce Web App

```
PROJECTS/
└── PROJECT-2024-001-ECOMMERCE/
    ├── README.md
    ├── REQUIREMENTS.md
    ├── ARCHITECTURE.md
    ├── TIMELINE.md
    ├── TEAM.md
    ├── STATUS.md
    ├── TASKS.md
    ├── DELIVERABLES/
    │   ├── SOURCE/
    │   │   ├── backend/
    │   │   │   ├── src/
    │   │   │   ├── package.json
    │   │   │   └── ...
    │   │   ├── frontend/
    │   │   │   ├── src/
    │   │   │   ├── public/
    │   │   │   ├── package.json
    │   │   │   └── ...
    │   │   └── database/
    │   │       ├── schema.sql
    │   │       └── migrations/
    │   ├── DOCUMENTATION/
    │   │   ├── API_DOCS.md
    │   │   ├── USER_GUIDE.md
    │   │   └── DEPLOYMENT.md
    │   ├── TESTS/
    │   │   ├── unit/
    │   │   ├── integration/
    │   │   └── e2e/
    │   └── BUILDS/
    │       ├── dist/
    │       └── releases/
    └── WORK_LOGS/
        ├── BACKEND_DEV_LOG.md
        ├── FRONTEND_DEV_LOG.md
        └── ...
```

## How It Works

1. **User Request**: User tells CLIENT agent they want to create an app
2. **Project Creation**: CLIENT creates `PROJECT-[ID]/` in PROJECTS directory
3. **Requirements**: CLIENT documents requirements in REQUIREMENTS.md
4. **Architecture**: ARCHITECT designs system in ARCHITECTURE.md
5. **Task Creation**: ORCHESTRATOR breaks down work into tasks
6. **Development**: Agents write code in DELIVERABLES/SOURCE/
7. **Testing**: QA_ENGINEER/TESTER add tests in DELIVERABLES/TESTS/
8. **Documentation**: DOCUMENTOR creates docs in DELIVERABLES/DOCUMENTATION/
9. **Deployment**: DEPLOYMENT agent handles builds in DELIVERABLES/BUILDS/

## Important Notes

- All actual application code goes in `DELIVERABLES/SOURCE/`
- Each agent works within the project directory
- The Dashboard can monitor progress by reading these files
- Projects maintain complete history in WORK_LOGS/

## File Naming Convention

- Project IDs: `PROJECT-[YEAR]-[NUMBER]-[SHORT_NAME]`
- Example: `PROJECT-2024-001-ECOMMERCE`
- Example: `PROJECT-2024-002-TASK_MANAGER`
- Example: `PROJECT-2024-003-API_SERVICE`