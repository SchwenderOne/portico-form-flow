
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

  // Add some styling based on element type
  const getPreviewStyles = () => {
    switch (elementType) {
      case 'header':
        return 'bg-purple-50 border-purple-300';
      case 'paragraph':
        return 'bg-blue-50 border-blue-300';
      case 'text':
      case 'email':
      case 'number':
        return 'bg-green-50 border-green-300';
      case 'checkbox':
      case 'radio':
        return 'bg-amber-50 border-amber-300';
      case 'select':
      case 'date':
        return 'bg-teal-50 border-teal-300';
      case 'file':
        return 'bg-rose-50 border-rose-300';
      default:
        return 'bg-gray-50 border-gray-300';
    }
  };

  return (
    <div 
      className={`absolute border-2 border-dashed rounded-md p-4 pointer-events-none shadow-lg ${getPreviewStyles()}`}
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
      <div className="bg-white/70 backdrop-blur-sm p-2 rounded">
        <p className="text-xs font-semibold mb-1">Adding: {elementType}</p>
        <ElementContent element={previewElement} isEditing={false} />
      </div>
    </div>
  );
};

export default DragPreview;
