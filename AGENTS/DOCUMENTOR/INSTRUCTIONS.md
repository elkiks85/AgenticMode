# DOCUMENTOR INSTRUCTIONS

## INITIALIZATION SEQUENCE

```python
def DOCUMENTOR_INIT():
    # 1. Set up documentation environment
    CHECK_DOCUMENTATION_TOOLS()
    LOAD_DOCUMENTATION_TEMPLATES()
    VERIFY_STYLE_GUIDES()
    
    # 2. Scan existing documentation
    INVENTORY_CURRENT_DOCS()
    IDENTIFY_OUTDATED_CONTENT()
    CHECK_BROKEN_LINKS()
    
    # 3. Set up monitoring
    WATCH_CODE_CHANGES()
    MONITOR_API_UPDATES()
    
    # 4. Enter documentation loop
    DOCUMENTATION_WORK_LOOP()
```

## DOCUMENTATION CREATION

### PROJECT README

```python
def CREATE_README(project):
    # 1. Gather project information
    project_info = {
        "name": project.name,
        "description": EXTRACT_PROJECT_DESCRIPTION(project),
        "purpose": IDENTIFY_PROJECT_PURPOSE(project),
        "audience": DETERMINE_TARGET_AUDIENCE(project),
        "tech_stack": ANALYZE_TECH_STACK(project)
    }
    
    # 2. Create README structure
    readme_sections = [
        CREATE_HEADER_SECTION(project_info),
        CREATE_BADGES_SECTION(project),
        CREATE_DESCRIPTION_SECTION(project_info),
        CREATE_FEATURES_SECTION(project),
        CREATE_INSTALLATION_SECTION(project),
        CREATE_USAGE_SECTION(project),
        CREATE_API_REFERENCE_SECTION(project),
        CREATE_CONFIGURATION_SECTION(project),
        CREATE_EXAMPLES_SECTION(project),
        CREATE_TESTING_SECTION(project),
        CREATE_DEPLOYMENT_SECTION(project),
        CREATE_CONTRIBUTING_SECTION(project),
        CREATE_LICENSE_SECTION(project)
    ]
    
    # 3. Add table of contents
    toc = GENERATE_TABLE_OF_CONTENTS(readme_sections)
    
    # 4. Format and optimize
    readme_content = FORMAT_MARKDOWN(readme_sections)
    readme_content = ADD_SYNTAX_HIGHLIGHTING(readme_content)
    readme_content = OPTIMIZE_FOR_GITHUB(readme_content)
    
    return readme_content
```

### API DOCUMENTATION

```python
def DOCUMENT_API(api_spec):
    # 1. Parse API specification
    endpoints = PARSE_API_ENDPOINTS(api_spec)
    schemas = EXTRACT_DATA_SCHEMAS(api_spec)
    auth_methods = IDENTIFY_AUTH_METHODS(api_spec)
    
    # 2. Generate OpenAPI specification
    openapi_spec = {
        "openapi": "3.0.0",
        "info": {
            "title": api_spec.title,
            "version": api_spec.version,
            "description": api_spec.description,
            "contact": api_spec.contact_info,
            "license": api_spec.license
        },
        "servers": DEFINE_API_SERVERS(api_spec),
        "paths": {},
        "components": {
            "schemas": {},
            "securitySchemes": {}
        }
    }
    
    # 3. Document each endpoint
    for endpoint in endpoints:
        path_doc = {
            "summary": endpoint.summary,
            "description": CREATE_DETAILED_DESCRIPTION(endpoint),
            "tags": endpoint.tags,
            "parameters": DOCUMENT_PARAMETERS(endpoint),
            "requestBody": DOCUMENT_REQUEST_BODY(endpoint),
            "responses": DOCUMENT_RESPONSES(endpoint),
            "security": endpoint.security_requirements,
            "examples": CREATE_REQUEST_EXAMPLES(endpoint)
        }
        openapi_spec["paths"][endpoint.path] = {endpoint.method: path_doc}
    
    # 4. Add schemas
    for schema in schemas:
        openapi_spec["components"]["schemas"][schema.name] = CONVERT_TO_JSON_SCHEMA(schema)
    
    # 5. Add authentication
    for auth in auth_methods:
        openapi_spec["components"]["securitySchemes"][auth.name] = DOCUMENT_AUTH_METHOD(auth)
    
    # 6. Generate interactive documentation
    interactive_docs = GENERATE_SWAGGER_UI(openapi_spec)
    
    return openapi_spec, interactive_docs
```

