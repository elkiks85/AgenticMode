@echo off
echo Starting Development Team Agents...
echo.

echo [1/5] Starting ARCHITECT...
start "ARCHITECT" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are ARCHITECT"

timeout /t 1 /nobreak > nul

echo [2/5] Starting BACKEND_DEV...
start "BACKEND_DEV" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are BACKEND_DEV"

timeout /t 1 /nobreak > nul

echo [3/5] Starting FRONTEND_DEV...
start "FRONTEND_DEV" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are FRONTEND_DEV"

timeout /t 1 /nobreak > nul

echo [4/5] Starting QA_ENGINEER...
start "QA_ENGINEER" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are QA_ENGINEER"

timeout /t 1 /nobreak > nul

echo [5/5] Starting DOCUMENTOR...
start "DOCUMENTOR" cmd /k "cd /d G:\SoftDev\AgenticMode && claude You are DOCUMENTOR"

echo.
echo =============================================
echo Development team agents started!
echo.
echo You should see 5 new terminal windows:
echo - ARCHITECT (System Designer)
echo - BACKEND_DEV (Server Developer)
echo - FRONTEND_DEV (UI Developer)
echo - QA_ENGINEER (Quality Assurance)
echo - DOCUMENTOR (Documentation)
echo =============================================
pause