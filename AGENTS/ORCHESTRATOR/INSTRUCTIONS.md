# ORCHESTRATOR INSTRUCTIONS

## INITIALIZATION SEQUENCE

```python
def ORCHESTRATOR_INIT():
    # 1. System state assessment
    ASSESS_SYSTEM_STATE()
    INVENTORY_ACTIVE_AGENTS()
    ANALYZE_TASK_QUEUES()
    
    # 2. Load optimization parameters
    LOAD_WORKLOAD_THRESHOLDS()
    LOAD_CAPABILITY_MATRIX()
    INITIALIZE_PERFORMANCE_METRICS()
    
    # 3. Start monitoring loops
    START_TASK_MONITOR()
    START_WORKLOAD_MONITOR()
    START_PERFORMANCE_MONITOR()
    
    # 4. Check for stuck work
    RECOVER_ORPHANED_TASKS()
    RESOLVE_STALE_LOCKS()
    
    # 5. Enter orchestration loop
    ORCHESTRATION_LOOP()
```

## CORE ORCHESTRATION LOOP

```python
def ORCHESTRATION_LOOP():
    while active:
        # Real-time task distribution
        DISTRIBUTE_NEW_TASKS()
        
        # Workload optimization
        if WORKLOAD_IMBALANCED():
            REBALANCE_ASSIGNMENTS()
        
        # Dependency management
        RESOLVE_TASK_DEPENDENCIES()
        
        # Performance monitoring
        CHECK_TASK_PROGRESS()
        IDENTIFY_BOTTLENECKS()
        
        # Conflict resolution
        HANDLE_CONFLICTS()
        
        # System optimization
        if PERFORMANCE_DEGRADED():
            OPTIMIZE_WORKFLOWS()
        
        WAIT(15)  # Higher frequency than regular agents
```

## TASK DISTRIBUTION ALGORITHM

```python
def DISTRIBUTE_NEW_TASKS():
    new_tasks = GET_UNASSIGNED_TASKS()
    available_agents = GET_AVAILABLE_AGENTS()
    
    for task in new_tasks:
        # 1. Analyze task requirements
        required_capabilities = EXTRACT_CAPABILITIES(task)
        estimated_effort = ESTIMATE_TASK_EFFORT(task)
        dependencies = IDENTIFY_DEPENDENCIES(task)
        
        # 2. Score agents for this task
        agent_scores = {}
        for agent in available_agents:
            score = CALCULATE_ASSIGNMENT_SCORE(
                agent=agent,
                task=task,
                factors={
                    "capability_match": 0.4,
                    "current_workload": 0.3,
                    "past_performance": 0.2,
                    "team_cohesion": 0.1
                }
            )
            agent_scores[agent] = score
        
        # 3. Assign to best agent
        best_agent = MAX_SCORE(agent_scores)
        if agent_scores[best_agent] > 0.7:
            ASSIGN_TASK(task, best_agent)
        else:
            # No suitable agent
            if task.priority == "CRITICAL":
                ESCALATE_TO_AGENT_MANAGER(
                    f"No suitable agent for critical task {task.id}"
                )
            else:
                QUEUE_FOR_LATER(task)
```

### ASSIGNMENT SCORING FORMULA

```python
def CALCULATE_ASSIGNMENT_SCORE(agent, task, factors):
    # Capability match (0-1)
    capability_score = 0
    for cap in task.required_capabilities:
        agent_score = agent.capabilities.get(cap, 0)
        capability_score += agent_score * task.capability_weights[cap]
    capability_score /= len(task.required_capabilities)
    
    # Workload factor (0-1, inverted)
    current_tasks = len(agent.active_tasks)
    workload_score = 1 - (current_tasks / agent.max_concurrent_tasks)
    
    # Past performance (0-1)
    similar_tasks = GET_SIMILAR_COMPLETED_TASKS(agent, task.type)
    if similar_tasks:
        performance_score = (
            similar_tasks.success_rate * 0.5 +
            similar_tasks.time_efficiency * 0.3 +
            similar_tasks.quality_score * 0.2
        )
    else:
        performance_score = 0.7  # Default for new task types
    
    # Team cohesion (0-1)
    if task.project_id:
        cohesion_score = CALCULATE_TEAM_COHESION(
            agent, 
            GET_PROJECT_TEAM(task.project_id)
        )
    else:
        cohesion_score = 0.5
    
    # Weighted final score
    final_score = (
        capability_score * factors["capability_match"] +
        workload_score * factors["current_workload"] +
        performance_score * factors["past_performance"] +
        cohesion_score * factors["team_cohesion"]
    )
    
    return final_score
```

## WORKLOAD BALANCING

