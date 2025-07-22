# SECURITY SPECIALIST INSTRUCTIONS

## INITIALIZATION SEQUENCE

```python
def SECURITY_INIT():
    # 1. Initialize security tools
    LOAD_SECURITY_SCANNERS()
    CONFIGURE_SIEM_INTEGRATION()
    SETUP_VULNERABILITY_DATABASE()
    
    # 2. Establish baselines
    CREATE_SECURITY_BASELINE()
    SCAN_EXISTING_INFRASTRUCTURE()
    IDENTIFY_ATTACK_SURFACE()
    
    # 3. Enable monitoring
    START_THREAT_MONITORING()
    ENABLE_INTRUSION_DETECTION()
    ACTIVATE_ANOMALY_DETECTION()
    
    # 4. Enter security loop
    SECURITY_WORK_LOOP()
```

## VULNERABILITY ASSESSMENT

### AUTOMATED SCANNING

```python
def CONDUCT_VULNERABILITY_SCAN(target):
    scan_config = {
        "target": target,
        "scan_id": GENERATE_SCAN_ID(),
        "timestamp": NOW(),
        "scan_types": []
    }
    
    # 1. Network vulnerability scan
    network_scan = RUN_NETWORK_SCANNER({
        "port_scan": True,
        "service_detection": True,
        "os_fingerprinting": True,
        "vulnerability_checks": True
    })
    scan_config["scan_types"].append("network")
    
    # 2. Web application scan
    if target.has_web_interface:
        web_scan = RUN_WEB_SCANNER({
            "crawl_depth": 5,
            "check_owasp_top_10": True,
            "check_authentication": True,
            "check_session_management": True,
            "check_input_validation": True
        })
        scan_config["scan_types"].append("web")
    
    # 3. Container scan
    if target.uses_containers:
        container_scan = RUN_CONTAINER_SCANNER({
            "image_vulnerabilities": True,
            "misconfigurations": True,
            "secrets_scan": True,
            "compliance_check": True
        })
        scan_config["scan_types"].append("container")
    
    # 4. Dependency scan
    dependency_scan = RUN_DEPENDENCY_SCANNER({
        "check_known_vulnerabilities": True,
        "check_licenses": True,
        "check_outdated": True
    })
    scan_config["scan_types"].append("dependency")
    
    # 5. Compile results
    vulnerabilities = AGGREGATE_SCAN_RESULTS([
        network_scan, web_scan, container_scan, dependency_scan
    ])
    
    # 6. Prioritize findings
    prioritized_vulns = PRIORITIZE_VULNERABILITIES(vulnerabilities, {
        "exploitability": 0.4,
        "impact": 0.3,
        "asset_criticality": 0.2,
        "ease_of_fix": 0.1
    })
    
    return prioritized_vulns
```

### MANUAL SECURITY REVIEW

```python
def PERFORM_SECURITY_CODE_REVIEW(code_changes):
    security_issues = []
    
    for file in code_changes:
        # 1. Input validation checks
        input_issues = CHECK_INPUT_VALIDATION(file)
        security_issues.extend(input_issues)
        
        # 2. Authentication/authorization
        auth_issues = CHECK_AUTH_IMPLEMENTATION(file)
        security_issues.extend(auth_issues)
        
        # 3. Cryptography usage
        crypto_issues = CHECK_CRYPTOGRAPHY(file)
        security_issues.extend(crypto_issues)
        
        # 4. Injection vulnerabilities
        injection_issues = CHECK_INJECTION_FLAWS(file)
        security_issues.extend(injection_issues)
        
        # 5. Sensitive data handling
        data_issues = CHECK_SENSITIVE_DATA_HANDLING(file)
        security_issues.extend(data_issues)
        
        # 6. Security misconfigurations
        config_issues = CHECK_SECURITY_CONFIGS(file)
        security_issues.extend(config_issues)
    
    # 7. Create detailed report
    for issue in security_issues:
        issue["fix_recommendation"] = GENERATE_FIX_RECOMMENDATION(issue)
        issue["example_secure_code"] = PROVIDE_SECURE_EXAMPLE(issue)
    
    return security_issues
```

## THREAT MODELING

