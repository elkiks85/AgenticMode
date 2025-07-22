# Communication Directory

This directory contains all inter-agent communications.

## Structure

- `MESSAGES/` - Direct agent-to-agent messages
- `BROADCAST/` - System-wide announcements
- `ACKNOWLEDGMENTS/` - Message receipt confirmations

## Message Format

All messages follow this structure:

```markdown
# MESSAGE-[ID]

**From**: [AGENT_NAME]
**To**: [AGENT_NAME] or ALL
**Timestamp**: [ISO_TIMESTAMP]
**Type**: [REQUEST|RESPONSE|UPDATE|ALERT]
**Priority**: [LOW|NORMAL|HIGH|CRITICAL]

## Subject
[Brief subject line]

## Content
[Message content]

## Required Action
[What the recipient should do]
```