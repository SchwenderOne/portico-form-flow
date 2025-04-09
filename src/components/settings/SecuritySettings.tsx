
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { AlertCircle, KeyRound, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SecuritySettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password changed", {
      description: "Your password has been updated successfully"
    });
  };
  
  const handleToggleTwoFactor = (checked: boolean) => {
    setTwoFactorEnabled(checked);
    if (checked) {
      toast.info("Two-factor authentication enabled", {
        description: "Check your email for verification code"
      });
    } else {
      toast.info("Two-factor authentication disabled", {
        description: "Your account is now secured with password only"
      });
    }
  };
  
  const handleGenerateApiKey = () => {
    toast.success("API key generated", {
      description: "Your new API key has been created"
    });
  };
  
  const handleRevokeApiKey = () => {
    toast.success("API key revoked", {
      description: "Your API key has been revoked successfully"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account security and authentication methods
        </p>
      </div>

      <Separator />

      <div className="space-y-8">
        <form onSubmit={handleChangePassword} className="space-y-4">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            Change Password
          </h4>
          
          <div className="grid gap-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          
          <Button type="submit">Update Password</Button>
        </form>

        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Two-Factor Authentication
          </h4>
          
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label>Enable Two-Factor Authentication</Label>
              <p className="text-xs text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch 
              checked={twoFactorEnabled} 
              onCheckedChange={handleToggleTwoFactor} 
            />
          </div>
          
          {twoFactorEnabled && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Two-factor authentication is enabled</AlertTitle>
              <AlertDescription>
                You will be asked for an authentication code when signing in.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">API Keys</h4>
          
          <div className="grid gap-2">
            <Label htmlFor="api-key">Current API Key</Label>
            <div className="flex gap-2">
              <Input 
                id="api-key"
                value="••••••••••••••••••••••••••••••"
                readOnly
                className="font-mono"
              />
              <Button variant="outline" onClick={() => toast.info("API key copied to clipboard")}>
                Copy
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Use this key to authenticate API requests
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleGenerateApiKey}>
              Generate New Key
            </Button>
            <Button variant="destructive" onClick={handleRevokeApiKey}>
              Revoke Key
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Active Sessions</h4>
          
          <div className="rounded-md border">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Current Session</p>
                  <p className="text-xs text-muted-foreground">
                    Chrome on Windows • IP: 192.168.1.1
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Active now
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Safari on MacOS</p>
                  <p className="text-xs text-muted-foreground">
                    IP: 192.168.1.2 • Last active 2 days ago
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  Log out
                </Button>
              </div>
            </div>
          </div>
          
          <Button variant="outline">Log Out All Other Sessions</Button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
