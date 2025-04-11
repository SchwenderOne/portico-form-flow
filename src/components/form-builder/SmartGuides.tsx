
import React from "react";

interface SmartGuidesProps {
  guides: {
    horizontal: number[];
    vertical: number[];
  };
  distances: {
    horizontal: { position: number; distance: number }[];
    vertical: { position: number; distance: number }[];
  };
}

const SmartGuides: React.FC<SmartGuidesProps> = ({ guides, distances }) => {
  return (
    <div className="smart-guides" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
      {/* Horizontal guides */}
      {guides.horizontal.map((y, index) => (
        <div
          key={`h-${index}`}
          style={{
            position: "absolute",
            top: `${y}px`,
            left: 0,
            right: 0,
            height: "1px",
            backgroundColor: "rgba(0, 120, 255, 0.7)",
            zIndex: 1000,
          }}
        />
      ))}

      {/* Vertical guides */}
      {guides.vertical.map((x, index) => (
        <div
          key={`v-${index}`}
          style={{
            position: "absolute",
            left: `${x}px`,
            top: 0,
            bottom: 0,
            width: "1px",
            backgroundColor: "rgba(0, 120, 255, 0.7)",
            zIndex: 1000,
          }}
        />
      ))}

      {/* Horizontal distance indicators */}
      {distances.horizontal.map((dist, index) => (
        <div
          key={`hd-${index}`}
          style={{
            position: "absolute",
            top: `${dist.position}px`,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            pointerEvents: "none",
          }}
        >
          <div
            className="distance-indicator"
            style={{
              padding: "0 4px",
              fontSize: "10px",
              backgroundColor: "rgba(0, 120, 255, 0.7)",
              color: "white",
              borderRadius: "2px",
            }}
          >
            {dist.distance}px
          </div>
        </div>
      ))}

      {/* Vertical distance indicators */}
      {distances.vertical.map((dist, index) => (
        <div
          key={`vd-${index}`}
          style={{
            position: "absolute",
            left: `${dist.position}px`,
            top: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            pointerEvents: "none",
          }}
        >
          <div
            className="distance-indicator"
            style={{
              padding: "2px 4px",
              fontSize: "10px",
              backgroundColor: "rgba(0, 120, 255, 0.7)",
              color: "white",
              borderRadius: "2px",
              writingMode: "vertical-lr",
              transform: "rotate(180deg)",
            }}
          >
            {dist.distance}px
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmartGuides;
