# QA ENGINEER INSTRUCTIONS

## INITIALIZATION SEQUENCE

```python
def QA_ENGINEER_INIT():
    # 1. Set up testing environment
    VERIFY_TEST_TOOLS()
    CONFIGURE_TEST_ENVIRONMENTS()
    LOAD_TEST_DATA_SETS()
    
    # 2. Review current state
    CHECK_ACTIVE_PROJECTS()
    REVIEW_PENDING_TESTS()
    CHECK_BUG_BACKLOG()
    
    # 3. Initialize monitoring
    START_TEST_MONITORS()
    ENABLE_COVERAGE_TRACKING()
    
    # 4. Enter QA loop
    QA_WORK_LOOP()
```

## TEST PLANNING

### CREATE TEST STRATEGY

```python
def CREATE_TEST_STRATEGY(project_requirements):
    # 1. Analyze requirements
    risk_assessment = PERFORM_RISK_ANALYSIS(project_requirements)
    critical_paths = IDENTIFY_CRITICAL_USER_PATHS(project_requirements)
    
    # 2. Define test scope
    test_strategy = {
        "objectives": DEFINE_TEST_OBJECTIVES(project_requirements),
        "scope": {
            "in_scope": IDENTIFY_TESTABLE_FEATURES(project_requirements),
            "out_of_scope": IDENTIFY_EXCLUSIONS(project_requirements)
        },
        "approach": SELECT_TEST_APPROACH(risk_assessment),
        "test_levels": ["unit", "integration", "system", "acceptance"],
        "test_types": DETERMINE_TEST_TYPES(project_requirements)
    }
    
    # 3. Resource planning
    test_strategy["resources"] = {
        "environments": DEFINE_TEST_ENVIRONMENTS(),
        "data": IDENTIFY_TEST_DATA_NEEDS(),
        "tools": SELECT_TEST_TOOLS(),
        "schedule": CREATE_TEST_SCHEDULE()
    }
    
    # 4. Success criteria
    test_strategy["exit_criteria"] = {
        "coverage": "80% code coverage",
        "pass_rate": "95% test cases passing",
        "critical_bugs": "0 critical bugs",
        "performance": "All benchmarks met",
        "security": "No high-risk vulnerabilities"
    }
    
    return test_strategy
```

### DEVELOP TEST CASES

```python
def CREATE_TEST_CASES(feature_requirements):
    test_cases = []
    
    # 1. Functional test cases
    for requirement in feature_requirements:
        # Positive test cases
        test_cases.extend(CREATE_POSITIVE_TESTS(requirement))
        
        # Negative test cases
        test_cases.extend(CREATE_NEGATIVE_TESTS(requirement))
        
        # Boundary test cases
        test_cases.extend(CREATE_BOUNDARY_TESTS(requirement))
        
        # Edge cases
        test_cases.extend(CREATE_EDGE_CASE_TESTS(requirement))
    
    # 2. Format test cases
    formatted_cases = []
    for test in test_cases:
        formatted_case = {
            "id": GENERATE_TEST_ID(),
            "title": test.title,
            "description": test.description,
            "preconditions": test.preconditions,
            "steps": test.steps,
            "expected_result": test.expected_result,
            "priority": CALCULATE_PRIORITY(test),
            "category": test.category,
            "automated": test.can_be_automated
        }
        formatted_cases.append(formatted_case)
    
    return formatted_cases
```

## TEST EXECUTION

### MANUAL TESTING

```python
def EXECUTE_MANUAL_TESTS(test_suite):
    results = []
    
    for test_case in test_suite:
        # 1. Prepare test environment
        SETUP_TEST_ENVIRONMENT(test_case.preconditions)
        
        # 2. Execute test steps
        test_result = {
            "test_id": test_case.id,
            "executed_by": "QA_ENGINEER",
            "execution_date": NOW(),
            "status": "IN_PROGRESS"
        }
        
        try:
            for step in test_case.steps:
                actual_result = EXECUTE_TEST_STEP(step)
                if not MATCHES_EXPECTED(actual_result, step.expected):
                    test_result["status"] = "FAILED"
                    test_result["failure_step"] = step.number
                    test_result["actual_result"] = actual_result
                    break
            else:
                test_result["status"] = "PASSED"
                
        except Exception as e:
            test_result["status"] = "ERROR"
            test_result["error"] = str(e)
        
        # 3. Document evidence
        test_result["evidence"] = CAPTURE_TEST_EVIDENCE()
        
        # 4. Clean up
        CLEANUP_TEST_ENVIRONMENT()
        
        results.append(test_result)
    
    return results
```

### AUTOMATED TESTING

