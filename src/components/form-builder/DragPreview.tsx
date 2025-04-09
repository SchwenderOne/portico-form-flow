
import React from "react";
import { FormElement } from "@/types/form";
import ElementContent from "./ElementContent";

interface DragPreviewProps {
  elementType: string;
  position: { x: number; y: number };
}

const DragPreview: React.FC<DragPreviewProps> = ({ elementType, position }) => {
  // Create a comprehensive temporary element preview based on the type
  const previewElement: FormElement = {
    id: `preview-${elementType}`,
    type: elementType,
    position: position,
    size: { 
      width: 500, 
      height: elementType === 'header' || elementType === 'paragraph' ? 60 : 
              elementType === 'checkbox' ? 100 : 
              elementType === 'file' ? 120 : 80 
    },
    label: `New ${elementType.charAt(0).toUpperCase() + elementType.slice(1)}`,
    placeholder: elementType === 'file' ? 'Upload file (PDF, PNG)' : 
                elementType === 'date' ? 'Select a date...' : 
                `Enter ${elementType}...`,
    required: false,
    groupId: null,
    helpText: 'Optional help text for this field'
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
    previewElement.validation = { 
      type: 'email',
      message: 'Please enter a valid email address'
    };
  } else if (elementType === 'phone') {
    previewElement.label = 'Phone Number';
    previewElement.placeholder = '(123) 456-7890';
  } else if (elementType === 'number') {
    previewElement.label = 'Number Input';
    previewElement.placeholder = 'Enter a number';
    previewElement.validation = {
      type: 'number',
      min: 0,
      max: 100,
      message: 'Please enter a number between 0 and 100'
    };
  }

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
