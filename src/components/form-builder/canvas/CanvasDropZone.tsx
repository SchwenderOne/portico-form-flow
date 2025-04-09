
import React, { useState, useEffect } from "react";
import { FormElement } from "@/types/form";
import DragPreview from "../DragPreview";

interface CanvasDropZoneProps {
  onDrop: (type: string, position: { x: number; y: number }) => void;
  isDragOver: boolean;
  setIsDragOver: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: (e: React.MouseEvent) => void;
  existingElements: FormElement[];
  children: React.ReactNode;
}

const CanvasDropZone: React.FC<CanvasDropZoneProps> = ({
  onDrop,
  isDragOver,
  setIsDragOver,
  onClick,
  existingElements,
  children
}) => {
  const [previewElement, setPreviewElement] = useState<{
    type: string;
    position: { x: number; y: number };
  } | null>(null);

  // Clean up preview when component unmounts
  useEffect(() => {
    return () => {
      setPreviewElement(null);
    };
  }, []);

  // Handle dragover event to show the drop location
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
    
    // Get element type from dataTransfer
    const elementType = e.dataTransfer.getData("elementType");
    const action = e.dataTransfer.getData("action");
    
    // Only show preview for new elements, not for moving existing ones
    if (elementType && action !== "move") {
      const dropZoneRect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - dropZoneRect.left;
      const y = e.clientY - dropZoneRect.top;
      
      // Snap to grid (25px)
      const snappedX = Math.round(x / 25) * 25;
      const snappedY = Math.round(y / 25) * 25;
      
      setPreviewElement({
        type: elementType,
        position: { x: snappedX, y: snappedY }
      });
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
    setPreviewElement(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setPreviewElement(null);
    
    const dropZoneRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - dropZoneRect.left;
    const y = e.clientY - dropZoneRect.top;
    
    // Snap to grid (25px)
    const snappedX = Math.round(x / 25) * 25;
    const snappedY = Math.round(y / 25) * 25;
    
    // Check if this is a move operation
    const elementId = e.dataTransfer.getData("elementId");
    const action = e.dataTransfer.getData("action");
    const elementType = e.dataTransfer.getData("elementType");
    
    if (action === "move" && elementId) {
      // Handle element movement within the canvas - this is handled by the context
      // This event is triggered but the drag/drop logic is handled separately
    } else if (elementType) {
      // Handle new element drop
      onDrop(elementType, { x: snappedX, y: snappedY });
    }
  };

  return (
    <div
      className={`relative w-full h-full bg-gray-50 overflow-auto grid-pattern`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={onClick}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(150, 150, 150, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(150, 150, 150, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '25px 25px',
      }}
    >
      {/* Canvas content */}
      {children}
      
      {/* Preview of element being dragged */}
      {isDragOver && previewElement && (
        <DragPreview
          elementType={previewElement.type}
          position={previewElement.position}
        />
      )}
    </div>
  );
};

export default CanvasDropZone;
