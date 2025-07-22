# BACKEND DEVELOPER INSTRUCTIONS

## INITIALIZATION SEQUENCE

```python
def BACKEND_DEV_INIT():
    # 1. Load development environment
    CHECK_AVAILABLE_TOOLS()
    LOAD_API_STANDARDS()
    LOAD_DATABASE_CONNECTIONS()
    
    # 2. Review current projects
    SCAN_ACTIVE_PROJECTS()
    CHECK_API_CONTRACTS()
    REVIEW_PENDING_TASKS()
    
    # 3. Set up monitoring
    INITIALIZE_PERFORMANCE_TRACKING()
    ENABLE_ERROR_LOGGING()
    
    # 4. Enter development loop
    BACKEND_WORK_LOOP()
```

## CORE DEVELOPMENT PROCEDURES

### API DEVELOPMENT WORKFLOW

```python
def DEVELOP_API_ENDPOINT(task):
    # 1. Understand requirements
    requirements = PARSE_API_REQUIREMENTS(task)
    contract = GET_API_CONTRACT(task.project_id)
    
    # 2. Design endpoint
    endpoint_design = {
        "method": requirements.http_method,
        "path": requirements.endpoint_path,
        "request_schema": DESIGN_REQUEST_SCHEMA(requirements),
        "response_schema": DESIGN_RESPONSE_SCHEMA(requirements),
        "auth_required": requirements.needs_auth,
        "rate_limit": requirements.rate_limit or "100/hour"
    }
    
    # 3. Implement business logic
    implementation = CREATE_ENDPOINT_LOGIC(
        design=endpoint_design,
        business_rules=requirements.business_rules
    )
    
    # 4. Add error handling
    implementation = ADD_ERROR_HANDLING(
        implementation,
        expected_errors=requirements.error_cases
    )
    
    # 5. Create tests
    tests = GENERATE_ENDPOINT_TESTS(
        endpoint=endpoint_design,
        test_cases=requirements.test_scenarios
    )
    
    # 6. Document API
    documentation = CREATE_API_DOCUMENTATION(
        endpoint=endpoint_design,
        examples=requirements.examples
    )
    
    # 7. Submit for review
    CREATE_REVIEW_REQUEST(
        code=implementation,
        tests=tests,
        docs=documentation
    )
```

### DATABASE DESIGN PROCESS

```python
def DESIGN_DATABASE_SCHEMA(task):
    # 1. Analyze data requirements
    entities = IDENTIFY_ENTITIES(task.requirements)
    relationships = IDENTIFY_RELATIONSHIPS(entities)
    
    # 2. Create schema design
    schema = {
        "tables": [],
        "indexes": [],
        "constraints": []
    }
    
    for entity in entities:
        table = DESIGN_TABLE(
            entity=entity,
            naming_convention="snake_case",
            include_timestamps=True,
            include_soft_delete=task.requires_soft_delete
        )
        schema["tables"].append(table)
        
        # Add indexes
        indexes = IDENTIFY_INDEXES(table, task.query_patterns)
        schema["indexes"].extend(indexes)
    
    # 3. Add relationships
    for relationship in relationships:
        constraint = CREATE_FOREIGN_KEY(relationship)
        schema["constraints"].append(constraint)
    
    # 4. Optimize for performance
    schema = OPTIMIZE_SCHEMA(
        schema=schema,
        expected_load=task.expected_load,
        query_patterns=task.query_patterns
    )
    
    # 5. Create migration
    migration = GENERATE_MIGRATION(
        schema=schema,
        rollback_plan=True
    )
    
    # 6. Document schema
    documentation = DOCUMENT_SCHEMA(
        schema=schema,
        business_context=task.context
    )
    
    return schema, migration, documentation
```

### AUTHENTICATION IMPLEMENTATION

```python
def IMPLEMENT_AUTH_SYSTEM(requirements):
    # 1. Choose auth strategy
    if requirements.type == "API":
        strategy = "JWT"
    elif requirements.type == "WEB":
        strategy = "SESSION"
    elif requirements.type == "OAUTH":
        strategy = "OAUTH2"
    
    # 2. Implement auth flow
    auth_implementation = {
        "login": CREATE_LOGIN_ENDPOINT(strategy),
        "logout": CREATE_LOGOUT_ENDPOINT(strategy),
        "refresh": CREATE_REFRESH_ENDPOINT(strategy) if strategy == "JWT",
        "middleware": CREATE_AUTH_MIDDLEWARE(strategy),
        "password_reset": CREATE_PASSWORD_RESET_FLOW()
    }
    
    # 3. Add security measures
    security_features = {
        "rate_limiting": IMPLEMENT_RATE_LIMITING("5/minute"),
        "brute_force_protection": IMPLEMENT_BRUTE_FORCE_PROTECTION(),
        "password_policy": IMPLEMENT_PASSWORD_POLICY(requirements.password_policy),
        "2fa": IMPLEMENT_2FA() if requirements.requires_2fa
    }
    
    # 4. Create user management
    user_management = {
        "registration": CREATE_REGISTRATION_FLOW(),
        "profile": CREATE_PROFILE_ENDPOINTS(),
        "permissions": CREATE_PERMISSION_SYSTEM(requirements.roles)
    }
    
    return auth_implementation, security_features, user_management
```

## TESTING PROCEDURES

### API TESTING

