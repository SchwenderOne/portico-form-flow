
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ComplianceSettings from "@/components/compliance/ComplianceSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileDown, Clock } from "lucide-react";

const Compliance = () => {
  return (
    <AppLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Compliance & Governance</h1>
        
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="settings">
              <Shield className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="exports">
              <FileDown className="h-4 w-4 mr-2" />
              Data Exports
            </TabsTrigger>
            <TabsTrigger value="retention">
              <Clock className="h-4 w-4 mr-2" />
              Retention Policies
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Settings</CardTitle>
                <CardDescription>
                  Configure privacy and compliance settings for your forms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ComplianceSettings />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="exports">
            <Card>
              <CardHeader>
                <CardTitle>Data Exports</CardTitle>
                <CardDescription>
                  Configure export settings and download form data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Data export functionality will be available in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="retention">
            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
                <CardDescription>
                  Configure how long form responses are stored
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Advanced retention policy settings will be available in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Compliance;
