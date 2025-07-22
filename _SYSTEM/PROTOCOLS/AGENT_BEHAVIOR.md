# AGENT BEHAVIOR PROTOCOL v1.0

## CORE WORK LOOP

```python
def WORK_LOOP():
    while agent_active:
        try:
            UPDATE_HEARTBEAT()
            CHECK_MESSAGES()
            PROCESS_BROADCASTS()
            
            if current_task:
                CONTINUE_TASK()
            else:
                FIND_WORK()
            
            REPORT_STATUS()
            CLEANUP_OLD_FILES()
            
        except Exception as e:
            HANDLE_ERROR(e)
        
        WAIT(30)  # seconds
```

## DETAILED PROCEDURES

### UPDATE_HEARTBEAT()
1. CREATE/UPDATE `/_SYSTEM/REGISTRY/HEARTBEATS/[AGENT_NAME]-[TIMESTAMP].md`:
   ```
   Agent: [AGENT_NAME]
   Status: [WORKING|IDLE|ERROR]
   Last Update: [TIMESTAMP]
   Current Task: [TASK_ID or NONE]
   Memory Usage: [PERCENTAGE]
   Error Count: [NUMBER]
   ```
2. CHECK for dead agents (no heartbeat > 2 minutes)
3. IF dead agent detected AND you are ORCHESTRATOR or AGENT_MANAGER:
   - RELEASE their locks
   - REASSIGN their tasks
   - LOG incident

### CHECK_MESSAGES()
1. LIST files in `/COMMUNICATION/MESSAGES/` matching `*-TO-[AGENT_NAME]-*.md`
2. SORT by priority (HIGH → MEDIUM → LOW) then by timestamp
3. For each message:
   - READ content
   - VALIDATE sender authenticity
   - PROCESS according to type:
     - REQUEST: Add to task queue
     - RESPONSE: Update waiting tasks
     - HANDOFF: Accept task ownership
     - ESCALATION: Priority handle
   - CREATE acknowledgment: `/COMMUNICATION/ACKNOWLEDGMENTS/ACK-[MSG_ID].md`
   - MOVE to `/COMMUNICATION/MESSAGES/PROCESSED/`

### FIND_WORK()
1. CHECK `/AGENTS/[AGENT_NAME]/STATE.md` for assigned tasks
2. IF no assigned task:
   - LIST `/WORK/INBOX/*.md`
   - For each task:
     ```python
     capability_score = CALCULATE_CAPABILITY_MATCH(task, agent_capabilities)
     workload_factor = CALCULATE_CURRENT_WORKLOAD()
     priority_boost = GET_PRIORITY_MULTIPLIER(task.priority)
     
     final_score = capability_score * (1 - workload_factor) * priority_boost
     
     if final_score > 0.7:
         ATTEMPT_CLAIM(task)
     ```

### ATTEMPT_CLAIM(task_id)
1. Generate claim file path: `/WORK/CLAIMED/[TASK_ID].lock`
2. CHECK if lock exists:
   - IF YES: Task already claimed, continue to next
3. CREATE lock file atomically:
   ```yaml
   agent: [AGENT_NAME]
   timestamp: [CURRENT_TIME]
   expires: [CURRENT_TIME + 3600]  # 1 hour
   capability_score: [SCORE]
   ```
4. WAIT 100ms (allow for race conditions)
5. READ the lock file:
   - IF agent == [AGENT_NAME]: SUCCESS
   - ELSE: Another agent won, continue

### EXECUTE_TASK()
1. MOVE task from `/WORK/INBOX/` to `/WORK/ACTIVE/`
2. UPDATE `/AGENTS/[AGENT_NAME]/STATE.md`:
   ```yaml
   current_task: [TASK_ID]
   started: [TIMESTAMP]
   progress: 0
   status: ANALYZING
   ```
3. CREATE work plan based on task type
4. For each step in plan:
   - EXECUTE step
   - UPDATE progress in task file
   - CHECK for interruption messages
   - HANDLE errors gracefully
5. On completion:
   - MOVE to `/WORK/COMPLETED/`
   - UPDATE metrics
   - RELEASE lock

### COLLABORATION PATTERNS

#### Requesting Help
```yaml
---
type: REQUEST
from: [YOUR_NAME]
to: [TARGET_AGENT]
priority: [HIGH|MEDIUM|LOW]
---
Subject: Need assistance with [BRIEF DESCRIPTION]

Context: [Current situation]
Need: [Specific help required]
Deadline: [When you need response]
```

#### Handing Off Work
```yaml
---
type: HANDOFF
from: [YOUR_NAME]
to: [TARGET_AGENT]
task_id: [TASK_ID]
---
Subject: Task handoff - [TASK_NAME]

Completed:
- [What you've done]

Remaining:
- [What's left to do]

Context:
- [Important information]

Files:
- [Relevant file paths]
```

### ERROR HANDLING

#### Error Levels
1. **RECOVERABLE**: Log and retry with backoff
2. **ESCALATION**: Can't handle, pass to senior agent
3. **CRITICAL**: System integrity at risk, emergency protocols
4. **FATAL**: Shut down gracefully, alert AGENT_MANAGER

#### Recovery Procedures
```python
def HANDLE_ERROR(error):
    LOG_ERROR(error)
    
    if error.is_recoverable():
        RETRY_WITH_BACKOFF()
    elif error.needs_escalation():
        ESCALATE_TO_SENIOR()
    elif error.is_critical():
        ENTER_SAFE_MODE()
        ALERT_ALL_AGENTS()
    else:  # fatal
        GRACEFUL_SHUTDOWN()
```

### PERFORMANCE OPTIMIZATION

1. **File Operations**
   - Cache frequently read files (TTL: 5 minutes)
   - Batch write operations when possible
   - Use file modification times to skip unchanged files

2. **Message Processing**
   - Process high priority first
   - Batch acknowledgments
   - Archive old messages daily

3. **Task Selection**
   - Prefer tasks matching your specialty
   - Consider task locality (related to current work)
   - Balance workload across agents

### LEARNING AND MEMORY

1. After each task completion:
   - UPDATE `/AGENTS/[AGENT_NAME]/MEMORY.md` with:
     - Problem patterns encountered
     - Solutions that worked
     - Time estimates for future reference
     - Collaboration patterns that were effective

2. Periodically:
   - ANALYZE your memory for patterns
   - UPDATE your capability scores based on success rates
   - SHARE insights with other agents via BROADCAST