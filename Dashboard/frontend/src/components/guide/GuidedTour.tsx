'use client';

import { useEffect, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, HelpCircle, PlayCircle } from 'lucide-react';

export default function GuidedTour() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if user is new
    const hasSeenTour = localStorage.getItem('agentic-tour-completed');
    if (!hasSeenTour) {
      setShowWelcome(true);
    }
  }, []);

  const startTour = () => {
    setShowWelcome(false);

    const driverObj = driver({
      showProgress: true,
      animate: true,
      opacity: 0.75,
      steps: [
        {
          element: '[data-tour="agents-overview"]',
          popover: {
            title: 'Agent Overview',
            description: 'This shows how many agents are currently online and working in your system.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '[data-tour="projects-overview"]',
          popover: {
            title: 'Active Projects',
            description: 'Track all your development projects and their current status.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '[data-tour="tasks-overview"]',
          popover: {
            title: 'Task Progress',
            description: 'Monitor the overall progress of tasks across all projects.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '[data-tour="quick-actions"]',
          popover: {
            title: 'Quick Actions',
            description: 'Start new projects or perform common actions quickly from here.',
            side: 'top',
            align: 'start'
          }
        },
        {
          element: '[data-tour="start-project"]',
          popover: {
            title: 'Start a New Project',
            description: 'Click here to create a new project. The CLIENT agent will guide you through the process.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          popover: {
            title: '🎉 Tour Complete!',
            description: 'You\'re ready to start using AgenticMode. Remember, you need to have at least the core agents (AGENT_MANAGER, CLIENT, ORCHESTRATOR) running in terminals.'
          }
        }
      ],
      onDestroyStarted: () => {
        localStorage.setItem('agentic-tour-completed', 'true');
        driverObj.destroy();
      }
    });

    driverObj.drive();
  };

  if (!showWelcome) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={startTour}
          className="shadow-lg"
          title="Start guided tour"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="max-w-lg mx-4">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">Welcome to AgenticMode Dashboard! 🚀</CardTitle>
              <CardDescription className="mt-2">
                Your command center for the multi-agent development system
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowWelcome(false);
                localStorage.setItem('agentic-tour-completed', 'true');
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Before you begin:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Make sure you have terminals running with the core agents</li>
              <li>At minimum, you need: AGENT_MANAGER, CLIENT, and ORCHESTRATOR</li>
              <li>The dashboard monitors your agents and projects in real-time</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">What you can do here:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Monitor agent status and health</li>
              <li>Track project progress</li>
              <li>View inter-agent communications</li>
              <li>Start new projects with guidance</li>
              <li>See system metrics and performance</li>
            </ul>
          </div>

          <div className="flex gap-2">
            <Button onClick={startTour} className="flex-1">
              <PlayCircle className="mr-2 h-4 w-4" />
              Start Guided Tour
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowWelcome(false);
                localStorage.setItem('agentic-tour-completed', 'true');
              }}
              className="flex-1"
            >
              Skip Tour
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}