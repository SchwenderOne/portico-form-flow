
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
  
  // Track if we're moving an existing element
  const [isMovingElement, setIsMovingElement] = useState(false);
  const [movingElementId, setMovingElementId] = useState<string | null>(null);

  // Clean up preview when component unmounts
  useEffect(() => {
    return () => {
      setPreviewElement(null);
      setIsMovingElement(false);
      setMovingElementId(null);
    };
  }, []);

  // Calculate snap position to grid
  const calculateSnapPosition = (x: number, y: number) => {
    // Snap to grid (25px)
    const snappedX = Math.round(x / 25) * 25;
    const snappedY = Math.round(y / 25) * 25;
    return { x: snappedX, y: snappedY };
  };

  // Handle dragover event to show the drop location
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
    
    // Get element information from dataTransfer
    const elementType = e.dataTransfer.getData("elementType");
    const elementId = e.dataTransfer.getData("elementId");
    const action = e.dataTransfer.getData("action");
    
    // Get drop position
    const dropZoneRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - dropZoneRect.left;
    const y = e.clientY - dropZoneRect.top;
    
    // Calculate snapped position
    const snappedPosition = calculateSnapPosition(x, y);
    
    // Check if this is a move or new element
    if (action === "move" && elementId) {
      setIsMovingElement(true);
      setMovingElementId(elementId);
      // For existing elements, we'll use the element's appearance
      setPreviewElement(null);
    } else if (elementType) {
      setIsMovingElement(false);
      setMovingElementId(null);
      // For new elements, show the preview
      setPreviewElement({
        type: elementType,
        position: snappedPosition
      });
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
    setPreviewElement(null);
    setIsMovingElement(false);
    setMovingElementId(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setPreviewElement(null);
    setIsMovingElement(false);
    setMovingElementId(null);
    
    // Get drop position and calculate snap
    const dropZoneRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - dropZoneRect.left;
    const y = e.clientY - dropZoneRect.top;
    
    const { x: snappedX, y: snappedY } = calculateSnapPosition(x, y);
    
    // Check what kind of operation we're doing
    const elementId = e.dataTransfer.getData("elementId");
    const action = e.dataTransfer.getData("action");
    const elementType = e.dataTransfer.getData("elementType");
    
    if (action === "move" && elementId) {
      // We don't need to do anything here as the parent component handles element movement
    } else if (elementType) {
      // Handle new element drop
      onDrop(elementType, { x: snappedX, y: snappedY });
    }
  };

  return (
    <div
      className={`relative w-full h-full bg-gray-50 overflow-auto grid-pattern ${
        isDragOver ? 'border-2 border-dashed border-primary/40' : ''
      }`}
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
      {isDragOver && previewElement && !isMovingElement && (
        <DragPreview
          elementType={previewElement.type}
          position={previewElement.position}
        />
      )}
      
      {/* When moving an existing element, we don't show a preview */}
    </div>
  );
};

export default CanvasDropZone;
