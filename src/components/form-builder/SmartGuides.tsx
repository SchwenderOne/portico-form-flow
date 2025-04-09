
import React from "react";

interface SmartGuidesProps {
  guides: {
    horizontal: number[];
    vertical: number[];
  };
}

const SmartGuides: React.FC<SmartGuidesProps> = ({ guides }) => {
  return (
    <>
      {/* Horizontal guides */}
      {guides.horizontal.map((position, index) => (
        <div
          key={`h-${index}-${position}`}
          className="absolute left-0 w-full h-[1px] bg-portico-purple pointer-events-none z-10"
          style={{ top: position }}
        />
      ))}
      
      {/* Vertical guides */}
      {guides.vertical.map((position, index) => (
        <div
          key={`v-${index}-${position}`}
          className="absolute top-0 w-[1px] h-full bg-portico-purple pointer-events-none z-10"
          style={{ left: position }}
        />
      ))}
    </>
  );
};

export default SmartGuides;
