'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Terminal, 
  Copy, 
  CheckCircle,
  AlertCircle,
  Users,
  Rocket,
  Info
} from 'lucide-react';

interface AgentCommand {
  name: string;
  command: string;
  role: string;
  category: 'core' | 'development' | 'support';
  required?: boolean;
}

const agentCommands: AgentCommand[] = [
  // Core Agents
  { name: 'AGENT_MANAGER', command: 'You are AGENT_MANAGER', role: 'System Administrator', category: 'core', required: true },
  { name: 'CLIENT', command: 'You are CLIENT', role: 'User Interface', category: 'core', required: true },
  { name: 'ORCHESTRATOR', command: 'You are ORCHESTRATOR', role: 'Task Coordinator', category: 'core', required: true },
  
  // Development Team
  { name: 'ARCHITECT', command: 'You are ARCHITECT', role: 'System Designer', category: 'development' },
  { name: 'BACKEND_DEV', command: 'You are BACKEND_DEV', role: 'Server Developer', category: 'development' },
  { name: 'FRONTEND_DEV', command: 'You are FRONTEND_DEV', role: 'UI Developer', category: 'development' },
  { name: 'QA_ENGINEER', command: 'You are QA_ENGINEER', role: 'Quality Assurance', category: 'development' },
  { name: 'DOCUMENTOR', command: 'You are DOCUMENTOR', role: 'Documentation', category: 'development' },
  
  // Support Team
  { name: 'SECURITY', command: 'You are SECURITY', role: 'Security Specialist', category: 'support' },
  { name: 'DEVOPS', command: 'You are DEVOPS', role: 'Infrastructure', category: 'support' },
  { name: 'DEPLOYMENT', command: 'You are DEPLOYMENT', role: 'Release Manager', category: 'support' },
  { name: 'MONITOR', command: 'You are MONITOR', role: 'System Monitor', category: 'support' },
  { name: 'PERFORMANCE', command: 'You are PERFORMANCE', role: 'Optimizer', category: 'support' },
  { name: 'INTEGRATOR', command: 'You are INTEGRATOR', role: 'Integration Expert', category: 'support' },
  { name: 'AUDITOR', command: 'You are AUDITOR', role: 'Compliance', category: 'support' },
  { name: 'TESTER', command: 'You are TESTER', role: 'Test Automation', category: 'support' },
  { name: 'REVIEWER', command: 'You are REVIEWER', role: 'Code Review', category: 'support' },
];

export default function AgentLauncher() {
  const [copiedAgent, setCopiedAgent] = useState<string | null>(null);
  const baseCommand = 'cd G:/SoftDev/AgenticMode';

  const copyToClipboard = (agent: AgentCommand) => {
    const fullCommand = `${baseCommand}\n${agent.command}`;
    navigator.clipboard.writeText(fullCommand);
    setCopiedAgent(agent.name);
    setTimeout(() => setCopiedAgent(null), 2000);
  };

  const coreAgents = agentCommands.filter(a => a.category === 'core');
  const devAgents = agentCommands.filter(a => a.category === 'development');
  const supportAgents = agentCommands.filter(a => a.category === 'support');

  const AgentCard = ({ agent }: { agent: AgentCommand }) => (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {agent.name}
              {agent.required && (
                <Badge variant="destructive" className="text-xs">Required</Badge>
              )}
            </CardTitle>
            <CardDescription>{agent.role}</CardDescription>
          </div>
          <Button
            size="sm"
            variant={copiedAgent === agent.name ? "success" : "outline"}
            onClick={() => copyToClipboard(agent)}
          >
            {copiedAgent === agent.name ? (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-3 rounded-md font-mono text-sm">
          <div className="text-muted-foreground">{baseCommand}</div>
          <div className="font-semibold">{agent.command}</div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Agent Launcher</h1>
        <p className="text-muted-foreground">
          Start agents by copying these commands into separate terminal windows
        </p>
      </div>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> Each agent must run in its own terminal window. 
          Start with the Core agents first, then add Development and Support agents as needed.
        </AlertDescription>
      </Alert>

      <div className="mb-6 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">Quick Setup Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Open a new terminal for each agent</li>
          <li>Click "Copy" to copy the commands</li>
          <li>Paste into the terminal and press Enter</li>
          <li>The agent will initialize and start working</li>
        </ol>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Agents</TabsTrigger>
          <TabsTrigger value="core">Core (Required)</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-red-500">●</span> Core Agents
                <Badge>Required</Badge>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coreAgents.map(agent => (
                  <AgentCard key={agent.name} agent={agent} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-yellow-500">●</span> Development Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {devAgents.map(agent => (
                  <AgentCard key={agent.name} agent={agent} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-green-500">●</span> Support Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {supportAgents.map(agent => (
                  <AgentCard key={agent.name} agent={agent} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="core">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreAgents.map(agent => (
              <AgentCard key={agent.name} agent={agent} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="development">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devAgents.map(agent => (
              <AgentCard key={agent.name} agent={agent} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="support">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportAgents.map(agent => (
              <AgentCard key={agent.name} agent={agent} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mt-8 bg-blue-50 dark:bg-blue-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Deployment Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">Minimal Setup (3 agents)</h4>
            <p className="text-sm text-muted-foreground">For testing: Core agents only</p>
          </div>
          <div>
            <h4 className="font-semibold">Standard Setup (8 agents)</h4>
            <p className="text-sm text-muted-foreground">For development: Core + Development team</p>
          </div>
          <div>
            <h4 className="font-semibold">Full Setup (17 agents)</h4>
            <p className="text-sm text-muted-foreground">For production: All agents</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}