
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
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
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
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
      onDrop={handleDrop}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CanvasDropZone;