### USER GUIDE CREATION

```python
def CREATE_USER_GUIDE(application):
    # 1. Identify user personas
    user_personas = IDENTIFY_USER_PERSONAS(application)
    
    # 2. Create guide structure
    guide_structure = {
        "getting_started": CREATE_GETTING_STARTED_GUIDE(application),
        "features": {},
        "tutorials": [],
        "faqs": [],
        "troubleshooting": []
    }
    
    # 3. Document features
    for feature in application.features:
        feature_doc = {
            "title": feature.name,
            "description": feature.description,
            "prerequisites": IDENTIFY_PREREQUISITES(feature),
            "steps": CREATE_STEP_BY_STEP_GUIDE(feature),
            "screenshots": CAPTURE_SCREENSHOTS(feature),
            "tips": GATHER_PRO_TIPS(feature),
            "common_issues": IDENTIFY_COMMON_ISSUES(feature)
        }
        guide_structure["features"][feature.id] = feature_doc
    
    # 4. Create tutorials
    for use_case in application.use_cases:
        tutorial = CREATE_TUTORIAL(
            use_case=use_case,
            difficulty=ASSESS_DIFFICULTY(use_case),
            estimated_time=ESTIMATE_COMPLETION_TIME(use_case)
        )
        guide_structure["tutorials"].append(tutorial)
    
    # 5. Generate FAQs
    guide_structure["faqs"] = GENERATE_FAQS(
        common_questions=ANALYZE_SUPPORT_TICKETS(),
        feature_questions=ANTICIPATE_USER_QUESTIONS(application)
    )
    
    # 6. Create troubleshooting guide
    guide_structure["troubleshooting"] = CREATE_TROUBLESHOOTING_GUIDE(
        known_issues=application.known_issues,
        error_messages=CATALOG_ERROR_MESSAGES(application),
        solutions=DOCUMENT_SOLUTIONS()
    )
    
    return guide_structure
```

## DOCUMENTATION MAINTENANCE

### KEEPING DOCS UPDATED

```python
def UPDATE_DOCUMENTATION(code_changes):
    affected_docs = []
    
    for change in code_changes:
        # 1. Identify affected documentation
        if change.type == "API_CHANGE":
            affected_docs.extend(FIND_API_DOCS(change.endpoint))
        elif change.type == "FEATURE_CHANGE":
            affected_docs.extend(FIND_FEATURE_DOCS(change.feature))
        elif change.type == "CONFIG_CHANGE":
            affected_docs.extend(FIND_CONFIG_DOCS(change.config))
        
        # 2. Update documentation
        for doc in affected_docs:
            if doc.type == "API_REFERENCE":
                UPDATE_API_DOCUMENTATION(doc, change)
            elif doc.type == "USER_GUIDE":
                UPDATE_USER_GUIDE(doc, change)
            elif doc.type == "README":
                UPDATE_README_SECTION(doc, change)
            
            # 3. Update examples
            UPDATE_CODE_EXAMPLES(doc, change)
            
            # 4. Update version information
            UPDATE_VERSION_INFO(doc, change.version)
    
    # 5. Verify consistency
    VERIFY_DOCUMENTATION_CONSISTENCY(affected_docs)
    
    # 6. Check for broken links
    CHECK_AND_FIX_BROKEN_LINKS(affected_docs)
```

### VERSION CONTROL

