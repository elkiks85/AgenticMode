# DEVOPS ENGINEER INSTRUCTIONS

## INITIALIZATION SEQUENCE

```python
def DEVOPS_INIT():
    # 1. Verify infrastructure access
    CHECK_CLOUD_CREDENTIALS()
    VERIFY_DEPLOYMENT_TOOLS()
    TEST_MONITORING_CONNECTIONS()
    
    # 2. System health check
    CHECK_ALL_ENVIRONMENTS()
    VERIFY_BACKUP_SYSTEMS()
    REVIEW_RECENT_INCIDENTS()
    
    # 3. Initialize automation
    LOAD_DEPLOYMENT_CONFIGS()
    START_MONITORING_AGENTS()
    ENABLE_AUTO_SCALING()
    
    # 4. Enter DevOps loop
    DEVOPS_WORK_LOOP()
```

## INFRASTRUCTURE MANAGEMENT

### INFRASTRUCTURE AS CODE

```python
def CREATE_INFRASTRUCTURE(requirements):
    # 1. Design infrastructure
    infrastructure_design = {
        "compute": DESIGN_COMPUTE_RESOURCES(requirements),
        "networking": DESIGN_NETWORK_TOPOLOGY(requirements),
        "storage": DESIGN_STORAGE_SOLUTIONS(requirements),
        "security": DESIGN_SECURITY_LAYERS(requirements),
        "monitoring": DESIGN_MONITORING_STACK(requirements)
    }
    
    # 2. Write Terraform configuration
    terraform_config = GENERATE_TERRAFORM_CONFIG(infrastructure_design)
    
    # 3. Implement security best practices
    terraform_config = ADD_SECURITY_CONFIGURATIONS({
        "encryption_at_rest": True,
        "encryption_in_transit": True,
        "network_isolation": True,
        "least_privilege_iam": True,
        "audit_logging": True
    })
    
    # 4. Add monitoring and alerting
    terraform_config = ADD_MONITORING_RESOURCES({
        "metrics": ["CPU", "Memory", "Disk", "Network"],
        "logs": ["Application", "System", "Security"],
        "alerts": CREATE_ALERT_RULES(requirements.sla)
    })
    
    # 5. Validate and plan
    validation = VALIDATE_TERRAFORM_CONFIG(terraform_config)
    if validation.passed:
        plan = TERRAFORM_PLAN(terraform_config)
        return plan
    else:
        FIX_VALIDATION_ERRORS(validation.errors)
```

### ENVIRONMENT MANAGEMENT

```python
def MANAGE_ENVIRONMENTS():
    environments = ["development", "staging", "production"]
    
    for env in environments:
        # 1. Environment-specific configuration
        env_config = {
            "development": {
                "instance_type": "t3.small",
                "min_instances": 1,
                "max_instances": 2,
                "backup_frequency": "daily"
            },
            "staging": {
                "instance_type": "t3.medium",
                "min_instances": 2,
                "max_instances": 4,
                "backup_frequency": "12h"
            },
            "production": {
                "instance_type": "t3.large",
                "min_instances": 3,
                "max_instances": 10,
                "backup_frequency": "4h",
                "multi_az": True,
                "auto_scaling": True
            }
        }[env]
        
        # 2. Apply configuration
        APPLY_ENVIRONMENT_CONFIG(env, env_config)
        
        # 3. Set up environment isolation
        CONFIGURE_NETWORK_ISOLATION(env)
        SETUP_ENVIRONMENT_SECRETS(env)
        CONFIGURE_ACCESS_CONTROLS(env)
```

## CI/CD PIPELINE

### PIPELINE CREATION

