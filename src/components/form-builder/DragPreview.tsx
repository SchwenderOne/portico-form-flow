
import React from "react";
import { cn } from "@/lib/utils";

interface DragPreviewProps {
  elementType: string;
  position: { x: number; y: number };
}

const DragPreview: React.FC<DragPreviewProps> = ({ elementType, position }) => {
  // Define standard sizes based on element type
  const getPreviewSizeAndContent = () => {
    switch (elementType) {
      case "header":
        return {
          width: 500,
          height: 60,
          content: "Heading Text"
        };
      case "paragraph":
        return {
          width: 500,
          height: 120,
          content: "Paragraph text content will appear here."
        };
      case "text":
        return {
          width: 500,
          height: 80,
          content: "Text Input"
        };
      case "textarea":
        return {
          width: 500,
          height: 120,
          content: "Text Area"
        };
      case "number":
        return {
          width: 500,
          height: 80,
          content: "Number Input"
        };
      case "email":
        return {
          width: 500,
          height: 80,
          content: "Email Input"
        };
      case "select":
        return {
          width: 500,
          height: 80,
          content: "Dropdown Select"
        };
      case "checkbox":
        return {
          width: 500,
          height: 80,
          content: "Checkbox"
        };
      case "radio":
        return {
          width: 500,
          height: 100,
          content: "Radio Group"
        };
      case "date":
        return {
          width: 500,
          height: 80,
          content: "Date Picker"
        };
      default:
        return {
          width: 500,
          height: 80,
          content: "Form Element"
        };
    }
  };

  const { width, height, content } = getPreviewSizeAndContent();

  return (
    <div
      className="absolute pointer-events-none bg-primary/10 border-2 border-dashed border-primary rounded-md flex items-center justify-center"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 100
      }}
    >
      <div className="text-sm text-primary/70 font-medium">
        {content}
      </div>
    </div>
  );
};

export default DragPreview;
