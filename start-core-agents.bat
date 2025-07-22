@echo off
echo Starting Core AgenticMode Agents...
echo.

echo [1/3] Starting AGENT_MANAGER...
start "AGENT_MANAGER" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are AGENT_MANAGER"

timeout /t 2 /nobreak > nul

echo [2/3] Starting CLIENT...
start "CLIENT" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are CLIENT"

timeout /t 2 /nobreak > nul

echo [3/3] Starting ORCHESTRATOR...
start "ORCHESTRATOR" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are ORCHESTRATOR"

echo.
echo =============================================
echo Core agents started!
echo.
echo You should see 3 new terminal windows:
echo - AGENT_MANAGER (System Administrator)
echo - CLIENT (User Interface)
echo - ORCHESTRATOR (Task Coordinator)
echo.
echo To create a project, use the CLIENT terminal.
echo =============================================
pause