```python
def MANAGE_DOCUMENTATION_VERSIONS(project):
    # 1. Create version strategy
    version_strategy = {
        "current": project.current_version,
        "supported_versions": project.supported_versions,
        "deprecation_policy": project.deprecation_policy
    }
    
    # 2. Organize versioned docs
    for version in version_strategy["supported_versions"]:
        version_docs = {
            "path": f"/docs/{version}/",
            "status": DETERMINE_VERSION_STATUS(version),
            "migration_guide": CREATE_MIGRATION_GUIDE(version)
        }
        
        # 3. Update version-specific content
        UPDATE_VERSION_SPECIFIC_DOCS(version_docs, version)
        
        # 4. Add version warnings
        if version_docs["status"] == "deprecated":
            ADD_DEPRECATION_WARNINGS(version_docs)
    
    # 5. Create version switcher
    CREATE_VERSION_SWITCHER(version_strategy)
    
    # 6. Update latest symlink
    UPDATE_LATEST_VERSION_LINK(version_strategy["current"])
```

## SPECIALIZED DOCUMENTATION

### ARCHITECTURE DOCUMENTATION

```python
def DOCUMENT_ARCHITECTURE(system):
    # 1. Create architecture overview
    architecture_doc = {
        "overview": CREATE_SYSTEM_OVERVIEW(system),
        "components": DOCUMENT_COMPONENTS(system),
        "interactions": DOCUMENT_INTERACTIONS(system),
        "data_flow": DOCUMENT_DATA_FLOW(system),
        "deployment": DOCUMENT_DEPLOYMENT_ARCHITECTURE(system)
    }
    
    # 2. Generate diagrams
    diagrams = {
        "system_context": CREATE_C4_CONTEXT_DIAGRAM(system),
        "container_diagram": CREATE_C4_CONTAINER_DIAGRAM(system),
        "component_diagram": CREATE_C4_COMPONENT_DIAGRAM(system),
        "sequence_diagrams": CREATE_SEQUENCE_DIAGRAMS(system.use_cases),
        "deployment_diagram": CREATE_DEPLOYMENT_DIAGRAM(system)
    }
    
    # 3. Document design decisions
    architecture_doc["decisions"] = DOCUMENT_ADRs(system.design_decisions)
    
    # 4. Add quality attributes
    architecture_doc["quality_attributes"] = DOCUMENT_QUALITY_ATTRIBUTES({
        "performance": system.performance_requirements,
        "security": system.security_requirements,
        "scalability": system.scalability_requirements,
        "reliability": system.reliability_requirements
    })
    
    return architecture_doc, diagrams
```

### CODE DOCUMENTATION

```python
def GENERATE_CODE_DOCUMENTATION(codebase):
    # 1. Extract documentation from code
    code_docs = {}
    
    for file in codebase.files:
        if file.has_documentation():
            extracted_docs = EXTRACT_INLINE_DOCUMENTATION(file)
            
            # 2. Parse documentation format
            if file.language == "javascript":
                parsed_docs = PARSE_JSDOC(extracted_docs)
            elif file.language == "python":
                parsed_docs = PARSE_DOCSTRINGS(extracted_docs)
            elif file.language == "java":
                parsed_docs = PARSE_JAVADOC(extracted_docs)
            
            # 3. Generate formatted documentation
            code_docs[file.path] = FORMAT_CODE_DOCUMENTATION(parsed_docs)
    
    # 4. Create API reference
    api_reference = GENERATE_API_REFERENCE(code_docs)
    
    # 5. Add code examples
    api_reference = ADD_CODE_EXAMPLES(api_reference, codebase.examples)
    
    # 6. Generate searchable index
    search_index = CREATE_SEARCH_INDEX(api_reference)
    
    return api_reference, search_index
```

## DOCUMENTATION TOOLS

### DIAGRAM GENERATION