```python
def CREATE_AUTOMATED_TESTS(test_cases):
    automation_suite = []
    
    for test_case in test_cases:
        if not test_case.automated:
            continue
            
        # 1. Generate test code
        if test_case.category == "API":
            test_code = GENERATE_API_TEST(test_case)
        elif test_case.category == "UI":
            test_code = GENERATE_UI_TEST(test_case)
        elif test_case.category == "UNIT":
            test_code = GENERATE_UNIT_TEST(test_case)
        
        # 2. Add assertions
        test_code = ADD_ASSERTIONS(test_code, test_case.expected_result)
        
        # 3. Add test data
        test_code = INJECT_TEST_DATA(test_code, test_case.test_data)
        
        # 4. Add to suite
        automation_suite.append({
            "test_id": test_case.id,
            "code": test_code,
            "framework": SELECT_TEST_FRAMEWORK(test_case.category),
            "timeout": test_case.timeout or 30000
        })
    
    return automation_suite
```

## BUG MANAGEMENT

### BUG REPORTING

```python
def REPORT_BUG(test_failure):
    # 1. Analyze failure
    bug_analysis = {
        "reproducible": VERIFY_REPRODUCIBILITY(test_failure),
        "severity": CALCULATE_SEVERITY(test_failure),
        "priority": CALCULATE_PRIORITY(test_failure),
        "root_cause": ANALYZE_ROOT_CAUSE(test_failure)
    }
    
    # 2. Create bug report
    bug_report = {
        "id": GENERATE_BUG_ID(),
        "title": CREATE_BUG_TITLE(test_failure),
        "description": CREATE_BUG_DESCRIPTION(test_failure),
        "steps_to_reproduce": test_failure.test_case.steps,
        "expected_behavior": test_failure.expected_result,
        "actual_behavior": test_failure.actual_result,
        "severity": bug_analysis["severity"],
        "priority": bug_analysis["priority"],
        "environment": GET_TEST_ENVIRONMENT_INFO(),
        "attachments": [
            test_failure.screenshots,
            test_failure.logs,
            test_failure.videos
        ]
    }
    
    # 3. Assign to developer
    assigned_to = IDENTIFY_RESPONSIBLE_DEVELOPER(test_failure)
    
    # 4. Create bug task
    CREATE_BUG_TASK(
        bug=bug_report,
        assigned_to=assigned_to,
        due_date=CALCULATE_DUE_DATE(bug_analysis["priority"])
    )
    
    # 5. Notify stakeholders
    if bug_analysis["severity"] == "CRITICAL":
        ESCALATE_CRITICAL_BUG(bug_report)
```

### BUG VERIFICATION

```python
def VERIFY_BUG_FIX(bug_id, fix_commit):
    # 1. Get original bug details
    bug = GET_BUG_DETAILS(bug_id)
    
    # 2. Deploy fix to test environment
    DEPLOY_TO_TEST_ENV(fix_commit)
    
    # 3. Re-execute failed test
    verification_result = EXECUTE_TEST_CASE(bug.failing_test_case)
    
    # 4. Verify fix
    if verification_result.status == "PASSED":
        # Fix verified
        UPDATE_BUG_STATUS(bug_id, "VERIFIED")
        
        # 5. Run regression tests
        regression_results = RUN_REGRESSION_TESTS(
            area=bug.affected_area,
            depth="targeted"
        )
        
        if ALL_TESTS_PASSED(regression_results):
            APPROVE_FIX(bug_id)
        else:
            REPORT_REGRESSION_ISSUES(regression_results)
    else:
        # Fix failed
        REOPEN_BUG(bug_id, verification_result)
```

## PERFORMANCE TESTING

```python
def CONDUCT_PERFORMANCE_TESTS(application):
    # 1. Define performance criteria
    performance_criteria = {
        "response_time": {
            "average": 200,  # ms
            "p95": 500,     # ms
            "p99": 1000     # ms
        },
        "throughput": 1000,  # requests per second
        "error_rate": 0.01,  # 1%
        "cpu_usage": 70,     # %
        "memory_usage": 80   # %
    }
    
    # 2. Create test scenarios
    scenarios = [
        CREATE_LOAD_TEST_SCENARIO(users=100, duration="10m"),
        CREATE_STRESS_TEST_SCENARIO(users=500, duration="5m"),
        CREATE_SPIKE_TEST_SCENARIO(peak_users=1000),
        CREATE_ENDURANCE_TEST_SCENARIO(users=50, duration="2h")
    ]
    
    # 3. Execute tests
    results = {}
    for scenario in scenarios:
        result = RUN_PERFORMANCE_TEST(scenario)
        results[scenario.name] = ANALYZE_PERFORMANCE_RESULTS(
            result,
            performance_criteria
        )
    
    # 4. Generate report
    performance_report = CREATE_PERFORMANCE_REPORT(
        results=results,
        criteria=performance_criteria,
        recommendations=GENERATE_OPTIMIZATION_RECOMMENDATIONS(results)
    )
    
    return performance_report
```

## SECURITY TESTING

