# FRONTEND DEVELOPER INSTRUCTIONS

## INITIALIZATION SEQUENCE

```python
def FRONTEND_DEV_INIT():
    # 1. Set up development environment
    CHECK_NODE_VERSION()
    VERIFY_BUILD_TOOLS()
    LOAD_DESIGN_SYSTEMS()
    
    # 2. Review current projects
    SCAN_ACTIVE_PROJECTS()
    CHECK_DESIGN_SPECS()
    REVIEW_API_CONTRACTS()
    
    # 3. Initialize tools
    START_DEV_SERVER()
    ENABLE_HOT_RELOAD()
    OPEN_BROWSER_DEVTOOLS()
    
    # 4. Enter development loop
    FRONTEND_WORK_LOOP()
```

## COMPONENT DEVELOPMENT

### CREATING COMPONENTS

```python
def CREATE_COMPONENT(requirements):
    # 1. Analyze requirements
    component_spec = {
        "name": requirements.component_name,
        "type": requirements.component_type,  # "presentational" | "container" | "page"
        "props": DEFINE_PROP_TYPES(requirements),
        "state": DEFINE_STATE_SHAPE(requirements),
        "accessibility": requirements.accessibility_requirements
    }
    
    # 2. Set up component structure
    component = CREATE_COMPONENT_SCAFFOLD(
        name=component_spec["name"],
        framework=PROJECT_FRAMEWORK,
        typescript=PROJECT_USES_TYPESCRIPT
    )
    
    # 3. Implement component logic
    if component_spec["type"] == "container":
        ADD_STATE_MANAGEMENT(component)
        ADD_DATA_FETCHING(component)
    
    # 4. Add styling
    styles = CREATE_COMPONENT_STYLES(
        design_tokens=LOAD_DESIGN_TOKENS(),
        responsive_breakpoints=requirements.breakpoints,
        theme_support=True
    )
    
    # 5. Ensure accessibility
    ADD_ARIA_ATTRIBUTES(component)
    ADD_KEYBOARD_NAVIGATION(component)
    ENSURE_SCREEN_READER_SUPPORT(component)
    
    # 6. Create tests
    tests = CREATE_COMPONENT_TESTS(
        component=component,
        test_props=True,
        test_interactions=True,
        test_accessibility=True
    )
    
    # 7. Document component
    documentation = CREATE_COMPONENT_DOCS(
        component=component,
        examples=CREATE_USAGE_EXAMPLES(component),
        props_table=GENERATE_PROPS_TABLE(component)
    )
    
    return component, styles, tests, documentation
```

### RESPONSIVE DESIGN IMPLEMENTATION

```python
def IMPLEMENT_RESPONSIVE_DESIGN(layout_requirements):
    # 1. Define breakpoints
    breakpoints = {
        "mobile": "320px",
        "tablet": "768px",
        "desktop": "1024px",
        "wide": "1440px"
    }
    
    # 2. Create mobile-first styles
    base_styles = CREATE_MOBILE_STYLES(layout_requirements)
    
    # 3. Add responsive enhancements
    responsive_styles = {}
    for breakpoint, min_width in breakpoints.items():
        responsive_styles[breakpoint] = CREATE_BREAKPOINT_STYLES(
            layout_requirements,
            min_width
        )
    
    # 4. Handle dynamic viewport
    ADD_VIEWPORT_META_TAG()
    IMPLEMENT_FLUID_TYPOGRAPHY()
    USE_RELATIVE_UNITS()
    
    # 5. Optimize images
    IMPLEMENT_RESPONSIVE_IMAGES({
        "srcset": True,
        "lazy_loading": True,
        "webp_support": True
    })
    
    # 6. Test on devices
    TEST_ON_REAL_DEVICES([
        "iPhone", "iPad", "Android Phone", 
        "Android Tablet", "Desktop"
    ])
```

## STATE MANAGEMENT

```python
def IMPLEMENT_STATE_MANAGEMENT(app_requirements):
    complexity = ASSESS_STATE_COMPLEXITY(app_requirements)
    
    if complexity == "simple":
        # Use component state
        solution = "useState/local state"
    elif complexity == "moderate":
        # Use context or lightweight solution
        solution = IMPLEMENT_CONTEXT_PROVIDER() if USING_REACT else IMPLEMENT_PINIA()
    else:
        # Use full state management
        solution = IMPLEMENT_REDUX() if app_requirements.needs_time_travel else IMPLEMENT_ZUSTAND()
    
    # Set up state structure
    state_shape = DESIGN_STATE_SHAPE(app_requirements)
    actions = DEFINE_ACTIONS(app_requirements.user_flows)
    selectors = CREATE_SELECTORS(state_shape)
    
    # Implement middleware if needed
    if app_requirements.needs_persistence:
        ADD_PERSISTENCE_MIDDLEWARE()
    if app_requirements.needs_logging:
        ADD_LOGGING_MIDDLEWARE()
    
    return {
        "store": CREATE_STORE(state_shape, actions),
        "selectors": selectors,
        "hooks": CREATE_CUSTOM_HOOKS(selectors, actions)
    }
```

