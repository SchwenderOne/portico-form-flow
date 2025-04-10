
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import SubmissionsManager from "@/components/submissions/SubmissionsManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Submissions = () => {
  return (
    <AppLayout>
      <Card className="border-none shadow-none">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">Form Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <SubmissionsManager />
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Submissions;
