
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import SubmissionsManager from "@/components/submissions/SubmissionsManager";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";

const Submissions = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <AppLayout>
      <Card className="border-none shadow-none">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Form Submissions</CardTitle>
              <CardDescription className="mt-1">
                View, filter, and manage all form submissions
              </CardDescription>
            </div>
            <div className="text-sm text-muted-foreground flex items-center">
              <Info className="h-4 w-4 mr-1" />
              Showing all submissions
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList>
              <TabsTrigger value="all">All Submissions</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>

          <SubmissionsManager />
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Submissions;
