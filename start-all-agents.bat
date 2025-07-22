@echo off
echo Starting ALL AgenticMode Agents...
echo This will open 17 terminal windows!
echo.
pause

echo Starting Core Agents...
call start-core-agents.bat

echo.
echo Starting Development Team...
call start-dev-agents.bat

echo.
echo Starting Support Team...
call start-support-agents.bat

echo.
echo =============================================
echo ALL 17 AGENTS STARTED SUCCESSFULLY!
echo.
echo Core Team: AGENT_MANAGER, CLIENT, ORCHESTRATOR
echo Dev Team: ARCHITECT, BACKEND_DEV, FRONTEND_DEV, QA_ENGINEER, DOCUMENTOR
echo Support: SECURITY, DEVOPS, DEPLOYMENT, MONITOR, PERFORMANCE, INTEGRATOR, AUDITOR, TESTER, REVIEWER
echo.
echo Use the CLIENT terminal to create projects.
echo =============================================
pause