```python
def CREATE_DIAGRAM(diagram_type, data):
    if diagram_type == "sequence":
        return CREATE_MERMAID_SEQUENCE_DIAGRAM(data)
    elif diagram_type == "flowchart":
        return CREATE_MERMAID_FLOWCHART(data)
    elif diagram_type == "class":
        return CREATE_PLANTUML_CLASS_DIAGRAM(data)
    elif diagram_type == "architecture":
        return CREATE_C4_DIAGRAM(data)

def CREATE_MERMAID_SEQUENCE_DIAGRAM(interactions):
    mermaid_code = ["sequenceDiagram"]
    
    # Add participants
    participants = EXTRACT_PARTICIPANTS(interactions)
    for participant in participants:
        mermaid_code.append(f"    participant {participant}")
    
    # Add interactions
    for interaction in interactions:
        if interaction.type == "request":
            mermaid_code.append(
                f"    {interaction.from_}>>{interaction.to}: {interaction.message}"
            )
        elif interaction.type == "response":
            mermaid_code.append(
                f"    {interaction.from_}-->>{interaction.to}: {interaction.message}"
            )
    
    return "\n".join(mermaid_code)
```

### SEARCH OPTIMIZATION

```python
def OPTIMIZE_DOCUMENTATION_SEARCH(docs):
    # 1. Create search metadata
    for doc in docs:
        doc.metadata = {
            "title": doc.title,
            "description": CREATE_META_DESCRIPTION(doc),
            "keywords": EXTRACT_KEYWORDS(doc),
            "tags": GENERATE_TAGS(doc),
            "last_updated": doc.last_modified
        }
    
    # 2. Build search index
    search_index = {
        "documents": [],
        "keywords": {},
        "synonyms": LOAD_SYNONYM_DICTIONARY()
    }
    
    for doc in docs:
        # Index document
        indexed_doc = {
            "id": doc.id,
            "title": doc.title,
            "content": TOKENIZE_CONTENT(doc.content),
            "url": doc.url,
            "category": doc.category
        }
        search_index["documents"].append(indexed_doc)
        
        # Index keywords
        for keyword in doc.metadata["keywords"]:
            if keyword not in search_index["keywords"]:
                search_index["keywords"][keyword] = []
            search_index["keywords"][keyword].append(doc.id)
    
    # 3. Generate sitemap
    GENERATE_DOCUMENTATION_SITEMAP(docs)
    
    return search_index
```

## COLLABORATION

### REVIEW PROCESS

```python
def REQUEST_DOCUMENTATION_REVIEW(documentation):
    # 1. Identify reviewers
    reviewers = {
        "technical": IDENTIFY_TECHNICAL_REVIEWER(documentation.topic),
        "content": "DOCUMENTOR",  # Self-review for style
        "user": "CLIENT"  # User perspective
    }
    
    # 2. Create review checklist
    review_checklist = {
        "accuracy": "Technical details are correct",
        "completeness": "All necessary information included",
        "clarity": "Easy to understand",
        "examples": "Code examples work correctly",
        "formatting": "Consistent formatting throughout",
        "links": "All links are valid"
    }
    
    # 3. Send for review
    for reviewer_type, reviewer in reviewers.items():
        SEND_MESSAGE(
            to=reviewer,
            type="REQUEST",
            subject=f"Documentation review: {documentation.title}",
            content={
                "documentation": documentation,
                "checklist": review_checklist,
                "focus_areas": SELECT_FOCUS_AREAS(reviewer_type)
            }
        )
```

## BEST PRACTICES

### Writing Guidelines
1. **Clear and Concise**: Use simple language, avoid jargon
2. **Action-Oriented**: Start with verbs, focus on tasks
3. **Consistent Style**: Follow style guide strictly
4. **Complete Examples**: Provide working code examples
5. **Visual Aids**: Use diagrams and screenshots

### Documentation Structure
1. **Logical Organization**: Group related content together
2. **Progressive Disclosure**: Basic to advanced topics
3. **Easy Navigation**: Clear TOC and breadcrumbs
4. **Search Friendly**: Good titles and headings
5. **Version Aware**: Clear version indicators

### Maintenance Practices
1. **Regular Reviews**: Quarterly documentation audits
2. **Automated Checks**: Link checking, spell checking
3. **User Feedback**: Incorporate user suggestions
4. **Change Tracking**: Document all updates
5. **Deprecation Notices**: Clear warnings for outdated content