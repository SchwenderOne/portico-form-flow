
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import SchedulerManager from "@/components/scheduler/SchedulerManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Scheduler = () => {
  return (
    <AppLayout>
      <Card className="border-none shadow-none">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">Scheduler & Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <SchedulerManager />
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Scheduler;
