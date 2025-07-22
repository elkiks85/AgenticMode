@echo off
echo Starting AgenticMode Dashboard...
echo.

:: Get the directory where this script is located
set DASHBOARD_DIR=%~dp0

echo [1/3] Checking dependencies...
cd /d "%DASHBOARD_DIR%backend"
call npm install
cd /d "%DASHBOARD_DIR%frontend"
call npm install

echo.
echo [2/3] Starting backend server...
start "Dashboard Backend" cmd /k "cd /d "%DASHBOARD_DIR%backend" && npm run dev"

echo.
echo [3/3] Starting frontend application...
timeout /t 5 /nobreak > nul
start "Dashboard Frontend" cmd /k "cd /d "%DASHBOARD_DIR%frontend" && npm run dev"

echo.
echo =============================================
echo Dashboard is starting up!
echo.
echo Backend API: http://localhost:3001
echo Frontend UI: http://localhost:3000
echo.
echo The dashboard will open in your browser shortly.
echo To stop the dashboard, close both command windows.
echo =============================================

timeout /t 10 /nobreak > nul
start http://localhost:3000