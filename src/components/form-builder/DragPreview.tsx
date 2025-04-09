
import React from "react";
import { FormElement } from "@/types/form";
import ElementContent from "./ElementContent";
import { createNewElement } from "@/utils/element-utils";

interface DragPreviewProps {
  elementType: string;
  position: { x: number; y: number };
}

const DragPreview: React.FC<DragPreviewProps> = ({ elementType, position }) => {
  // Create a comprehensive temporary element preview based on the type
  // Pass an empty array as the third argument for existing elements
  const previewElement = createNewElement(elementType, position, []);

  return (
    <div 
      className="absolute border-2 border-dashed border-portico-purple/80 bg-white rounded-md p-4 pointer-events-none shadow-lg"
      style={{
        left: position.x,
        top: position.y,
        width: previewElement.size.width,
        height: 'auto', // Allow height to adapt to content
        zIndex: 100,
        opacity: 0.95,
        animation: 'pulse 2s infinite ease-in-out'
      }}
    >
      <ElementContent element={previewElement} isEditing={false} />
    </div>
  );
};

export default DragPreview;
