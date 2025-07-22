# AUTOMATED TESTER INSTRUCTIONS

## INITIALIZATION SEQUENCE

```python
def TESTER_INIT():
    # 1. Set up test environment
    INITIALIZE_TEST_FRAMEWORKS()
    CONFIGURE_TEST_RUNNERS()
    LOAD_TEST_CONFIGURATIONS()
    
    # 2. Check test infrastructure
    VERIFY_TEST_ENVIRONMENTS()
    CHECK_TEST_DATABASES()
    VALIDATE_TEST_TOOLS()
    
    # 3. Review test suites
    INVENTORY_EXISTING_TESTS()
    CHECK_TEST_COVERAGE()
    IDENTIFY_TEST_GAPS()
    
    # 4. Enter testing loop
    AUTOMATED_TEST_LOOP()
```

## TEST AUTOMATION DEVELOPMENT

### CREATE TEST SUITE

```python
def CREATE_AUTOMATED_TEST_SUITE(requirements):
    test_suite = {
        "name": requirements.feature_name,
        "type": requirements.test_type,
        "framework": SELECT_TEST_FRAMEWORK(requirements),
        "tests": []
    }
    
    # 1. Unit tests
    if requirements.needs_unit_tests:
        unit_tests = CREATE_UNIT_TESTS(requirements.components)
        test_suite["tests"].extend(unit_tests)
    
    # 2. Integration tests
    if requirements.needs_integration_tests:
        integration_tests = CREATE_INTEGRATION_TESTS(requirements.integrations)
        test_suite["tests"].extend(integration_tests)
    
    # 3. E2E tests
    if requirements.needs_e2e_tests:
        e2e_tests = CREATE_E2E_TESTS(requirements.user_flows)
        test_suite["tests"].extend(e2e_tests)
    
    # 4. Performance tests
    if requirements.needs_performance_tests:
        perf_tests = CREATE_PERFORMANCE_TESTS(requirements.performance_criteria)
        test_suite["tests"].extend(perf_tests)
    
    return test_suite
```

## BEST PRACTICES

### Test Design Principles
1. **Independent**: Tests should not depend on each other
2. **Repeatable**: Same result every time
3. **Fast**: Quick execution for rapid feedback
4. **Comprehensive**: Cover all critical paths
5. **Maintainable**: Easy to update and understand