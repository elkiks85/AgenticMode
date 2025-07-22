# INTER-AGENT COMMUNICATION PROTOCOL v1.0

## MESSAGE FORMAT

All messages must follow this structure:

```yaml
---
id: MSG-[TIMESTAMP]-[RANDOM_ID]
from: [SENDER_AGENT_NAME]
to: [RECIPIENT_AGENT_NAME]  # or "BROADCAST" for all
type: [REQUEST|RESPONSE|HANDOFF|BROADCAST|ESCALATION|UPDATE|DECISION]
priority: [CRITICAL|HIGH|MEDIUM|LOW]
thread_id: [PARENT_MSG_ID or NEW]
expires: [ISO_TIMESTAMP]
requires_ack: [true|false]
---

## [Subject Line - Brief Description]

### Content
[Main message content in markdown format]

### Required Action
[Specific action needed from recipient]

### Deadline
[When response/action needed by]

### Context
- Related Task: [TASK_ID if applicable]
- Related Project: [PROJECT_ID if applicable]
- Previous Messages: [MSG_IDs for context]

### Attachments
- [List of file paths or references]
```

## MESSAGE TYPES

### REQUEST
Asking another agent to perform an action or provide information.
```yaml
type: REQUEST
requires_ack: true
Example subjects:
- "Need API endpoint design for user authentication"
- "Please review code for security vulnerabilities"
- "Require database schema for user profiles"
```

### RESPONSE
Replying to a REQUEST with results or information.
```yaml
type: RESPONSE
thread_id: [Original REQUEST msg id]
Example subjects:
- "RE: API endpoint design - Completed"
- "RE: Security review - 3 issues found"
- "RE: Database schema - See attached"
```

### HANDOFF
Transferring task ownership to another agent.
```yaml
type: HANDOFF
requires_ack: true
Must include:
- Current task state
- Completed work summary
- Remaining work
- All relevant context
- File locations
```

### BROADCAST
System-wide announcements or updates.
```yaml
type: BROADCAST
to: BROADCAST
Example subjects:
- "New project starting: E-Commerce Platform"
- "System maintenance scheduled for 02:00"
- "Critical security update required"
```

### ESCALATION
Urgent issues requiring senior agent attention.
```yaml
type: ESCALATION
priority: HIGH or CRITICAL
requires_ack: true
Example subjects:
- "Cannot resolve dependency conflict"
- "Security vulnerability discovered"
- "Project deadline at risk"
```

### UPDATE
Progress or status updates.
```yaml
type: UPDATE
requires_ack: false
Example subjects:
- "Task progress: Authentication API 75% complete"
- "Daily status: 5 tasks completed"
- "Blocker resolved: Database connection issue"
```

### DECISION
Requesting a decision from authorized agents or humans.
```yaml
type: DECISION
requires_ack: true
Must include:
- Clear question
- Available options
- Pros/cons of each option
- Recommendation
- Impact analysis
```

## COMMUNICATION PROCEDURES

### SENDING MESSAGES

1. **Create Message File**
   ```bash
   Filename: [PRIORITY]-TO-[RECIPIENT]-MSG-[TIMESTAMP]-[ID].md
   Location: /COMMUNICATION/MESSAGES/
   ```

2. **Priority Prefixes**
   - `CRITICAL-` : Immediate attention required
   - `HIGH-` : Respond within 30 minutes
   - `MEDIUM-` : Respond within 2 hours
   - `LOW-` : Respond when convenient

3. **Wait for Acknowledgment**
   - Check `/COMMUNICATION/ACKNOWLEDGMENTS/` for ACK file
   - Timeout based on priority:
     - CRITICAL: 5 minutes
     - HIGH: 30 minutes
     - MEDIUM: 2 hours
     - LOW: 24 hours

4. **Handle No Response**
   ```python
   if no_ack and message.requires_ack:
       if message.priority == "CRITICAL":
           ESCALATE_TO_ORCHESTRATOR()
       else:
           RESEND_WITH_HIGHER_PRIORITY()
   ```

### RECEIVING MESSAGES

