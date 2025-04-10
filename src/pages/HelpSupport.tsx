
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Faq } from "@/components/help/Faq";
import { ContactSupport } from "@/components/help/ContactSupport";
import { Documentation } from "@/components/help/Documentation";
import { GettingStarted } from "@/components/help/GettingStarted";

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState("getting-started");

  return (
    <AppLayout>
      <div className="container py-6 max-w-5xl">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl">Help & Support</CardTitle>
            <CardDescription>
              Get help with Portico or contact our support team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="contact">Contact Support</TabsTrigger>
              </TabsList>
              <TabsContent value="getting-started" className="mt-6">
                <GettingStarted />
              </TabsContent>
              <TabsContent value="documentation" className="mt-6">
                <Documentation />
              </TabsContent>
              <TabsContent value="faq" className="mt-6">
                <Faq />
              </TabsContent>
              <TabsContent value="contact" className="mt-6">
                <ContactSupport />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default HelpSupport;
