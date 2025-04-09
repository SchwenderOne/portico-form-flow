
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GeneralSettings from "@/components/settings/GeneralSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import IntegrationSettings from "@/components/settings/IntegrationSettings";
import AccountSettings from "@/components/settings/AccountSettings";
import { Shield, User, Bell, Globe, Puzzle } from "lucide-react";
import ComplianceTab from "@/components/form-builder/toolbars/tabs/ComplianceTab";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const tabIcons = {
    general: <Globe className="h-4 w-4" />,
    account: <User className="h-4 w-4" />,
    notifications: <Bell className="h-4 w-4" />,
    security: <Shield className="h-4 w-4" />,
    integrations: <Puzzle className="h-4 w-4" />,
    compliance: <Shield className="h-4 w-4" />
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your application settings and preferences
          </p>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Configure your preferences and app settings
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <TabsList className="grid w-full grid-cols-6 gap-4 p-4">
                {Object.entries(tabIcons).map(([key, icon]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    className="flex items-center gap-2 capitalize"
                  >
                    {icon}
                    {key}
                  </TabsTrigger>
                ))}
              </TabsList>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <TabsContent value="general" className="mt-0">
                <GeneralSettings />
              </TabsContent>
              
              <TabsContent value="account" className="mt-0">
                <AccountSettings />
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <NotificationSettings />
              </TabsContent>
              
              <TabsContent value="security" className="mt-0">
                <SecuritySettings />
              </TabsContent>
              
              <TabsContent value="integrations" className="mt-0">
                <IntegrationSettings />
              </TabsContent>
              
              <TabsContent value="compliance" className="mt-0">
                <ComplianceTab />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
