
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onRefresh: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onRefresh }) => {
  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-0">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <BarChart2 className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl">No analytics data yet</CardTitle>
        <CardDescription>
          Once your form receives submissions, you'll see performance insights here.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <div className="mt-2 mb-6 max-w-md text-sm text-muted-foreground">
          <p>
            Analytics are generated based on real user interactions with your form. 
            Share your form with users to start collecting data.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button onClick={onRefresh}>Check for Data</Button>
      </CardFooter>
    </Card>
  );
};

export default EmptyState;