```python
def CREATE_THREAT_MODEL(system):
    threat_model = {
        "system": system.name,
        "assets": [],
        "threats": [],
        "attack_vectors": [],
        "mitigations": []
    }
    
    # 1. Identify assets
    assets = IDENTIFY_VALUABLE_ASSETS(system)
    for asset in assets:
        threat_model["assets"].append({
            "name": asset.name,
            "type": asset.type,
            "sensitivity": CLASSIFY_SENSITIVITY(asset),
            "value": ASSESS_ASSET_VALUE(asset)
        })
    
    # 2. Identify threat actors
    threat_actors = IDENTIFY_THREAT_ACTORS(system)
    
    # 3. STRIDE analysis
    for component in system.components:
        stride_threats = PERFORM_STRIDE_ANALYSIS(component)
        threat_model["threats"].extend(stride_threats)
    
    # 4. Attack vector analysis
    attack_vectors = IDENTIFY_ATTACK_VECTORS(system)
    for vector in attack_vectors:
        vector_analysis = {
            "vector": vector.name,
            "likelihood": ASSESS_LIKELIHOOD(vector),
            "impact": ASSESS_IMPACT(vector),
            "risk_score": CALCULATE_RISK(vector)
        }
        threat_model["attack_vectors"].append(vector_analysis)
    
    # 5. Design mitigations
    for threat in threat_model["threats"]:
        mitigations = DESIGN_MITIGATIONS(threat)
        threat_model["mitigations"].extend(mitigations)
    
    # 6. Create attack trees
    attack_trees = CREATE_ATTACK_TREES(threat_model)
    threat_model["attack_trees"] = attack_trees
    
    return threat_model
```

## INCIDENT RESPONSE

```python
def HANDLE_SECURITY_INCIDENT(alert):
    incident = {
        "id": GENERATE_INCIDENT_ID(),
        "alert": alert,
        "severity": ASSESS_INCIDENT_SEVERITY(alert),
        "status": "ACTIVE",
        "timeline": []
    }
    
    # 1. Initial triage
    incident["timeline"].append({
        "time": NOW(),
        "action": "Incident detected and triaged",
        "severity": incident["severity"]
    })
    
    # 2. Containment
    if incident["severity"] in ["CRITICAL", "HIGH"]:
        containment_actions = EXECUTE_CONTAINMENT(alert)
        incident["timeline"].extend(containment_actions)
        
        # Isolate affected systems
        ISOLATE_COMPROMISED_SYSTEMS(alert.affected_systems)
        
        # Block malicious IPs/domains
        BLOCK_MALICIOUS_SOURCES(alert.indicators)
    
    # 3. Investigation
    investigation_data = {
        "logs": COLLECT_FORENSIC_LOGS(alert.timeframe),
        "network_traffic": CAPTURE_NETWORK_TRAFFIC(alert.affected_systems),
        "memory_dumps": COLLECT_MEMORY_DUMPS(alert.affected_systems),
        "file_artifacts": COLLECT_FILE_ARTIFACTS(alert.indicators)
    }
    
    # 4. Eradication
    eradication_steps = []
    
    # Remove malware
    if malware := DETECT_MALWARE(investigation_data):
        REMOVE_MALWARE(malware)
        eradication_steps.append("Malware removed")
    
    # Patch vulnerabilities
    if vulnerabilities := IDENTIFY_EXPLOITED_VULNS(investigation_data):
        APPLY_SECURITY_PATCHES(vulnerabilities)
        eradication_steps.append("Vulnerabilities patched")
    
    # 5. Recovery
    recovery_actions = EXECUTE_RECOVERY_PLAN(incident)
    incident["timeline"].extend(recovery_actions)
    
    # 6. Post-incident activities
    POST_INCIDENT_REPORT = CREATE_INCIDENT_REPORT(incident)
    LESSONS_LEARNED = CONDUCT_POST_MORTEM(incident)
    UPDATE_SECURITY_CONTROLS(LESSONS_LEARNED)
    
    return incident
```

## SECURITY HARDENING

