
import React from "react";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

const AIAssistTab: React.FC = () => {
  return (
    <div className="p-4 h-48 overflow-y-auto">
      <div className="space-y-4">
        <div className="bg-portico-purple/10 p-3 rounded-md">
          <h3 className="text-sm font-medium flex items-center text-portico-purple">
            <Wand2 className="h-4 w-4 mr-1" />
            AI Form Suggestions
          </h3>
          <p className="text-xs mt-1">Use AI to enhance your form field</p>
        </div>

        <div className="space-y-2">
          <Button size="sm" className="w-full">
            Suggest Improvements
          </Button>
          <Button size="sm" variant="outline" className="w-full">
            Generate Validation Rules
          </Button>
          <Button size="sm" variant="outline" className="w-full">
            Optimize for Accessibility
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistTab;