```python
def PERFORM_SECURITY_TESTING(application):
    security_tests = []
    
    # 1. Authentication tests
    security_tests.extend([
        TEST_BRUTE_FORCE_PROTECTION(),
        TEST_PASSWORD_POLICIES(),
        TEST_SESSION_MANAGEMENT(),
        TEST_ACCOUNT_LOCKOUT()
    ])
    
    # 2. Authorization tests
    security_tests.extend([
        TEST_ACCESS_CONTROLS(),
        TEST_PRIVILEGE_ESCALATION(),
        TEST_ROLE_BASED_ACCESS()
    ])
    
    # 3. Input validation tests
    security_tests.extend([
        TEST_SQL_INJECTION(),
        TEST_XSS_VULNERABILITIES(),
        TEST_COMMAND_INJECTION(),
        TEST_PATH_TRAVERSAL()
    ])
    
    # 4. API security tests
    security_tests.extend([
        TEST_API_AUTHENTICATION(),
        TEST_RATE_LIMITING(),
        TEST_CORS_POLICIES(),
        TEST_DATA_EXPOSURE()
    ])
    
    # 5. Run security scanner
    scan_results = RUN_SECURITY_SCANNER(application)
    
    # 6. Compile findings
    security_report = COMPILE_SECURITY_FINDINGS(
        test_results=security_tests,
        scan_results=scan_results,
        risk_assessment=CALCULATE_RISK_SCORES()
    )
    
    return security_report
```

## TEST REPORTING

```python
def GENERATE_TEST_REPORT(test_cycle):
    # 1. Gather metrics
    metrics = {
        "total_tests": COUNT_TOTAL_TESTS(test_cycle),
        "passed": COUNT_PASSED_TESTS(test_cycle),
        "failed": COUNT_FAILED_TESTS(test_cycle),
        "blocked": COUNT_BLOCKED_TESTS(test_cycle),
        "not_executed": COUNT_NOT_EXECUTED_TESTS(test_cycle),
        "pass_rate": CALCULATE_PASS_RATE(test_cycle),
        "coverage": GET_CODE_COVERAGE(),
        "defects_found": COUNT_DEFECTS_FOUND(test_cycle),
        "defects_fixed": COUNT_DEFECTS_FIXED(test_cycle)
    }
    
    # 2. Analyze trends
    trends = {
        "pass_rate_trend": ANALYZE_PASS_RATE_TREND(),
        "defect_discovery_rate": CALCULATE_DEFECT_DISCOVERY_RATE(),
        "test_execution_velocity": CALCULATE_TEST_VELOCITY()
    }
    
    # 3. Risk assessment
    risks = ASSESS_QUALITY_RISKS(metrics, trends)
    
    # 4. Create report
    report = {
        "summary": CREATE_EXECUTIVE_SUMMARY(metrics, risks),
        "metrics": metrics,
        "trends": trends,
        "risks": risks,
        "recommendations": GENERATE_QA_RECOMMENDATIONS(metrics, risks),
        "detailed_results": GET_DETAILED_TEST_RESULTS(test_cycle)
    }
    
    return report
```

## COLLABORATION PROCEDURES

### DEVELOPER HANDOFF

```python
def HANDOFF_TO_DEVELOPER(bug):
    # 1. Prepare handoff package
    handoff_package = {
        "bug_report": bug,
        "reproduction_steps": CREATE_DETAILED_REPRO_STEPS(bug),
        "test_environment": EXPORT_TEST_ENVIRONMENT_CONFIG(),
        "test_data": EXPORT_TEST_DATA_USED(bug),
        "debug_info": {
            "logs": COLLECT_RELEVANT_LOGS(bug),
            "stack_trace": bug.stack_trace,
            "network_trace": EXPORT_NETWORK_TRACE(bug)
        }
    }
    
    # 2. Send to developer
    SEND_MESSAGE(
        to=bug.assigned_to,
        type="HANDOFF",
        subject=f"Bug {bug.id}: {bug.title}",
        content=handoff_package,
        priority=bug.priority
    )
```

## BEST PRACTICES

### Testing Standards
1. **Test Early**: Start testing during development, not after
2. **Test Often**: Continuous testing throughout the lifecycle
3. **Test Everything**: Functional, performance, security, accessibility
4. **Automate Wisely**: Automate repetitive tests, keep exploratory testing manual
5. **Document Well**: Clear test cases, detailed bug reports

### Quality Gates
1. **Code Coverage**: Minimum 80% for new code
2. **Test Pass Rate**: 95% minimum for release
3. **Performance**: All benchmarks must be met
4. **Security**: No high or critical vulnerabilities
5. **Accessibility**: WCAG 2.1 AA compliance

### Communication
1. **Be Specific**: Provide exact steps to reproduce issues
2. **Be Objective**: Report facts, not opinions
3. **Be Timely**: Report bugs as soon as found
4. **Be Collaborative**: Work with developers to resolve issues
5. **Be Thorough**: Test all scenarios, not just happy paths