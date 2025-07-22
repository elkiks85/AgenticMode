#!/bin/bash

echo "Starting AgenticMode Dashboard..."
echo ""

echo "[1/3] Checking dependencies..."
cd backend
npm install
cd ../frontend
npm install
cd ..

echo ""
echo "[2/3] Starting backend server..."
cd backend && npm run dev &
BACKEND_PID=$!

echo ""
echo "[3/3] Starting frontend application..."
sleep 5
cd frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "============================================="
echo "Dashboard is starting up!"
echo ""
echo "Backend API: http://localhost:3001"
echo "Frontend UI: http://localhost:3000"
echo ""
echo "The dashboard will open in your browser shortly."
echo "Press Ctrl+C to stop the dashboard."
echo "============================================="

sleep 10
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:3000
elif command -v open > /dev/null; then
    open http://localhost:3000
fi

# Wait for processes
wait $BACKEND_PID
wait $FRONTEND_PID