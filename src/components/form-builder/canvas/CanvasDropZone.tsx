
import React, { ReactNode } from "react";
import { FormElement } from "@/types/form";

interface CanvasDropZoneProps {
  onDrop: (type: string, position: { x: number, y: number }) => void;
  isDragOver: boolean;
  setIsDragOver: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: (e: React.MouseEvent) => void;
  children: ReactNode;
  existingElements: FormElement[];
}

const CanvasDropZone: React.FC<CanvasDropZoneProps> = ({
  onDrop,
  isDragOver,
  setIsDragOver,
  onClick,
  children,
  existingElements
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Only set isDragOver to false if we're leaving the dropzone
    // Not just moving between child elements
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    // Get position relative to the canvas
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / 25) * 25;  // Snap to grid
    const y = Math.round((e.clientY - rect.top) / 25) * 25;   // Snap to grid
    
    console.log("Drop event detected with element type:", e.dataTransfer.getData("elementType"));
    
    // Calculate a valid position that avoids overlaps
    const calculatedPosition = {
      x: Math.max(0, x),
      y: Math.max(0, y)
    };
    
    console.log("Calculated position:", calculatedPosition);
    
    // Check if we're dropping an existing element (for repositioning)
    const elementId = e.dataTransfer.getData("elementId");
    if (elementId) {
      // This would be handled by a reposition function
      console.log("Repositioning element:", elementId);
      return;
    }
    
    // Handle new element drop
    const elementType = e.dataTransfer.getData("elementType");
    if (elementType) {
      onDrop(elementType, calculatedPosition);
    }
  };

  return (
    <div
      className={`flex-1 relative overflow-auto grid-background ${
        isDragOver ? "dragging-over" : ""
      }`}
      style={{ 
        height: "100%", 
        minHeight: "500px",
        minWidth: "500px"
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CanvasDropZone;
