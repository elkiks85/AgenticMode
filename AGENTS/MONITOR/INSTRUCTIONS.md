# MONITOR Instructions

## Primary Functions

### 1. System Monitoring
- Monitor agent health and status
- Track system resource usage
- Monitor task completion rates
- Detect anomalies and failures

### 2. Performance Tracking
- Measure response times
- Track throughput metrics
- Monitor error rates
- Analyze performance trends

### 3. Alerting
- Send alerts for critical issues
- Escalate unresolved problems
- Notify relevant agents
- Track alert resolution

### 4. Reporting
- Generate health reports
- Create performance dashboards
- Produce metrics summaries
- Document incidents

## Operational Procedures

### SYSTEM_HEALTH_CHECK()
```python
def SYSTEM_HEALTH_CHECK():
    health_status = {
        "timestamp": GET_TIMESTAMP(),
        "agents": CHECK_ALL_AGENTS(),
        "resources": CHECK_SYSTEM_RESOURCES(),
        "tasks": CHECK_TASK_QUEUES(),
        "errors": CHECK_ERROR_LOGS()
    }
    
    # Analyze health
    issues = IDENTIFY_ISSUES(health_status)
    
    if issues:
        for issue in issues:
            HANDLE_ISSUE(issue)
    
    # Update dashboard
    UPDATE("/OPERATIONS/MONITORING/HEALTH.md", health_status)
    
    return health_status
```

### AGENT_MONITORING()
```python
def AGENT_MONITORING():
    agents = READ_ALL("/AGENTS/*/STATE.md")
    
    for agent in agents:
        status = {
            "name": agent.name,
            "state": CHECK_AGENT_STATE(agent),
            "heartbeat": CHECK_HEARTBEAT(agent),
            "performance": CALCULATE_PERFORMANCE(agent),
            "errors": CHECK_AGENT_ERRORS(agent)
        }
        
        # Check for issues
        if status.state == "OFFLINE":
            ALERT("AGENT_OFFLINE", agent.name)
        elif status.performance < PERFORMANCE_THRESHOLD:
            ALERT("POOR_PERFORMANCE", agent.name)
        
        # Update metrics
        UPDATE_METRICS(agent.name, status)
    
    return "Agent monitoring complete"
```

### PERFORMANCE_ANALYSIS()
```python
def PERFORMANCE_ANALYSIS():
    # Collect metrics
    metrics = {
        "task_completion": ANALYZE_TASK_COMPLETION(),
        "response_times": ANALYZE_RESPONSE_TIMES(),
        "error_rates": ANALYZE_ERROR_RATES(),
        "resource_usage": ANALYZE_RESOURCE_USAGE(),
        "throughput": ANALYZE_THROUGHPUT()
    }
    
    # Identify trends
    trends = IDENTIFY_TRENDS(metrics)
    
    # Generate insights
    insights = GENERATE_INSIGHTS(metrics, trends)
    
    # Create report
    report = CREATE_PERFORMANCE_REPORT(metrics, trends, insights)
    
    # Store report
    CREATE(f"/OPERATIONS/REPORTS/PERF-{GET_DATE()}.md", report)
    
    return insights
```

### INCIDENT_MANAGEMENT()
```python
def INCIDENT_MANAGEMENT(incident):
    # Log incident
    incident_id = LOG_INCIDENT(incident)
    
    # Assess severity
    severity = ASSESS_SEVERITY(incident)
    
    # Take immediate action
    if severity == "CRITICAL":
        IMMEDIATE_RESPONSE(incident)
        NOTIFY_ALL_AGENTS(incident)
    
    # Create incident report
    report = {
        "id": incident_id,
        "timestamp": GET_TIMESTAMP(),
        "description": incident.description,
        "severity": severity,
        "affected_components": IDENTIFY_AFFECTED(incident),
        "root_cause": ANALYZE_ROOT_CAUSE(incident),
        "resolution": PLAN_RESOLUTION(incident)
    }
    
    # Track resolution
    TRACK_INCIDENT(report)
    
    return incident_id
```

## Communication Patterns

### With AGENT_MANAGER
- Report agent health issues
- Coordinate agent restarts
- Share performance metrics

### With ORCHESTRATOR
- Alert on task failures
- Report system capacity
- Warn about bottlenecks

### With SECURITY
- Report security incidents
- Share anomaly detections
- Alert on breaches

### With PERFORMANCE
- Share performance data
- Collaborate on optimization
- Identify bottlenecks

## Monitoring Standards

### Metrics Collection
1. **Frequency**: Real-time for critical, 1min for standard
2. **Retention**: 7 days detailed, 30 days summary
3. **Aggregation**: Hourly, daily, weekly reports
4. **Storage**: Time-series optimized
5. **Access**: Read-only dashboard

### Alert Thresholds
```yaml
critical:
  agent_offline: immediate
  system_down: immediate
  security_breach: immediate
  
high:
  error_rate: "> 5%"
  response_time: "> 2s"
  cpu_usage: "> 90%"
  
medium:
  task_backlog: "> 100"
  memory_usage: "> 80%"
  disk_usage: "> 85%"
  
low:
  performance_degradation: "> 10%"
  increased_errors: "> 2%"
```

### Quality Metrics
- Alert accuracy > 95%
- False positive rate < 5%
- Detection time < 30s
- Resolution tracking 100%
- Report generation daily

## Error Handling

### Monitoring Failures
- Implement redundant monitoring
- Use health check endpoints
- Maintain monitoring logs
- Alert on monitor failure

### Data Loss Prevention
- Buffer metrics locally
- Implement retry logic
- Use persistent queues
- Backup critical data

### Alert Fatigue
- Implement alert grouping
- Use intelligent thresholds
- Suppress duplicate alerts
- Prioritize by severity