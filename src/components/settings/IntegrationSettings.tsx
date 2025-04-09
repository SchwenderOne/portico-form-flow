
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  Database, 
  CloudCog, 
  CreditCard, 
  Mail, 
  MessageSquare
} from "lucide-react";

const IntegrationSettings = () => {
  const handleConnect = (service: string) => {
    toast.success(`Connected to ${service}`, {
      description: `Your ${service} integration has been set up successfully`
    });
  };
  
  const handleDisconnect = (service: string) => {
    toast.info(`Disconnected from ${service}`, {
      description: `Your ${service} integration has been removed`
    });
  };
  
  const handleSaveApiKey = (service: string) => {
    toast.success(`${service} API key saved`, {
      description: `Your ${service} integration is now active`
    });
  };

  const integrations = [
    {
      name: "Supabase",
      description: "Database and authentication provider",
      connected: true,
      icon: <Database className="h-6 w-6" />,
      key: "supabase"
    },
    {
      name: "Stripe",
      description: "Payment processing integration",
      connected: false,
      icon: <CreditCard className="h-6 w-6" />,
      key: "stripe"
    },
    {
      name: "SendGrid",
      description: "Email delivery service",
      connected: true,
      icon: <Mail className="h-6 w-6" />,
      key: "sendgrid"
    },
    {
      name: "OpenAI",
      description: "AI-powered form suggestions",
      connected: false,
      icon: <CloudCog className="h-6 w-6" />,
      key: "openai"
    },
    {
      name: "Slack",
      description: "Notifications and alerts",
      connected: false,
      icon: <MessageSquare className="h-6 w-6" />,
      key: "slack"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Integration Settings</h3>
        <p className="text-sm text-muted-foreground">
          Connect third-party services to enhance your application
        </p>
      </div>

      <Separator />

      <div className="space-y-6">
        {integrations.map((integration) => (
          <div key={integration.key} className="flex items-start justify-between space-x-4">
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-md bg-muted flex items-center justify-center">
                {integration.icon}
              </div>
              <div>
                <h4 className="text-sm font-medium">{integration.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {integration.description}
                </p>
                
                {integration.connected && (
                  <div className="mt-2 flex items-center text-xs text-green-600">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor" 
                      className="w-4 h-4 mr-1"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    Connected
                  </div>
                )}
              </div>
            </div>
            
            <div>
              {integration.connected ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDisconnect(integration.name)}
                >
                  Disconnect
                </Button>
              ) : (
                <Button 
                  size="sm"
                  onClick={() => handleConnect(integration.name)}
                >
                  Connect
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-sm font-medium">API Configuration</h4>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="openai-key">OpenAI API Key</Label>
            <div className="flex gap-2">
              <Input id="openai-key" type="password" placeholder="sk-..." />
              <Button onClick={() => handleSaveApiKey("OpenAI")}>Save</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Required for AI-powered form suggestions
            </p>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="sendgrid-key">SendGrid API Key</Label>
            <div className="flex gap-2">
              <Input id="sendgrid-key" type="password" value="••••••••••••••••••••••" readOnly />
              <Button variant="outline" onClick={() => handleDisconnect("SendGrid")}>Reset</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Used for sending form submission notifications
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Webhook Settings</h4>
        
        <div className="grid gap-2">
          <Label htmlFor="webhook-url">Form Submission Webhook URL</Label>
          <Input 
            id="webhook-url" 
            placeholder="https://example.com/webhook"
          />
          <p className="text-xs text-muted-foreground">
            Receive real-time notifications when forms are submitted
          </p>
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <Label>Enable Webhooks</Label>
            <p className="text-xs text-muted-foreground">
              Send form submission data to external services
            </p>
          </div>
          <Switch defaultChecked={false} />
        </div>
        
        <Button onClick={() => toast.success("Webhook settings saved")}>
          Save Webhook Settings
        </Button>
      </div>
    </div>
  );
};

export default IntegrationSettings;
