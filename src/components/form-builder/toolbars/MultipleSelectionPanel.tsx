
import React from "react";
import { Button } from "@/components/ui/button";
import { Group } from "lucide-react";

interface MultipleSelectionPanelProps {
  selectedCount: number;
  onGroup: () => void;
}

const MultipleSelectionPanel: React.FC<MultipleSelectionPanelProps> = ({ 
  selectedCount, 
  onGroup 
}) => {
  return (
    <div className="h-64 border-t border-border p-4 bg-muted/20">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">{selectedCount} elements selected</h3>
          <p className="text-xs text-muted-foreground mt-1">You can group these elements to move them together</p>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" onClick={onGroup}>
            <Group className="h-4 w-4 mr-2" />
            Group Elements
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultipleSelectionPanel;
