
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onCreateAutomation: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateAutomation }) => {
  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-0">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Zap className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl">No automations yet</CardTitle>
        <CardDescription>
          Create your first automation to automatically trigger actions based on form events.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <div className="mt-2 mb-6 max-w-md text-sm text-muted-foreground">
          <p>
            Automations let you perform actions when specific events occur in your forms.
            For example, send an email when a form is submitted or tag submissions based on responses.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button onClick={onCreateAutomation}>Create Automation</Button>
      </CardFooter>
    </Card>
  );
};

export default EmptyState;
