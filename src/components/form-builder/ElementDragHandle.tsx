
import React from "react";
import { Grip } from "lucide-react";

interface ElementDragHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

const ElementDragHandle: React.FC<ElementDragHandleProps> = ({ onMouseDown }) => {
  return (
    <div 
      className="form-element-handle absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-1 rounded-t-md shadow-sm border border-gray-200 cursor-move hover:bg-portico-purple/10 transition-colors"
      onMouseDown={onMouseDown}
    >
      <Grip className="h-3 w-3 text-muted-foreground" />
    </div>
  );
};

export default ElementDragHandle;
