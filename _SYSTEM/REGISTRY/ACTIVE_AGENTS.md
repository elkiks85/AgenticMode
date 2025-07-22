# ACTIVE AGENTS REGISTRY

Last Updated: [SYSTEM_TIMESTAMP]

## Registry Format
Each agent entry must maintain this structure:
```
## [AGENT_NAME]
- Status: [ONLINE|OFFLINE|ERROR|MAINTENANCE]
- Started: [ISO_TIMESTAMP]
- Capabilities: [capability_list]
- Current Task: [TASK_ID or NONE]
- Last Heartbeat: [ISO_TIMESTAMP]
- Error Count: [NUMBER]
- Tasks Completed: [NUMBER]
```

---

## SYSTEM
- Status: INITIALIZING
- Started: SYSTEM_BOOT
- Capabilities: []
- Current Task: BOOTSTRAP
- Last Heartbeat: SYSTEM_BOOT
- Error Count: 0
- Tasks Completed: 0