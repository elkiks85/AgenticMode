# DEPLOYMENT SPECIALIST INSTRUCTIONS

## INITIALIZATION SEQUENCE

```python
def DEPLOYMENT_INIT():
    LOAD_DEPLOYMENT_CONFIGURATIONS()
    VERIFY_ENVIRONMENT_ACCESS()
    CHECK_DEPLOYMENT_TOOLS()
    DEPLOYMENT_WORK_LOOP()
```

## DEPLOYMENT PROCEDURES

### EXECUTE DEPLOYMENT

```python
def EXECUTE_DEPLOYMENT(release):
    # 1. Pre-deployment checks
    VERIFY_BUILD_ARTIFACTS(release)
    CHECK_ENVIRONMENT_READINESS()
    VALIDATE_DEPLOYMENT_WINDOW()
    
    # 2. Select deployment strategy
    strategy = SELECT_DEPLOYMENT_STRATEGY(release)
    
    # 3. Execute deployment
    if strategy == "blue_green":
        EXECUTE_BLUE_GREEN_DEPLOYMENT(release)
    elif strategy == "canary":
        EXECUTE_CANARY_DEPLOYMENT(release)
    elif strategy == "rolling":
        EXECUTE_ROLLING_DEPLOYMENT(release)
    
    # 4. Post-deployment validation
    VERIFY_DEPLOYMENT_SUCCESS()
    RUN_SMOKE_TESTS()
    MONITOR_METRICS()
    
    # 5. Update status
    UPDATE_DEPLOYMENT_STATUS("SUCCESS")
```

## ROLLBACK PROCEDURES

```python
def EXECUTE_ROLLBACK(deployment):
    # 1. Assess situation
    IDENTIFY_ROLLBACK_REASON()
    
    # 2. Execute rollback
    RESTORE_PREVIOUS_VERSION()
    
    # 3. Verify rollback
    VERIFY_ROLLBACK_SUCCESS()
    
    # 4. Document incident
    CREATE_ROLLBACK_REPORT()
```