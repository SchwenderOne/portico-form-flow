
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { SubscriptionPlans } from "@/components/subscription/SubscriptionPlans";
import { CurrentPlan } from "@/components/subscription/CurrentPlan";
import { PaymentHistory } from "@/components/subscription/PaymentHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Subscription = () => {
  const [activeTab, setActiveTab] = useState("plans");

  return (
    <AppLayout>
      <div className="container py-6 max-w-5xl">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl">Subscription Management</CardTitle>
            <CardDescription>
              Manage your subscription plan and payment information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
                <TabsTrigger value="current">Current Plan</TabsTrigger>
                <TabsTrigger value="history">Payment History</TabsTrigger>
              </TabsList>
              <TabsContent value="plans" className="mt-6">
                <SubscriptionPlans />
              </TabsContent>
              <TabsContent value="current" className="mt-6">
                <CurrentPlan />
              </TabsContent>
              <TabsContent value="history" className="mt-6">
                <PaymentHistory />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Subscription;
