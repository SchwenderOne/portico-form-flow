
import React from "react";
import { Button } from "@/components/ui/button";

interface PortoEmptyStateProps {
  onGenerateWithAI: () => void;
}

const PortoEmptyState: React.FC<PortoEmptyStateProps> = ({ onGenerateWithAI }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <h2 className="text-xl font-semibold mb-2">Design Your Form</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Drag elements from the sidebar or use the AI Assistant to generate a complete form
      </p>
      <Button onClick={onGenerateWithAI}>Generate with AI</Button>
    </div>
  );
};

export default PortoEmptyState;
