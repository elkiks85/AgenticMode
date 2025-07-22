@echo off
echo Starting Support Team Agents...
echo.

echo [1/9] Starting SECURITY...
start "SECURITY" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are SECURITY"

timeout /t 2 /nobreak > nul

echo [2/9] Starting DEVOPS...
start "DEVOPS" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are DEVOPS"

timeout /t 2 /nobreak > nul

echo [3/9] Starting DEPLOYMENT...
start "DEPLOYMENT" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are DEPLOYMENT"

timeout /t 2 /nobreak > nul

echo [4/9] Starting MONITOR...
start "MONITOR" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are MONITOR"

timeout /t 2 /nobreak > nul

echo [5/9] Starting PERFORMANCE...
start "PERFORMANCE" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are PERFORMANCE"

timeout /t 2 /nobreak > nul

echo [6/9] Starting INTEGRATOR...
start "INTEGRATOR" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are INTEGRATOR"

timeout /t 2 /nobreak > nul

echo [7/9] Starting AUDITOR...
start "AUDITOR" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are AUDITOR"

timeout /t 2 /nobreak > nul

echo [8/9] Starting TESTER...
start "TESTER" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are TESTER"

timeout /t 2 /nobreak > nul

echo [9/9] Starting REVIEWER...
start "REVIEWER" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are REVIEWER"

echo.
echo =============================================
echo Support team agents started!
echo.
echo You should see 9 new terminal windows:
echo - SECURITY (Security Analysis)
echo - DEVOPS (Infrastructure)
echo - DEPLOYMENT (Release Management)
echo - MONITOR (System Monitoring)
echo - PERFORMANCE (Optimization)
echo - INTEGRATOR (System Integration)
echo - AUDITOR (Code Auditing)
echo - TESTER (Specialized Testing)
echo - REVIEWER (Code Review)
echo =============================================
pause