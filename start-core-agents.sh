#!/bin/bash

echo "Starting Core AgenticMode Agents..."
echo ""

echo "[1/3] Starting AGENT_MANAGER..."
gnome-terminal --title="AGENT_MANAGER" -- bash -c 'cd /home/user/AgenticMode && echo "You are AGENT_MANAGER" && echo "" && echo "Agent AGENT_MANAGER initialized. Waiting for commands..." && exec bash' &

sleep 2

echo "[2/3] Starting CLIENT..."
gnome-terminal --title="CLIENT" -- bash -c 'cd /home/user/AgenticMode && echo "You are CLIENT" && echo "" && echo "Agent CLIENT initialized. Waiting for commands..." && exec bash' &

sleep 2

echo "[3/3] Starting ORCHESTRATOR..."
gnome-terminal --title="ORCHESTRATOR" -- bash -c 'cd /home/user/AgenticMode && echo "You are ORCHESTRATOR" && echo "" && echo "Agent ORCHESTRATOR initialized. Waiting for commands..." && exec bash' &

echo ""
echo "============================================="
echo "Core agents started!"
echo ""
echo "You should see 3 new terminal windows:"
echo "- AGENT_MANAGER (System Administrator)"
echo "- CLIENT (User Interface)"
echo "- ORCHESTRATOR (Task Coordinator)"
echo ""
echo "To create a project, use the CLIENT terminal."
echo "============================================="