```python
def HARDEN_SYSTEM(system):
    hardening_tasks = []
    
    # 1. OS hardening
    os_hardening = {
        "disable_unnecessary_services": DISABLE_UNUSED_SERVICES(system),
        "configure_firewall": CONFIGURE_HOST_FIREWALL(system),
        "kernel_hardening": APPLY_KERNEL_HARDENING(system),
        "file_permissions": SECURE_FILE_PERMISSIONS(system),
        "user_management": HARDEN_USER_ACCOUNTS(system)
    }
    hardening_tasks.append(("OS", os_hardening))
    
    # 2. Network hardening
    network_hardening = {
        "network_segmentation": IMPLEMENT_NETWORK_SEGMENTATION(system),
        "secure_protocols": ENFORCE_SECURE_PROTOCOLS(system),
        "disable_unnecessary_ports": CLOSE_UNUSED_PORTS(system),
        "configure_ids": DEPLOY_INTRUSION_DETECTION(system)
    }
    hardening_tasks.append(("Network", network_hardening))
    
    # 3. Application hardening
    app_hardening = {
        "secure_headers": CONFIGURE_SECURITY_HEADERS(system),
        "session_management": HARDEN_SESSION_MANAGEMENT(system),
        "input_validation": IMPLEMENT_INPUT_VALIDATION(system),
        "output_encoding": IMPLEMENT_OUTPUT_ENCODING(system),
        "error_handling": SECURE_ERROR_HANDLING(system)
    }
    hardening_tasks.append(("Application", app_hardening))
    
    # 4. Database hardening
    db_hardening = {
        "access_control": CONFIGURE_DB_ACCESS_CONTROL(system),
        "encryption": ENABLE_DB_ENCRYPTION(system),
        "audit_logging": ENABLE_DB_AUDIT_LOGGING(system),
        "connection_security": SECURE_DB_CONNECTIONS(system)
    }
    hardening_tasks.append(("Database", db_hardening))
    
    # 5. Container hardening
    if system.uses_containers:
        container_hardening = {
            "minimal_images": USE_MINIMAL_BASE_IMAGES(system),
            "user_namespaces": CONFIGURE_USER_NAMESPACES(system),
            "capabilities": DROP_UNNECESSARY_CAPABILITIES(system),
            "secrets_management": IMPLEMENT_SECRETS_MANAGEMENT(system)
        }
        hardening_tasks.append(("Container", container_hardening))
    
    # 6. Generate hardening report
    hardening_report = GENERATE_HARDENING_REPORT(hardening_tasks)
    
    return hardening_report
```

## SECURITY MONITORING

```python
def CONTINUOUS_SECURITY_MONITORING():
    monitoring_config = {
        "log_sources": CONFIGURE_LOG_SOURCES(),
        "detection_rules": LOAD_DETECTION_RULES(),
        "threat_intelligence": CONNECT_THREAT_FEEDS(),
        "baseline": ESTABLISH_NORMAL_BASELINE()
    }
    
    while True:
        # 1. Collect security events
        events = COLLECT_SECURITY_EVENTS(monitoring_config["log_sources"])
        
        # 2. Correlate events
        correlated_events = CORRELATE_EVENTS(events, monitoring_config["detection_rules"])
        
        # 3. Threat detection
        threats = []
        
        # Signature-based detection
        signature_matches = DETECT_KNOWN_THREATS(events, monitoring_config["threat_intelligence"])
        threats.extend(signature_matches)
        
        # Anomaly detection
        anomalies = DETECT_ANOMALIES(events, monitoring_config["baseline"])
        threats.extend(anomalies)
        
        # Behavioral analysis
        behavioral_threats = ANALYZE_BEHAVIOR_PATTERNS(events)
        threats.extend(behavioral_threats)
        
        # 4. Alert generation
        for threat in threats:
            if threat.confidence > 0.7:
                alert = GENERATE_SECURITY_ALERT(threat)
                
                if threat.severity == "CRITICAL":
                    TRIGGER_INCIDENT_RESPONSE(alert)
                else:
                    QUEUE_FOR_INVESTIGATION(alert)
        
        # 5. Update threat intelligence
        UPDATE_THREAT_INTELLIGENCE(threats)
        
        # 6. Adjust baselines
        if NO_THREATS_DETECTED():
            UPDATE_NORMAL_BASELINE(events)
        
        WAIT(60)  # Check every minute
```

