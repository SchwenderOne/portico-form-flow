
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import DragPreview from "../DragPreview";
import { FormElement } from "@/types/form";
import { findValidPosition } from "@/utils/element-utils";

interface CanvasDropZoneProps {
  onDrop: (type: string, position: { x: number, y: number }) => void;
  isDragOver: boolean;
  setIsDragOver: (isDragOver: boolean) => void;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  existingElements?: FormElement[]; // Added to check for overlaps
}

const CanvasDropZone: React.FC<CanvasDropZoneProps> = ({ 
  onDrop, 
  isDragOver, 
  setIsDragOver, 
  children,
  onClick,
  existingElements = []
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [previewPosition, setPreviewPosition] = useState<{ x: number, y: number } | null>(null);
  const [draggedElementType, setDraggedElementType] = useState<string | null>(null);
  const [isValidDropPosition, setIsValidDropPosition] = useState(true);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setPreviewPosition(null);
    setDraggedElementType(null);
    
    const elementType = e.dataTransfer.getData("elementType");
    console.log("Drop event detected with element type:", elementType);
    
    if (!elementType || !canvasRef.current) {
      console.log("Missing element type or canvas ref");
      return;
    }
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    let x = Math.round((e.clientX - canvasRect.left) / 25) * 25;
    let y = Math.round((e.clientY - canvasRect.top) / 25) * 25;
    
    // Find a valid position that doesn't overlap
    const validPosition = findValidPosition(x, y, elementType, existingElements);
    
    console.log("Calculated position:", validPosition);
    onDrop(elementType, validPosition);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDragOver) setIsDragOver(true);
    e.dataTransfer.dropEffect = "copy";
    
    // Update preview position for the element
    if (canvasRef.current) {
      const elementType = e.dataTransfer.getData("elementType") || draggedElementType;
      if (elementType) {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const x = Math.round((e.clientX - canvasRect.left) / 25) * 25;
        const y = Math.round((e.clientY - canvasRect.top) / 25) * 25;
        
        // Check if this would be a valid drop position
        const validPosition = findValidPosition(x, y, elementType, existingElements);
        setIsValidDropPosition(validPosition.x === x && validPosition.y === y);
        
        setPreviewPosition(validPosition);
        
        // Store the element type if we haven't already
        if (!draggedElementType) {
          setDraggedElementType(elementType);
        }
      }
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setPreviewPosition(null);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    // Capture the element type on first entry
    const elementType = e.dataTransfer.getData("elementType");
    if (elementType) {
      setDraggedElementType(elementType);
    }
  };

  return (
    <div 
      ref={canvasRef}
      className={cn(
        "form-canvas min-h-full w-full p-4 relative bg-white",
        "grid-background", // Added class for enhanced grid
        isDragOver && "bg-portico-purple/5 outline-dashed outline-2 outline-portico-purple/30"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onClick={onClick}
    >
      {children}
      
      {/* Show enhanced drag preview when dragging over the canvas */}
      {previewPosition && draggedElementType && (
        <DragPreview 
          elementType={draggedElementType} 
          position={previewPosition} 
        />
      )}
      
      {/* Optionally, show a visual indicator if position is invalid */}
      {previewPosition && !isValidDropPosition && (
        <div 
          className="absolute bg-red-500/20 border-2 border-red-500/50 rounded-md z-30 pointer-events-none"
          style={{
            left: previewPosition.x,
            top: previewPosition.y,
            width: 500,
            height: 80,
          }}
        />
      )}
    </div>
  );
};

export default CanvasDropZone;