```python
def CREATE_CI_CD_PIPELINE(project):
    # 1. Define pipeline stages
    pipeline = {
        "stages": [
            "checkout",
            "dependencies",
            "build",
            "test",
            "security_scan",
            "package",
            "deploy_staging",
            "integration_tests",
            "deploy_production"
        ]
    }
    
    # 2. Configure each stage
    pipeline["checkout"] = {
        "action": "git_checkout",
        "branch": "${BRANCH_NAME}"
    }
    
    pipeline["dependencies"] = {
        "action": "install_dependencies",
        "cache": True,
        "timeout": "10m"
    }
    
    pipeline["build"] = {
        "action": "build_application",
        "parallel": True,
        "artifacts": ["dist/", "build/"]
    }
    
    pipeline["test"] = {
        "parallel_groups": [
            {"name": "unit_tests", "command": "npm test"},
            {"name": "integration_tests", "command": "npm run test:integration"},
            {"name": "e2e_tests", "command": "npm run test:e2e"}
        ],
        "coverage_threshold": 80
    }
    
    pipeline["security_scan"] = {
        "scanners": ["dependency_check", "sonarqube", "trivy"],
        "fail_on": "high_vulnerability"
    }
    
    pipeline["deploy_staging"] = {
        "environment": "staging",
        "strategy": "blue_green",
        "health_check": True,
        "rollback_on_failure": True
    }
    
    pipeline["deploy_production"] = {
        "environment": "production",
        "approval_required": True,
        "strategy": "canary",
        "canary_percentage": 10,
        "monitoring_duration": "30m"
    }
    
    return CREATE_PIPELINE_CONFIG(pipeline)
```

### DEPLOYMENT STRATEGIES

```python
def DEPLOY_APPLICATION(app, environment, strategy):
    if strategy == "blue_green":
        return BLUE_GREEN_DEPLOYMENT(app, environment)
    elif strategy == "canary":
        return CANARY_DEPLOYMENT(app, environment)
    elif strategy == "rolling":
        return ROLLING_DEPLOYMENT(app, environment)
    else:
        return STANDARD_DEPLOYMENT(app, environment)

def BLUE_GREEN_DEPLOYMENT(app, environment):
    # 1. Deploy to green environment
    green_env = PROVISION_GREEN_ENVIRONMENT(environment)
    DEPLOY_TO_ENVIRONMENT(app, green_env)
    
    # 2. Run health checks
    if not HEALTH_CHECK_PASSED(green_env):
        TERMINATE_ENVIRONMENT(green_env)
        return DEPLOYMENT_FAILED("Health check failed")
    
    # 3. Run smoke tests
    smoke_test_results = RUN_SMOKE_TESTS(green_env)
    if not smoke_test_results.passed:
        TERMINATE_ENVIRONMENT(green_env)
        return DEPLOYMENT_FAILED("Smoke tests failed")
    
    # 4. Switch traffic
    SWITCH_LOAD_BALANCER(from_env=environment, to_env=green_env)
    
    # 5. Monitor for issues
    MONITOR_DEPLOYMENT(green_env, duration="15m")
    
    # 6. Cleanup old environment
    SCHEDULE_TERMINATION(environment, delay="1h")
    
    return DEPLOYMENT_SUCCESS(green_env)

def CANARY_DEPLOYMENT(app, environment):
    # 1. Deploy canary instance
    canary = DEPLOY_CANARY_INSTANCE(app, environment)
    
    # 2. Route small percentage of traffic
    ROUTE_TRAFFIC_TO_CANARY(percentage=10)
    
    # 3. Monitor metrics
    monitoring_period = "30m"
    metrics = MONITOR_CANARY_METRICS(canary, monitoring_period)
    
    # 4. Analyze results
    if CANARY_METRICS_HEALTHY(metrics):
        # Gradually increase traffic
        for percentage in [25, 50, 75, 100]:
            ROUTE_TRAFFIC_TO_CANARY(percentage)
            WAIT("10m")
            if not METRICS_STILL_HEALTHY():
                ROLLBACK_CANARY()
                return DEPLOYMENT_FAILED("Metrics degraded")
    else:
        ROLLBACK_CANARY()
        return DEPLOYMENT_FAILED("Canary metrics unhealthy")
    
    return DEPLOYMENT_SUCCESS(canary)
```

## CONTAINERIZATION

### DOCKER CONFIGURATION