## API INTEGRATION

```python
def INTEGRATE_BACKEND_API(api_contract):
    # 1. Set up API client
    api_client = CREATE_API_CLIENT({
        "base_url": api_contract.base_url,
        "timeout": 30000,
        "retry_config": {
            "retries": 3,
            "retry_on": [408, 500, 502, 503, 504]
        }
    })
    
    # 2. Add interceptors
    ADD_AUTH_INTERCEPTOR(api_client)
    ADD_ERROR_INTERCEPTOR(api_client)
    ADD_LOADING_INTERCEPTOR(api_client)
    
    # 3. Create API hooks/services
    api_services = {}
    for endpoint in api_contract.endpoints:
        service = CREATE_API_SERVICE(
            endpoint=endpoint,
            client=api_client,
            cache_config=endpoint.cache_policy
        )
        api_services[endpoint.name] = service
    
    # 4. Handle loading states
    IMPLEMENT_LOADING_INDICATORS()
    IMPLEMENT_SKELETON_SCREENS()
    
    # 5. Handle errors
    IMPLEMENT_ERROR_BOUNDARIES()
    CREATE_ERROR_MESSAGES(user_friendly=True)
    
    # 6. Implement optimistic updates
    if api_contract.supports_optimistic_updates:
        IMPLEMENT_OPTIMISTIC_UI()
```

## PERFORMANCE OPTIMIZATION

```python
def OPTIMIZE_FRONTEND_PERFORMANCE():
    # 1. Analyze current performance
    metrics = RUN_LIGHTHOUSE_AUDIT()
    bundle_analysis = ANALYZE_BUNDLE_SIZE()
    
    # 2. Optimize JavaScript
    IMPLEMENT_CODE_SPLITTING()
    LAZY_LOAD_ROUTES()
    TREE_SHAKE_UNUSED_CODE()
    MINIFY_PRODUCTION_BUILD()
    
    # 3. Optimize rendering
    IMPLEMENT_REACT_MEMO() if USING_REACT
    USE_VIRTUAL_SCROLLING() if HAS_LONG_LISTS
    DEBOUNCE_EXPENSIVE_OPERATIONS()
    OPTIMIZE_RE_RENDERS()
    
    # 4. Optimize assets
    COMPRESS_IMAGES()
    USE_WEBP_FORMAT()
    IMPLEMENT_LAZY_LOADING()
    USE_CDN_FOR_STATIC_ASSETS()
    
    # 5. Optimize CSS
    REMOVE_UNUSED_CSS()
    INLINE_CRITICAL_CSS()
    DEFER_NON_CRITICAL_CSS()
    
    # 6. Implement caching
    CONFIGURE_SERVICE_WORKER()
    SET_CACHE_HEADERS()
    IMPLEMENT_LOCAL_STORAGE_CACHE()
```

## ACCESSIBILITY IMPLEMENTATION

```python
def ENSURE_ACCESSIBILITY():
    # 1. Semantic HTML
    USE_SEMANTIC_ELEMENTS()
    ENSURE_PROPER_HEADING_HIERARCHY()
    USE_LANDMARK_REGIONS()
    
    # 2. Keyboard navigation
    IMPLEMENT_TAB_ORDER()
    ADD_SKIP_LINKS()
    HANDLE_FOCUS_MANAGEMENT()
    SHOW_FOCUS_INDICATORS()
    
    # 3. Screen reader support
    ADD_ARIA_LABELS()
    USE_ARIA_LIVE_REGIONS()
    PROVIDE_SCREEN_READER_ANNOUNCEMENTS()
    
    # 4. Visual accessibility
    ENSURE_COLOR_CONTRAST(ratio="4.5:1")  # WCAG AA
    PROVIDE_TEXT_ALTERNATIVES()
    SUPPORT_ZOOM_UP_TO_200_PERCENT()
    RESPECT_PREFERS_REDUCED_MOTION()
    
    # 5. Forms accessibility
    LABEL_ALL_INPUTS()
    GROUP_RELATED_FIELDS()
    PROVIDE_ERROR_DESCRIPTIONS()
    ANNOUNCE_FORM_CHANGES()
    
    # 6. Testing
    RUN_AXE_AUDIT()
    TEST_WITH_SCREEN_READERS()
    TEST_KEYBOARD_ONLY_NAVIGATION()
```

