
import React from "react";
import { Grip } from "lucide-react";

interface ElementDragHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

const ElementDragHandle: React.FC<ElementDragHandleProps> = ({ onMouseDown }) => {
  return (
    <div 
      className="form-element-handle absolute -top-7 left-1/2 transform -translate-x-1/2 bg-white p-1.5 rounded-t-md shadow-md border border-gray-200 cursor-move hover:bg-portico-purple/20 transition-colors"
      onMouseDown={onMouseDown}
    >
      <Grip className="h-4 w-4 text-portico-purple/80" />
    </div>
  );
};

export default ElementDragHandle;
