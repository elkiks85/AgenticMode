# Projects Directory

This directory contains individual projects managed by the AgenticMode system.

## Important: Git Repository Structure

Each project in this directory should have its own Git repository. The main AgenticMode repository does NOT track the contents of individual projects.

### Structure:
```
PROJECTS/
├── .gitignore (this ensures projects aren't tracked by AgenticMode)
├── README.md (this file)
├── PROJECT_001/ (has its own .git/)
├── PROJECT_002/ (has its own .git/)
└── ... (each with their own git repo)
```

### For Agents:
When working on a project, agents should:
1. Initialize git within the project directory
2. Commit changes to the project's own repository
3. Never commit project files to the main AgenticMode repository

### For Users:
1. Each project can be pushed to its own GitHub repository
2. The AgenticMode framework remains separate from project code
3. You can share the framework without sharing your projects