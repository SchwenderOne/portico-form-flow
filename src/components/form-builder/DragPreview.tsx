
import React from "react";
import { FormElement } from "@/types/form";
import ElementContent from "./ElementContent";

interface DragPreviewProps {
  elementType: string;
  position: { x: number; y: number };
}

const DragPreview: React.FC<DragPreviewProps> = ({ elementType, position }) => {
  // Create a temporary element preview based on the type
  const previewElement: FormElement = {
    id: `preview-${elementType}`,
    type: elementType,
    position: position,
    size: { 
      width: 500, 
      height: elementType === 'header' || elementType === 'paragraph' ? 60 : 
              elementType === 'checkbox' ? 50 : 
              elementType === 'file' ? 120 : 80 
    },
    label: `New ${elementType.charAt(0).toUpperCase() + elementType.slice(1)}`,
    placeholder: elementType === 'file' ? 'Upload file (PDF, PNG)' : 
                elementType === 'date' ? 'Select a date...' : 
                `Enter ${elementType}...`,
    required: false,
    groupId: null
  };

  // Add specific properties based on element type
  if (elementType === 'header') {
    (previewElement as any).content = 'New Form Header';
  } else if (elementType === 'paragraph') {
    (previewElement as any).content = 'Add your paragraph text here...';
  } else if (elementType === 'checkbox' || elementType === 'radio') {
    (previewElement as any).options = ['Option 1', 'Option 2', 'Option 3'];
  } else if (elementType === 'select') {
    (previewElement as any).options = ['Select an option', 'Option 1', 'Option 2', 'Option 3'];
  } else if (elementType === 'email') {
    previewElement.label = 'Email Address';
    previewElement.placeholder = 'example@domain.com';
    (previewElement as any).validation = 'email';
  }

  return (
    <div 
      className="absolute border-2 border-dashed border-portico-purple/50 bg-white/90 rounded-md p-4 pointer-events-none shadow-lg"
      style={{
        left: position.x,
        top: position.y,
        width: previewElement.size.width,
        height: previewElement.size.height,
        zIndex: 100,
        opacity: 0.9,
        transition: 'transform 0.1s ease-out, opacity 0.2s ease-out',
        animation: 'scale-in 0.2s ease-out'
      }}
    >
      <ElementContent element={previewElement} isEditing={false} />
    </div>
  );
};

export default DragPreview;
