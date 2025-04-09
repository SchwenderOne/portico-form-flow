
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import DragPreview from "./DragPreview";

interface CanvasDropZoneProps {
  onDrop: (type: string, position: { x: number, y: number }) => void;
  isDragOver: boolean;
  setIsDragOver: (isDragOver: boolean) => void;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const CanvasDropZone: React.FC<CanvasDropZoneProps> = ({ 
  onDrop, 
  isDragOver, 
  setIsDragOver, 
  children,
  onClick
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [previewPosition, setPreviewPosition] = useState<{ x: number, y: number } | null>(null);
  const [draggedElementType, setDraggedElementType] = useState<string | null>(null);

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
    const x = Math.round((e.clientX - canvasRect.left) / 25) * 25;
    const y = Math.round((e.clientY - canvasRect.top) / 25) * 25;
    
    console.log("Calculated position:", { x, y });
    onDrop(elementType, { x, y });
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
        setPreviewPosition({ x, y });
        
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
      
      {/* Show drag preview when dragging over the canvas */}
      {previewPosition && draggedElementType && (
        <DragPreview 
          elementType={draggedElementType} 
          position={previewPosition} 
        />
      )}
    </div>
  );
};

export default CanvasDropZone;
