
import React from "react";
import { Check, Globe, FileEdit, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const GettingStarted = () => {
  const steps = [
    {
      title: "Create your first form",
      description: "Start with a template or build from scratch",
      icon: FileEdit,
    },
    {
      title: "Customize your branding",
      description: "Add your logo, colors, and fonts",
      icon: Globe,
    },
    {
      title: "Distribute your form",
      description: "Share via email, link, or embed on your website",
      icon: Send,
    },
    {
      title: "Collect and analyze responses",
      description: "View submissions and export data",
      icon: Check,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="prose max-w-none dark:prose-invert">
        <h2>Welcome to Portico</h2>
        <p>
          Portico is a SaaS form builder platform focused on regulated industries. This guide will help you get started with creating your first form and understanding the key features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">{step.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-lg bg-muted p-4">
        <h3 className="text-lg font-medium mb-2">Pro Tip</h3>
        <p className="text-sm text-muted-foreground">
          Use our AI assistant to generate form questions based on your use case.
          Look for the wand icon in the form builder to try it out!
        </p>
      </div>
    </div>
  );
};
