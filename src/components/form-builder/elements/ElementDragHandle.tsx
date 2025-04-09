
import React from "react";
import { Grip } from "lucide-react";

interface ElementDragHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

const ElementDragHandle: React.FC<ElementDragHandleProps> = ({ onMouseDown }) => {
  return (
    <div 
      className="form-element-handle absolute -top-7 left-1/2 transform -translate-x-1/2 bg-white p-1.5 rounded-t-md shadow-md border border-gray-200 cursor-move hover:bg-portico-purple/20 transition-colors group"
      onMouseDown={onMouseDown}
    >
      <div className="relative flex items-center">
        <Grip className="h-4 w-4 text-portico-purple/80 group-hover:text-portico-purple" />
        <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap bg-black/70 text-white text-xs py-1 px-2 rounded pointer-events-none -top-8 left-1/2 transform -translate-x-1/2">
          Drag to move
        </span>
      </div>
    </div>
  );
};

export default ElementDragHandle;
