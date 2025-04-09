
import React from "react";
import { Type } from "lucide-react";

const NoSelectionPanel: React.FC = () => {
  return (
    <div className="h-64 border-t border-border p-4 bg-muted/20">
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <Type className="h-8 w-8 mb-2" />
        <p>Select an element to edit its properties</p>
      </div>
    </div>
  );
};

export default NoSelectionPanel;