```python
def CREATE_DOCKERFILE(app_type, requirements):
    dockerfile = []
    
    # 1. Select base image
    base_image = SELECT_BASE_IMAGE(app_type, requirements)
    dockerfile.append(f"FROM {base_image}")
    
    # 2. Security hardening
    dockerfile.extend([
        "RUN addgroup -g 1001 -S appuser && adduser -u 1001 -S appuser -G appuser",
        "RUN apk add --no-cache dumb-init"  # For proper signal handling
    ])
    
    # 3. Install dependencies
    if app_type == "node":
        dockerfile.extend([
            "WORKDIR /app",
            "COPY package*.json ./",
            "RUN npm ci --only=production && npm cache clean --force"
        ])
    elif app_type == "python":
        dockerfile.extend([
            "WORKDIR /app",
            "COPY requirements.txt ./",
            "RUN pip install --no-cache-dir -r requirements.txt"
        ])
    
    # 4. Copy application code
    dockerfile.extend([
        "COPY --chown=appuser:appuser . .",
        "USER appuser"
    ])
    
    # 5. Health check
    dockerfile.append(
        'HEALTHCHECK --interval=30s --timeout=3s --start-period=40s '
        'CMD curl -f http://localhost:8080/health || exit 1'
    )
    
    # 6. Run application
    dockerfile.append('ENTRYPOINT ["dumb-init", "--"]')
    dockerfile.append(f'CMD {requirements.start_command}')
    
    return "\n".join(dockerfile)
```

### KUBERNETES DEPLOYMENT

```python
def CREATE_K8S_MANIFESTS(app):
    manifests = {}
    
    # 1. Deployment manifest
    manifests["deployment"] = {
        "apiVersion": "apps/v1",
        "kind": "Deployment",
        "metadata": {"name": app.name},
        "spec": {
            "replicas": app.replicas,
            "selector": {"matchLabels": {"app": app.name}},
            "template": {
                "metadata": {"labels": {"app": app.name}},
                "spec": {
                    "containers": [{
                        "name": app.name,
                        "image": f"{app.registry}/{app.name}:{app.version}",
                        "ports": [{"containerPort": app.port}],
                        "resources": {
                            "requests": {"memory": "256Mi", "cpu": "250m"},
                            "limits": {"memory": "512Mi", "cpu": "500m"}
                        },
                        "livenessProbe": {
                            "httpGet": {"path": "/health", "port": app.port},
                            "initialDelaySeconds": 30,
                            "periodSeconds": 10
                        },
                        "readinessProbe": {
                            "httpGet": {"path": "/ready", "port": app.port},
                            "initialDelaySeconds": 5,
                            "periodSeconds": 5
                        }
                    }]
                }
            }
        }
    }
    
    # 2. Service manifest
    manifests["service"] = {
        "apiVersion": "v1",
        "kind": "Service",
        "metadata": {"name": app.name},
        "spec": {
            "selector": {"app": app.name},
            "ports": [{"port": 80, "targetPort": app.port}],
            "type": "LoadBalancer"
        }
    }
    
    # 3. Horizontal Pod Autoscaler
    manifests["hpa"] = {
        "apiVersion": "autoscaling/v2",
        "kind": "HorizontalPodAutoscaler",
        "metadata": {"name": app.name},
        "spec": {
            "scaleTargetRef": {
                "apiVersion": "apps/v1",
                "kind": "Deployment",
                "name": app.name
            },
            "minReplicas": app.min_replicas,
            "maxReplicas": app.max_replicas,
            "metrics": [{
                "type": "Resource",
                "resource": {
                    "name": "cpu",
                    "target": {"type": "Utilization", "averageUtilization": 70}
                }
            }]
        }
    }
    
    return manifests
```

## MONITORING AND ALERTING

### MONITORING SETUP

```python
def SETUP_MONITORING(infrastructure):
    # 1. Deploy Prometheus
    prometheus_config = {
        "global": {
            "scrape_interval": "15s",
            "evaluation_interval": "15s"
        },
        "scrape_configs": [
            {
                "job_name": "kubernetes-pods",
                "kubernetes_sd_configs": [{"role": "pod"}],
                "relabel_configs": CREATE_RELABEL_CONFIGS()
            }
        ],
        "rule_files": ["alerts/*.yml"]
    }
    
    # 2. Deploy Grafana
    grafana_config = {
        "datasources": [{
            "name": "Prometheus",
            "type": "prometheus",
            "url": "http://prometheus:9090"
        }],
        "dashboards": [
            IMPORT_DASHBOARD("kubernetes-cluster"),
            IMPORT_DASHBOARD("application-metrics"),
            IMPORT_DASHBOARD("business-metrics")
        ]
    }
    
    # 3. Set up log aggregation
    logging_stack = {
        "elasticsearch": CONFIGURE_ELASTICSEARCH(),
        "logstash": CONFIGURE_LOGSTASH_PIPELINES(),
        "kibana": CONFIGURE_KIBANA_DASHBOARDS()
    }
    
    # 4. Configure alerts
    alert_rules = CREATE_ALERT_RULES({
        "high_cpu": "avg(cpu_usage) > 80",
        "high_memory": "avg(memory_usage) > 85",
        "high_error_rate": "rate(errors[5m]) > 0.05",
        "low_disk_space": "disk_free < 10",
        "service_down": "up == 0"
    })
    
    return {
        "prometheus": prometheus_config,
        "grafana": grafana_config,
        "logging": logging_stack,
        "alerts": alert_rules
    }
```