```python
def REBALANCE_ASSIGNMENTS():
    agents = GET_ALL_ACTIVE_AGENTS()
    
    # Calculate workload metrics
    workload_data = {}
    for agent in agents:
        workload_data[agent] = {
            "task_count": len(agent.active_tasks),
            "estimated_hours": SUM(task.estimated_hours for task in agent.active_tasks),
            "complexity_score": SUM(task.complexity for task in agent.active_tasks),
            "utilization": CALCULATE_UTILIZATION(agent)
        }
    
    # Identify imbalances
    avg_utilization = MEAN(w["utilization"] for w in workload_data.values())
    overloaded = [a for a, w in workload_data.items() if w["utilization"] > avg_utilization * 1.5]
    underloaded = [a for a, w in workload_data.items() if w["utilization"] < avg_utilization * 0.5]
    
    # Redistribute tasks
    for overloaded_agent in overloaded:
        transferable_tasks = IDENTIFY_TRANSFERABLE_TASKS(overloaded_agent)
        
        for task in transferable_tasks:
            suitable_agents = [
                a for a in underloaded 
                if CAPABILITY_MATCH(a, task) > 0.7
            ]
            
            if suitable_agents:
                best_recipient = MAX(
                    suitable_agents,
                    key=lambda a: CAPABILITY_MATCH(a, task)
                )
                
                INITIATE_TASK_TRANSFER(
                    from_agent=overloaded_agent,
                    to_agent=best_recipient,
                    task=task
                )
```

## DEPENDENCY MANAGEMENT

```python
def RESOLVE_TASK_DEPENDENCIES():
    all_tasks = GET_ALL_ACTIVE_TASKS()
    
    # Build dependency graph
    dep_graph = BUILD_DEPENDENCY_GRAPH(all_tasks)
    
    # Check for circular dependencies
    if cycles := FIND_CYCLES(dep_graph):
        for cycle in cycles:
            BREAK_CIRCULAR_DEPENDENCY(cycle)
    
    # Identify blocked tasks
    for task in all_tasks:
        if blockers := GET_BLOCKING_TASKS(task, dep_graph):
            if all(b.status == "COMPLETED" for b in blockers):
                # All dependencies met
                UNBLOCK_TASK(task)
            else:
                # Check if we can accelerate blockers
                for blocker in blockers:
                    if blocker.status == "NOT_STARTED":
                        INCREASE_PRIORITY(blocker)
                    elif blocker.status == "IN_PROGRESS":
                        if TASK_STALLED(blocker):
                            INVESTIGATE_STALL(blocker)
```

## CONFLICT RESOLUTION

```python
def HANDLE_CONFLICTS():
    conflicts = DETECT_CONFLICTS()
    
    for conflict in conflicts:
        if conflict.type == "RESOURCE_CONTENTION":
            # Two agents need same resource
            RESOLVE_RESOURCE_CONFLICT(conflict)
            
        elif conflict.type == "TASK_DISPUTE":
            # Multiple agents claimed same task
            winner = DETERMINE_RIGHTFUL_OWNER(conflict)
            AWARD_TASK_TO(winner, conflict.task)
            NOTIFY_OTHERS(conflict.agents - {winner})
            
        elif conflict.type == "DECISION_CONFLICT":
            # Agents disagree on approach
            if CAN_DECIDE(conflict):
                decision = MAKE_TECHNICAL_DECISION(conflict)
                COMMUNICATE_DECISION(conflict.agents, decision)
            else:
                ESCALATE_TO_ARCHITECT(conflict)
                
        elif conflict.type == "PRIORITY_CONFLICT":
            # Conflicting priority assessments
            true_priority = EVALUATE_BUSINESS_IMPACT(conflict.tasks)
            ADJUST_PRIORITIES(true_priority)
```

## PERFORMANCE OPTIMIZATION

```python
def OPTIMIZE_WORKFLOWS():
    # Analyze performance metrics
    metrics = {
        "task_completion_time": ANALYZE_COMPLETION_TIMES(),
        "agent_efficiency": ANALYZE_AGENT_EFFICIENCY(),
        "bottlenecks": IDENTIFY_BOTTLENECKS(),
        "error_rates": ANALYZE_ERROR_RATES()
    }
    
    # Apply optimizations
    for bottleneck in metrics["bottlenecks"]:
        if bottleneck.type == "CAPABILITY_GAP":
            REQUEST_AGENT_TRAINING(bottleneck.capability)
            TEMPORARY_WORKLOAD_ADJUSTMENT(bottleneck.affected_agents)
            
        elif bottleneck.type == "RESOURCE_CONSTRAINT":
            OPTIMIZE_RESOURCE_USAGE(bottleneck.resource)
            IMPLEMENT_RESOURCE_SHARING(bottleneck.resource)
            
        elif bottleneck.type == "COMMUNICATION_OVERHEAD":
            STREAMLINE_COMMUNICATION(bottleneck.agents)
            CREATE_DIRECT_CHANNELS(bottleneck.frequent_pairs)
```

## COMPLEX TASK BREAKDOWN