1. **Scan for Messages**
   ```python
   Pattern: "*-TO-[MY_NAME]-*.md" or "*-TO-BROADCAST-*.md"
   Location: /COMMUNICATION/MESSAGES/
   Frequency: Every 30 seconds
   ```

2. **Process by Priority**
   - Sort by priority then timestamp
   - Process CRITICAL immediately
   - Queue others based on current workload

3. **Send Acknowledgment**
   ```yaml
   Filename: ACK-[ORIGINAL_MSG_ID].md
   Content:
   ---
   ack_id: ACK-[TIMESTAMP]
   original_msg: [MSG_ID]
   received_by: [AGENT_NAME]
   received_at: [TIMESTAMP]
   status: [RECEIVED|PROCESSING|COMPLETED|ERROR]
   ---
   ```

4. **Move to Processed**
   ```bash
   From: /COMMUNICATION/MESSAGES/[filename]
   To: /COMMUNICATION/MESSAGES/PROCESSED/[date]/[filename]
   ```

## CONVERSATION THREADING

### Starting a Thread
```yaml
thread_id: NEW
subject: "Initial topic"
```

### Continuing a Thread
```yaml
thread_id: [MSG_ID of first message]
subject: "RE: Initial topic"
```

### Thread Rules
1. Keep thread_id consistent throughout conversation
2. Include context from previous messages
3. Summarize long threads periodically
4. Close threads when topic is resolved

## BROADCAST PROTOCOL

### Who Can Broadcast
- ORCHESTRATOR: Task assignments, system coordination
- AGENT_MANAGER: System updates, policy changes
- CLIENT: New projects, priority changes
- Any agent: CRITICAL security or system issues

### Broadcast Etiquette
1. Use sparingly - only for system-wide relevance
2. Keep messages concise
3. Include clear action items if any
4. Tag with appropriate priority

## ERROR HANDLING

### Communication Failures

1. **Message Corruption**
   ```python
   if message_invalid_format:
       LOG_ERROR("Corrupted message: " + filename)
       NOTIFY_SENDER_IF_POSSIBLE()
       QUARANTINE_MESSAGE()
   ```

2. **Unknown Recipient**
   ```python
   if recipient_not_found:
       if sender == "CLIENT":
           CREATE_AGENT_REQUEST()
       else:
           RETURN_TO_SENDER()
   ```

3. **Overload Protection**
   ```python
   if message_queue_size > 100:
       PAUSE_LOW_PRIORITY_PROCESSING()
       NOTIFY_ORCHESTRATOR()
       PROCESS_CRITICAL_ONLY()
   ```

## BEST PRACTICES

1. **Be Concise**: Get to the point quickly
2. **Be Specific**: Include all necessary details
3. **Be Actionable**: Clear next steps
4. **Be Timely**: Respond within priority windows
5. **Be Professional**: Maintain system efficiency

## MESSAGE TEMPLATES

### Task Handoff Template
```yaml
---
type: HANDOFF
from: [YOUR_NAME]
to: [TARGET_AGENT]
priority: MEDIUM
---

## Task Handoff: [TASK_NAME]

### Completed Work
- [List what you've done]
- [Include specific files modified]

### Current State
- [Where the task stands]
- [Any blockers or issues]

### Remaining Work
- [What needs to be done]
- [Estimated effort]

### Important Context
- [Key decisions made]
- [Assumptions]
- [Dependencies]

### Files and Resources
- Source code: [paths]
- Documentation: [paths]
- Tests: [paths]
```

### Escalation Template
```yaml
---
type: ESCALATION
from: [YOUR_NAME]
to: ORCHESTRATOR
priority: HIGH
---

## Escalation: [ISSUE_SUMMARY]

### Issue Description
[Detailed description of the problem]

### What I've Tried
1. [Attempt 1 and result]
2. [Attempt 2 and result]

### Why It's Blocked
[Root cause if known]

### Impact
- Task affected: [TASK_ID]
- Project impact: [Description]
- Other agents affected: [List]

### Recommended Action
[What you think should be done]

### Urgency
[Why this needs immediate attention]
```