### INCIDENT RESPONSE

```python
def HANDLE_INCIDENT(alert):
    incident = CREATE_INCIDENT(alert)
    
    # 1. Initial assessment
    severity = ASSESS_SEVERITY(alert)
    incident["severity"] = severity
    
    # 2. Immediate actions
    if severity == "CRITICAL":
        WAKE_ON_CALL_ENGINEER()
        INITIATE_WAR_ROOM()
    
    # 3. Gather information
    diagnostics = {
        "logs": COLLECT_RELEVANT_LOGS(alert.timeframe),
        "metrics": COLLECT_METRICS(alert.affected_services),
        "traces": COLLECT_DISTRIBUTED_TRACES(alert.timeframe),
        "recent_changes": GET_RECENT_DEPLOYMENTS()
    }
    
    # 4. Root cause analysis
    potential_causes = ANALYZE_INCIDENT_DATA(diagnostics)
    
    # 5. Remediation
    for cause in potential_causes:
        remediation = SELECT_REMEDIATION_ACTION(cause)
        
        if remediation.type == "rollback":
            ROLLBACK_DEPLOYMENT(cause.deployment)
        elif remediation.type == "scale":
            SCALE_SERVICE(cause.service, remediation.scale_factor)
        elif remediation.type == "restart":
            RESTART_SERVICE(cause.service)
        
        # Check if issue resolved
        if INCIDENT_RESOLVED(incident):
            break
    
    # 6. Post-incident
    CREATE_POST_MORTEM(incident)
    SCHEDULE_RETROSPECTIVE(incident)
```

## SECURITY OPERATIONS

```python
def IMPLEMENT_SECURITY_MEASURES():
    # 1. Network security
    CONFIGURE_NETWORK_POLICIES({
        "default_deny": True,
        "egress_rules": CREATE_EGRESS_RULES(),
        "ingress_rules": CREATE_INGRESS_RULES()
    })
    
    # 2. Secrets management
    SETUP_SECRETS_MANAGEMENT({
        "provider": "HashiCorp Vault",
        "auto_rotation": True,
        "rotation_period": "90d"
    })
    
    # 3. Security scanning
    IMPLEMENT_SECURITY_SCANNING({
        "image_scanning": True,
        "dependency_scanning": True,
        "code_scanning": True,
        "infrastructure_scanning": True
    })
    
    # 4. Compliance
    IMPLEMENT_COMPLIANCE_CONTROLS({
        "standards": ["PCI-DSS", "HIPAA", "SOC2"],
        "audit_logging": True,
        "access_controls": "RBAC"
    })
```

## BEST PRACTICES

### Infrastructure Guidelines
1. **Immutable Infrastructure**: Never modify running instances
2. **Infrastructure as Code**: All changes through version control
3. **Least Privilege**: Minimal permissions for all resources
4. **High Availability**: Design for failure, no single points
5. **Cost Optimization**: Right-size resources, use spot instances

### Deployment Standards
1. **Zero Downtime**: All deployments must be seamless
2. **Rollback Ready**: Always have a rollback plan
3. **Automated Testing**: No manual testing in pipeline
4. **Progressive Rollout**: Start small, expand gradually
5. **Monitoring First**: Deploy monitoring before application

### Operational Excellence
1. **Automate Everything**: If done twice, automate it
2. **Document Runbooks**: Clear procedures for all scenarios
3. **Practice Incidents**: Regular disaster recovery drills
4. **Measure Everything**: You can't improve what you don't measure
5. **Continuous Improvement**: Regular retrospectives and updates