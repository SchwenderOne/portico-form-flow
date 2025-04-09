
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import SecuritySettings from "@/components/settings/SecuritySettings";
import { Card, CardContent } from "@/components/ui/card";

const Security = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Security</h1>
          <p className="text-muted-foreground mt-2">
            Manage your security settings and authentication preferences
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <SecuritySettings />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Security;
