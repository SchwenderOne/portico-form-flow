
import React from "react";

interface SmartGuidesProps {
  guides: {
    horizontal: number[];
    vertical: number[];
  };
  distances?: {
    horizontal: { position: number; distance: number }[];
    vertical: { position: number; distance: number }[];
  };
}

const SmartGuides: React.FC<SmartGuidesProps> = ({ guides, distances }) => {
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

      {/* Distance measurements - horizontal */}
      {distances?.horizontal.map((item, index) => (
        <div
          key={`hd-${index}-${item.position}`}
          className="absolute flex items-center justify-center bg-portico-purple/80 text-white text-xs px-1 py-0.5 rounded-sm pointer-events-none z-20"
          style={{ 
            left: item.position, 
            top: item.position + item.distance/2, 
            transform: 'translateX(-50%)' 
          }}
        >
          {item.distance}px
        </div>
      ))}

      {/* Distance measurements - vertical */}
      {distances?.vertical.map((item, index) => (
        <div
          key={`vd-${index}-${item.position}`}
          className="absolute flex items-center justify-center bg-portico-purple/80 text-white text-xs px-1 py-0.5 rounded-sm pointer-events-none z-20"
          style={{ 
            left: item.position + item.distance/2, 
            top: item.position,
            transform: 'translateY(-50%)' 
          }}
        >
          {item.distance}px
        </div>
      ))}
    </>
  );
};

export default SmartGuides;