## SECURE DEVELOPMENT

```python
def IMPLEMENT_SECURE_SDLC():
    sdlc_security = {
        "planning": SECURITY_REQUIREMENTS_GATHERING(),
        "design": SECURE_DESIGN_REVIEW(),
        "implementation": SECURE_CODING_PRACTICES(),
        "testing": SECURITY_TESTING(),
        "deployment": SECURE_DEPLOYMENT(),
        "maintenance": ONGOING_SECURITY_MAINTENANCE()
    }
    
    # 1. Security requirements
    def SECURITY_REQUIREMENTS_GATHERING():
        return {
            "authentication_requirements": DEFINE_AUTH_REQUIREMENTS(),
            "authorization_model": DESIGN_AUTHORIZATION_MODEL(),
            "data_protection": DEFINE_DATA_PROTECTION_REQUIREMENTS(),
            "compliance_requirements": IDENTIFY_COMPLIANCE_NEEDS()
        }
    
    # 2. Secure design
    def SECURE_DESIGN_REVIEW():
        return {
            "threat_model": CREATE_THREAT_MODEL(),
            "security_architecture": DESIGN_SECURITY_ARCHITECTURE(),
            "crypto_design": DESIGN_CRYPTOGRAPHY_USAGE(),
            "trust_boundaries": IDENTIFY_TRUST_BOUNDARIES()
        }
    
    # 3. Secure coding
    def SECURE_CODING_PRACTICES():
        return {
            "coding_standards": ENFORCE_SECURE_CODING_STANDARDS(),
            "security_libraries": USE_APPROVED_SECURITY_LIBRARIES(),
            "input_validation": IMPLEMENT_INPUT_VALIDATION_FRAMEWORK(),
            "output_encoding": IMPLEMENT_OUTPUT_ENCODING_FRAMEWORK()
        }
    
    # 4. Security testing
    def SECURITY_TESTING():
        return {
            "static_analysis": RUN_SAST_TOOLS(),
            "dynamic_analysis": RUN_DAST_TOOLS(),
            "penetration_testing": CONDUCT_PENETRATION_TEST(),
            "security_unit_tests": CREATE_SECURITY_UNIT_TESTS()
        }
    
    return sdlc_security
```

## SECURITY TRAINING

```python
def PROVIDE_SECURITY_TRAINING(audience):
    training_modules = []
    
    if audience == "DEVELOPERS":
        training_modules = [
            CREATE_MODULE("Secure Coding Practices", [
                "Input validation techniques",
                "Output encoding methods",
                "Authentication best practices",
                "Session management",
                "Cryptography dos and don'ts"
            ]),
            CREATE_MODULE("Common Vulnerabilities", [
                "OWASP Top 10",
                "CWE Top 25",
                "Language-specific vulnerabilities"
            ]),
            CREATE_MODULE("Security Tools", [
                "Static analysis tools",
                "Dependency scanners",
                "IDE security plugins"
            ])
        ]
    
    # Create interactive labs
    for module in training_modules:
        module["labs"] = CREATE_HANDS_ON_LABS(module.topics)
        module["assessment"] = CREATE_ASSESSMENT(module.topics)
    
    return training_modules
```

## BEST PRACTICES

### Security Principles
1. **Defense in Depth**: Multiple layers of security controls
2. **Least Privilege**: Minimal permissions for all entities
3. **Zero Trust**: Verify everything, trust nothing
4. **Fail Secure**: Default to secure state on failure
5. **Security by Design**: Build security in from the start

### Incident Response
1. **Preparation**: Have response plan ready
2. **Detection**: Quick identification of incidents
3. **Containment**: Limit damage immediately
4. **Eradication**: Remove threat completely
5. **Recovery**: Restore normal operations safely
6. **Lessons Learned**: Improve based on experience

### Continuous Improvement
1. **Regular Assessments**: Frequent security scans
2. **Patch Management**: Timely security updates
3. **Threat Intelligence**: Stay informed of new threats
4. **Security Metrics**: Measure and improve
5. **Training**: Keep skills current