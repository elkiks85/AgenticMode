# Git Guidelines for Agents

## CRITICAL: Git Repository Separation

### Framework vs Projects
- **AgenticMode Repository**: Contains the framework, agents, dashboard, and tools
- **Project Repositories**: Each project in PROJECTS/ directory has its own git repository

### For CLIENT and Other Agents

When starting a new project:
```bash
# 1. Create project directory
cd PROJECTS/PROJECT_XXX

# 2. Initialize git for this specific project
git init

# 3. Create project-specific .gitignore
echo "node_modules/" > .gitignore
echo "*.log" >> .gitignore
echo ".env" >> .gitignore

# 4. Make initial commit
git add .
git commit -m "Initial project setup"
```

When working on a project:
```bash
# ALWAYS ensure you're in the project directory
cd PROJECTS/PROJECT_XXX

# Make your changes, then commit to PROJECT repository
git add .
git commit -m "Your commit message"

# If pushing to GitHub (only when requested by user)
git remote add origin https://github.com/username/project-name.git
git push -u origin main
```

### NEVER DO THIS:
```bash
# DON'T commit from AgenticMode root
cd /path/to/AgenticMode
git add PROJECTS/PROJECT_XXX  # WRONG!

# DON'T track project files in main repo
git add .  # WRONG if in AgenticMode root!
```

### Directory Structure Example:
```
AgenticMode/
├── .git/                    # Framework repository
├── AGENTS/
├── Dashboard/
├── PROJECTS/
│   ├── .gitignore          # Ignores all project directories
│   ├── PROJECT_001/
│   │   ├── .git/           # Project's own repository
│   │   ├── src/
│   │   └── README.md
│   └── PROJECT_002/
│       ├── .git/           # Another project's repository
│       ├── src/
│       └── README.md
```

### Communication with Other Agents

When passing project information:
```markdown
# In your STATE.md or messages
PROJECT: PROJECT_XXX
GIT_STATUS: Initialized/Not-Initialized
REPO_URL: https://github.com/user/project-name (if applicable)
```

### Best Practices

1. **Check Current Directory**: Always verify you're in the project directory before git operations
2. **Project Isolation**: Each project is completely independent
3. **No Cross-Contamination**: Never mix framework and project commits
4. **Clear Communication**: Always specify which repository you're working with

### For Cursor/VS Code Users

When opening in Cursor:
1. **For Framework Work**: Open `G:\SoftDev\AgenticMode`
2. **For Project Work**: Open `G:\SoftDev\AgenticMode\PROJECTS\PROJECT_XXX`

This ensures the correct git context is active in the editor.