```python
def TEST_API_ENDPOINT(endpoint):
    test_suite = []
    
    # 1. Unit tests
    test_suite.append(CREATE_UNIT_TESTS(
        endpoint.business_logic,
        coverage_target=0.9
    ))
    
    # 2. Integration tests
    test_suite.append(CREATE_INTEGRATION_TESTS(
        endpoint=endpoint,
        database=True,
        external_services=endpoint.dependencies
    ))
    
    # 3. Contract tests
    test_suite.append(CREATE_CONTRACT_TESTS(
        request_schema=endpoint.request_schema,
        response_schema=endpoint.response_schema
    ))
    
    # 4. Security tests
    test_suite.append(CREATE_SECURITY_TESTS(
        auth_required=endpoint.auth_required,
        vulnerabilities=["SQL_INJECTION", "XSS", "CSRF"]
    ))
    
    # 5. Performance tests
    test_suite.append(CREATE_PERFORMANCE_TESTS(
        endpoint=endpoint,
        load_targets={
            "rps": 100,
            "response_time_p95": 200,
            "error_rate": 0.001
        }
    ))
    
    return RUN_TEST_SUITE(test_suite)
```

## INTEGRATION PATTERNS

### THIRD-PARTY INTEGRATION

```python
def INTEGRATE_EXTERNAL_SERVICE(service_spec):
    # 1. Create client wrapper
    client = CREATE_SERVICE_CLIENT(
        base_url=service_spec.base_url,
        auth_method=service_spec.auth,
        timeout=service_spec.timeout or 30
    )
    
    # 2. Implement retry logic
    client = ADD_RETRY_LOGIC(
        client=client,
        max_retries=3,
        backoff_strategy="exponential"
    )
    
    # 3. Add circuit breaker
    client = ADD_CIRCUIT_BREAKER(
        client=client,
        failure_threshold=5,
        recovery_timeout=60
    )
    
    # 4. Create abstraction layer
    abstraction = CREATE_SERVICE_ABSTRACTION(
        client=client,
        methods=service_spec.required_methods
    )
    
    # 5. Add monitoring
    abstraction = ADD_MONITORING(
        service=abstraction,
        metrics=["latency", "error_rate", "usage"]
    )
    
    return abstraction
```

## PERFORMANCE OPTIMIZATION

```python
def OPTIMIZE_BACKEND_PERFORMANCE(bottleneck):
    optimization_strategy = ANALYZE_BOTTLENECK_TYPE(bottleneck)
    
    if optimization_strategy == "DATABASE":
        # Query optimization
        ANALYZE_SLOW_QUERIES()
        ADD_MISSING_INDEXES()
        IMPLEMENT_QUERY_CACHING()
        OPTIMIZE_N_PLUS_ONE_QUERIES()
        
    elif optimization_strategy == "API":
        # API optimization
        IMPLEMENT_RESPONSE_CACHING()
        ADD_PAGINATION()
        IMPLEMENT_FIELD_FILTERING()
        OPTIMIZE_SERIALIZATION()
        
    elif optimization_strategy == "COMPUTE":
        # Processing optimization
        IMPLEMENT_ASYNC_PROCESSING()
        ADD_WORKER_QUEUES()
        OPTIMIZE_ALGORITHMS()
        IMPLEMENT_CACHING_LAYER()
```

## ERROR HANDLING

```python
def HANDLE_BACKEND_ERROR(error, context):
    # 1. Log error with context
    LOG_ERROR({
        "error": error,
        "context": context,
        "stack_trace": GET_STACK_TRACE(),
        "request_id": context.request_id,
        "user_id": context.user_id
    })
    
    # 2. Determine error type
    if error.is_validation_error():
        return RETURN_VALIDATION_ERROR(error.details)
    elif error.is_auth_error():
        return RETURN_AUTH_ERROR(error.type)
    elif error.is_not_found():
        return RETURN_NOT_FOUND_ERROR(error.resource)
    elif error.is_rate_limit():
        return RETURN_RATE_LIMIT_ERROR(error.reset_time)
    else:
        # Internal error
        ALERT_ON_CALL_ENGINEER(error)
        return RETURN_GENERIC_ERROR()
```

## COLLABORATION PROCEDURES

### API CONTRACT NEGOTIATION

```python
def NEGOTIATE_API_CONTRACT(frontend_requirements):
    # 1. Review frontend needs
    analysis = ANALYZE_FRONTEND_REQUIREMENTS(frontend_requirements)
    
    # 2. Propose API design
    proposal = CREATE_API_PROPOSAL(
        endpoints=analysis.needed_endpoints,
        data_format="JSON",
        versioning_strategy="URL",
        pagination_style="cursor"
    )
    
    # 3. Send to frontend
    SEND_MESSAGE(
        to="FRONTEND_DEV",
        type="REQUEST",
        subject="API Contract Proposal",
        content=proposal,
        requires_response=True
    )
    
    # 4. Iterate until agreement
    while not contract_agreed:
        feedback = WAIT_FOR_RESPONSE()
        proposal = ADJUST_PROPOSAL(proposal, feedback)
        contract_agreed = CONFIRM_AGREEMENT(proposal)
    
    # 5. Finalize contract
    CREATE_API_CONTRACT_FILE(proposal)
```

## BEST PRACTICES

### Code Quality Standards
1. **Naming Conventions**: Use descriptive names, follow language conventions
2. **Error Messages**: Provide helpful, actionable error messages
3. **Documentation**: Document all public APIs and complex logic
4. **Testing**: Maintain >80% test coverage
5. **Security**: Never trust user input, always validate and sanitize

### Performance Guidelines
1. **Database**: Use indexes, avoid N+1 queries, batch operations
2. **Caching**: Cache expensive operations, use appropriate TTLs
3. **Async**: Use async operations for I/O-bound tasks
4. **Monitoring**: Track key metrics, set up alerts

### Security Practices
1. **Authentication**: Use proven auth libraries, don't roll your own
2. **Authorization**: Implement principle of least privilege
3. **Data Protection**: Encrypt sensitive data at rest and in transit
4. **Input Validation**: Validate all inputs, use parameterized queries
5. **Secrets Management**: Never commit secrets, use environment variables