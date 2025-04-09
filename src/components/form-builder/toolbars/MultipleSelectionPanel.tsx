
import React from "react";
import { Button } from "@/components/ui/button";
import { Group, Ungroup } from "lucide-react";

interface MultipleSelectionPanelProps {
  selectedCount: number;
  onGroup: () => void;
  onUngroup: () => void;
}

const MultipleSelectionPanel: React.FC<MultipleSelectionPanelProps> = ({
  selectedCount,
  onGroup,
  onUngroup
}) => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="text-sm">
        <span className="font-medium">{selectedCount} elements selected</span>
      </div>
      
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onGroup}
          className="flex items-center gap-1.5"
        >
          <Group className="h-4 w-4" />
          <span>Group Elements</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onUngroup}
          className="flex items-center gap-1.5"
        >
          <Ungroup className="h-4 w-4" />
          <span>Ungroup Elements</span>
        </Button>
      </div>
    </div>
  );
};

export default MultipleSelectionPanel;