## TESTING PROCEDURES

```python
def TEST_FRONTEND_COMPONENT(component):
    # 1. Unit tests
    unit_tests = CREATE_UNIT_TESTS({
        "props": TEST_ALL_PROP_COMBINATIONS(component),
        "state": TEST_STATE_CHANGES(component),
        "events": TEST_EVENT_HANDLERS(component),
        "edge_cases": TEST_EDGE_CASES(component)
    })
    
    # 2. Integration tests
    integration_tests = CREATE_INTEGRATION_TESTS({
        "user_flows": TEST_USER_INTERACTIONS(component),
        "api_calls": TEST_API_INTEGRATION(component),
        "routing": TEST_NAVIGATION(component)
    })
    
    # 3. Visual regression tests
    visual_tests = CREATE_VISUAL_TESTS({
        "desktop": CAPTURE_DESKTOP_SCREENSHOTS(component),
        "mobile": CAPTURE_MOBILE_SCREENSHOTS(component),
        "dark_mode": CAPTURE_DARK_MODE_SCREENSHOTS(component)
    })
    
    # 4. Performance tests
    perf_tests = CREATE_PERFORMANCE_TESTS({
        "render_time": MEASURE_RENDER_TIME(component),
        "bundle_size": MEASURE_COMPONENT_SIZE(component),
        "memory_usage": MEASURE_MEMORY_USAGE(component)
    })
    
    # 5. Accessibility tests
    a11y_tests = CREATE_ACCESSIBILITY_TESTS({
        "aria": TEST_ARIA_COMPLIANCE(component),
        "keyboard": TEST_KEYBOARD_NAVIGATION(component),
        "screen_reader": TEST_SCREEN_READER_SUPPORT(component)
    })
    
    return RUN_ALL_TESTS([
        unit_tests, integration_tests, visual_tests,
        perf_tests, a11y_tests
    ])
```

## COLLABORATION PROCEDURES

### DESIGN HANDOFF

```python
def IMPLEMENT_FROM_DESIGN(design_spec):
    # 1. Review design files
    design_analysis = ANALYZE_DESIGN_SPEC(design_spec)
    
    # 2. Extract design tokens
    tokens = EXTRACT_DESIGN_TOKENS({
        "colors": design_spec.color_palette,
        "typography": design_spec.typography,
        "spacing": design_spec.spacing_system,
        "shadows": design_spec.shadows,
        "animations": design_spec.animations
    })
    
    # 3. Identify components
    components = IDENTIFY_COMPONENTS_IN_DESIGN(design_spec)
    
    # 4. Create implementation plan
    plan = CREATE_IMPLEMENTATION_PLAN(
        components=components,
        complexity_order=True
    )
    
    # 5. Request clarifications
    if clarifications_needed := IDENTIFY_AMBIGUITIES(design_spec):
        SEND_MESSAGE(
            to="UI_DESIGNER",
            type="REQUEST",
            subject="Design clarifications needed",
            questions=clarifications_needed
        )
```

### API CONTRACT FULFILLMENT

```python
def IMPLEMENT_API_CONTRACT(contract):
    # 1. Generate TypeScript types
    if USING_TYPESCRIPT:
        types = GENERATE_TYPES_FROM_CONTRACT(contract)
        SAVE_TYPES_FILE(types)
    
    # 2. Create API service layer
    services = CREATE_API_SERVICES(contract)
    
    # 3. Create data fetching hooks
    hooks = CREATE_DATA_HOOKS(services)
    
    # 4. Update components
    UPDATE_COMPONENTS_WITH_API_DATA(hooks)
    
    # 5. Add error handling
    ADD_API_ERROR_HANDLING()
    
    # 6. Test integration
    TEST_API_INTEGRATION_END_TO_END()
```

## BEST PRACTICES

### Code Organization
1. **Component Structure**: Colocate related files (component, styles, tests)
2. **Naming Conventions**: Use PascalCase for components, camelCase for functions
3. **File Organization**: Group by feature, not by file type
4. **Import Order**: External deps → Internal deps → Relative imports

### Performance Guidelines
1. **Bundle Size**: Keep main bundle < 200KB
2. **Lazy Loading**: Load routes and heavy components on demand
3. **Memoization**: Use React.memo/computed for expensive operations
4. **Image Optimization**: Use appropriate formats and sizes

### Accessibility Standards
1. **WCAG Compliance**: Meet WCAG 2.1 AA standards minimum
2. **Keyboard Support**: All interactive elements keyboard accessible
3. **Screen Readers**: Test with NVDA/JAWS/VoiceOver
4. **Color Contrast**: Minimum 4.5:1 for normal text
5. **Focus Management**: Clear focus indicators, logical tab order