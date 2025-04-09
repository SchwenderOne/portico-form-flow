
import React from "react";
import { Grip } from "lucide-react";

interface ElementDragHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

const ElementDragHandle: React.FC<ElementDragHandleProps> = ({ onMouseDown }) => {
  return (
    <div 
      className="form-element-handle"
      onMouseDown={onMouseDown}
    >
      <Grip className="h-3 w-3 text-muted-foreground mx-auto mt-1" />
    </div>
  );
};

export default ElementDragHandle;