```python
def BREAK_DOWN_COMPLEX_TASK(task):
    # Analyze task complexity
    complexity_factors = {
        "technical_complexity": ASSESS_TECHNICAL_COMPLEXITY(task),
        "size": ESTIMATE_SIZE(task),
        "dependencies": COUNT_DEPENDENCIES(task),
        "unknowns": IDENTIFY_UNKNOWNS(task)
    }
    
    if NEEDS_BREAKDOWN(complexity_factors):
        # Create subtask structure
        subtasks = []
        
        # 1. Planning phase
        subtasks.append(CREATE_SUBTASK(
            parent=task,
            type="PLANNING",
            assigned_to="ARCHITECT",
            description="Create technical design and approach"
        ))
        
        # 2. Implementation phases
        components = IDENTIFY_COMPONENTS(task)
        for component in components:
            subtasks.append(CREATE_SUBTASK(
                parent=task,
                type="IMPLEMENTATION",
                component=component,
                assigned_to=BEST_AGENT_FOR(component)
            ))
        
        # 3. Integration phase
        subtasks.append(CREATE_SUBTASK(
            parent=task,
            type="INTEGRATION",
            dependencies=[s.id for s in subtasks[1:]],
            description="Integrate all components"
        ))
        
        # 4. Testing phase
        subtasks.append(CREATE_SUBTASK(
            parent=task,
            type="TESTING",
            assigned_to="QA_ENGINEER",
            dependencies=[subtasks[-1].id]
        ))
        
        # Create dependency graph
        CREATE_SUBTASK_DEPENDENCIES(subtasks)
        
        # Replace original task with subtasks
        ARCHIVE_ORIGINAL_TASK(task)
        ACTIVATE_SUBTASKS(subtasks)
```

## EMERGENCY PROCEDURES

```python
def HANDLE_SYSTEM_EMERGENCY(emergency_type):
    if emergency_type == "AGENT_CASCADE_FAILURE":
        # Multiple agents failing
        PAUSE_NEW_ASSIGNMENTS()
        STABILIZE_RUNNING_TASKS()
        ACTIVATE_BACKUP_PROTOCOLS()
        ALERT_AGENT_MANAGER("CASCADE_FAILURE")
        
    elif emergency_type == "CRITICAL_TASK_FAILURE":
        # Critical task about to fail
        MOBILIZE_BEST_AGENTS()
        DEPRIORITIZE_NON_CRITICAL()
        CREATE_TASK_FORCE()
        ENABLE_OVERTIME_MODE()
        
    elif emergency_type == "DEADLINE_RISK":
        # Project deadline in jeopardy
        ANALYZE_CRITICAL_PATH()
        ELIMINATE_NON_ESSENTIAL()
        PARALLELIZE_WHERE_POSSIBLE()
        REQUEST_ADDITIONAL_RESOURCES()
```

## REPORTING AND METRICS

```python
def GENERATE_ORCHESTRATION_REPORT():
    report = {
        "timestamp": NOW(),
        "system_health": CALCULATE_SYSTEM_HEALTH(),
        "active_agents": COUNT_ACTIVE_AGENTS(),
        "task_metrics": {
            "total": COUNT_ALL_TASKS(),
            "in_progress": COUNT_IN_PROGRESS(),
            "completed_today": COUNT_COMPLETED_TODAY(),
            "blocked": COUNT_BLOCKED(),
            "critical": COUNT_CRITICAL()
        },
        "performance_metrics": {
            "avg_completion_time": CALCULATE_AVG_COMPLETION(),
            "success_rate": CALCULATE_SUCCESS_RATE(),
            "efficiency_score": CALCULATE_EFFICIENCY()
        },
        "bottlenecks": IDENTIFY_CURRENT_BOTTLENECKS(),
        "recommendations": GENERATE_OPTIMIZATION_SUGGESTIONS()
    }
    
    SAVE_REPORT(f"/OPERATIONS/REPORTS/orchestration-{DATE}.md", report)
    
    if report["system_health"] < 0.7:
        ALERT_AGENT_MANAGER("System health below threshold")
```

## COORDINATION PROTOCOLS

### Multi-Agent Task Force
For complex tasks requiring multiple specialists:

```python
def CREATE_TASK_FORCE(project, requirements):
    # Select team members
    team = {
        "lead": SELECT_LEAD_AGENT(requirements),
        "members": SELECT_TEAM_MEMBERS(requirements)
    }
    
    # Create coordination structure
    CREATE_TEAM_CHANNEL(team)
    ASSIGN_RESPONSIBILITIES(team, requirements)
    ESTABLISH_CHECKPOINTS(project.milestones)
    
    # Monitor coordination
    TRACK_TEAM_PERFORMANCE(team)
    FACILITATE_COMMUNICATION(team)
    RESOLVE_TEAM_CONFLICTS(team)
```

### Handoff Orchestration
Ensuring smooth transitions between agents:

```python
def ORCHESTRATE_HANDOFF(from_agent, to_agent, task):
    # Prepare handoff
    NOTIFY_RECIPIENT(to_agent, task)
    REQUEST_HANDOFF_PACKAGE(from_agent, task)
    
    # Validate handoff
    package = WAIT_FOR_PACKAGE(timeout=3600)
    if VALIDATE_PACKAGE(package):
        TRANSFER_OWNERSHIP(task, to_agent)
        CONFIRM_RECEIPT(to_agent)
        RELEASE_FROM_AGENT(from_agent, task)
    else:
        MEDIATE_HANDOFF(from_agent, to_agent, task)
```