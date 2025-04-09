
import { useState, useEffect } from "react";
import { FormElement as FormElementType } from "@/types/form";

// Define threshold distances for snapping
const SNAP_THRESHOLD = 10;
const DISTANCE_SHOW_THRESHOLD = 100; // Only show distances for elements close enough
const EQUAL_SPACING_THRESHOLD = 5; // Threshold for detecting equal spacing

export const useSmartGuides = (elements: FormElementType[], isDragging: boolean) => {
  const [showSmartGuides, setShowSmartGuides] = useState(false);
  const [guideLines, setGuideLines] = useState<{horizontal: number[], vertical: number[]}>({
    horizontal: [],
    vertical: []
  });
  const [distances, setDistances] = useState<{
    horizontal: { position: number; distance: number }[];
    vertical: { position: number; distance: number }[];
  }>({
    horizontal: [],
    vertical: []
  });

  // Function to auto-nudge an element position to snap to guides
  const autoNudgePosition = (id: string, position: { x: number, y: number }) => {
    const movingElement = elements.find(el => el.id === id);
    if (!movingElement) return position;
    
    let nudgedPosition = { ...position };
    
    // Calculate key positions for the moving element
    const movingLeft = position.x;
    const movingRight = position.x + movingElement.size.width;
    const movingTop = position.y;
    const movingBottom = position.y + movingElement.size.height;
    const movingCenterX = position.x + movingElement.size.width / 2;
    const movingCenterY = position.y + movingElement.size.height / 2;
    
    // Collect all potential snap points
    const horizontalSnapPoints: { position: number, target: number }[] = [];
    const verticalSnapPoints: { position: number, target: number }[] = [];
    
    elements.forEach(el => {
      if (el.id === id) return;
      
      const elLeft = el.position.x;
      const elRight = el.position.x + el.size.width;
      const elTop = el.position.y;
      const elBottom = el.position.y + el.size.height;
      const elCenterX = el.position.x + el.size.width / 2;
      const elCenterY = el.position.y + el.size.height / 2;
      
      // Check horizontal alignments
      if (Math.abs(movingTop - elTop) < SNAP_THRESHOLD) {
        horizontalSnapPoints.push({ position: movingTop, target: elTop });
      }
      if (Math.abs(movingCenterY - elCenterY) < SNAP_THRESHOLD) {
        horizontalSnapPoints.push({ position: movingCenterY, target: elCenterY });
      }
      if (Math.abs(movingBottom - elBottom) < SNAP_THRESHOLD) {
        horizontalSnapPoints.push({ position: movingBottom, target: elBottom });
      }
      
      // Check vertical alignments
      if (Math.abs(movingLeft - elLeft) < SNAP_THRESHOLD) {
        verticalSnapPoints.push({ position: movingLeft, target: elLeft });
      }
      if (Math.abs(movingCenterX - elCenterX) < SNAP_THRESHOLD) {
        verticalSnapPoints.push({ position: movingCenterX, target: elCenterX });
      }
      if (Math.abs(movingRight - elRight) < SNAP_THRESHOLD) {
        verticalSnapPoints.push({ position: movingRight, target: elRight });
      }
    });
    
    // Find closest snap points
    let closestHorizontal = horizontalSnapPoints.length > 0 
      ? horizontalSnapPoints.reduce((prev, curr) => 
          Math.abs(curr.position - curr.target) < Math.abs(prev.position - prev.target) ? curr : prev
        ) 
      : null;
    
    let closestVertical = verticalSnapPoints.length > 0 
      ? verticalSnapPoints.reduce((prev, curr) => 
          Math.abs(curr.position - curr.target) < Math.abs(prev.position - prev.target) ? curr : prev
        ) 
      : null;
    
    // Apply nudges
    if (closestHorizontal) {
      const diff = closestHorizontal.target - closestHorizontal.position;
      nudgedPosition.y += diff;
    }
    
    if (closestVertical) {
      const diff = closestVertical.target - closestVertical.position;
      nudgedPosition.x += diff;
    }
    
    return nudgedPosition;
  };

  const calculateSmartGuides = (movingId: string, position: { x: number, y: number }) => {
    const movingElement = elements.find(el => el.id === movingId);
    if (!movingElement) return;
    
    const horizontalGuides: number[] = [];
    const verticalGuides: number[] = [];
    const horizontalDistances: { position: number; distance: number }[] = [];
    const verticalDistances: { position: number; distance: number }[] = [];
    
    const movingLeft = position.x;
    const movingRight = position.x + movingElement.size.width;
    const movingTop = position.y;
    const movingBottom = position.y + movingElement.size.height;
    const movingCenterX = position.x + movingElement.size.width / 2;
    const movingCenterY = position.y + movingElement.size.height / 2;
    
    // For detecting equal spacing
    const horizontalGaps: number[] = [];
    const verticalGaps: number[] = [];
    
    elements.forEach(el => {
      if (el.id === movingId) return;
      
      const elLeft = el.position.x;
      const elRight = el.position.x + el.size.width;
      const elTop = el.position.y;
      const elBottom = el.position.y + el.size.height;
      const elCenterX = el.position.x + el.size.width / 2;
      const elCenterY = el.position.y + el.size.height / 2;
      
      // Edge alignments
      if (Math.abs(movingTop - elTop) < SNAP_THRESHOLD) horizontalGuides.push(elTop);
      if (Math.abs(movingBottom - elBottom) < SNAP_THRESHOLD) horizontalGuides.push(elBottom);
      if (Math.abs(movingLeft - elLeft) < SNAP_THRESHOLD) verticalGuides.push(elLeft);
      if (Math.abs(movingRight - elRight) < SNAP_THRESHOLD) verticalGuides.push(elRight);
      
      // Center alignments
      if (Math.abs(movingCenterY - elCenterY) < SNAP_THRESHOLD) horizontalGuides.push(elCenterY);
      if (Math.abs(movingCenterX - elCenterX) < SNAP_THRESHOLD) verticalGuides.push(elCenterX);
      
      // Calculate horizontal distances
      if (Math.abs(movingLeft - elRight) < DISTANCE_SHOW_THRESHOLD) {
        horizontalDistances.push({
          position: (elRight + movingLeft) / 2,
          distance: Math.abs(movingLeft - elRight)
        });
        horizontalGaps.push(Math.abs(movingLeft - elRight));
      }
      
      if (Math.abs(elLeft - movingRight) < DISTANCE_SHOW_THRESHOLD) {
        horizontalDistances.push({
          position: (movingRight + elLeft) / 2,
          distance: Math.abs(elLeft - movingRight)
        });
        horizontalGaps.push(Math.abs(elLeft - movingRight));
      }
      
      // Calculate vertical distances
      if (Math.abs(movingTop - elBottom) < DISTANCE_SHOW_THRESHOLD) {
        verticalDistances.push({
          position: (elBottom + movingTop) / 2,
          distance: Math.abs(movingTop - elBottom)
        });
        verticalGaps.push(Math.abs(movingTop - elBottom));
      }
      
      if (Math.abs(elTop - movingBottom) < DISTANCE_SHOW_THRESHOLD) {
        verticalDistances.push({
          position: (movingBottom + elTop) / 2,
          distance: Math.abs(elTop - movingBottom)
        });
        verticalGaps.push(Math.abs(elTop - movingBottom));
      }
    });
    
    // Check for equal spacing between three or more elements
    if (horizontalGaps.length >= 2) {
      for (let i = 0; i < horizontalGaps.length; i++) {
        for (let j = i + 1; j < horizontalGaps.length; j++) {
          if (Math.abs(horizontalGaps[i] - horizontalGaps[j]) < EQUAL_SPACING_THRESHOLD) {
            // Found equal spacing, highlight it specially
            const equalSpacingDistance = (horizontalGaps[i] + horizontalGaps[j]) / 2;
            horizontalDistances.push({
              position: (position.x + position.x + movingElement.size.width) / 2,
              distance: equalSpacingDistance
            });
          }
        }
      }
    }
    
    if (verticalGaps.length >= 2) {
      for (let i = 0; i < verticalGaps.length; i++) {
        for (let j = i + 1; j < verticalGaps.length; j++) {
          if (Math.abs(verticalGaps[i] - verticalGaps[j]) < EQUAL_SPACING_THRESHOLD) {
            // Found equal spacing, highlight it specially
            const equalSpacingDistance = (verticalGaps[i] + verticalGaps[j]) / 2;
            verticalDistances.push({
              position: (position.y + position.y + movingElement.size.height) / 2,
              distance: equalSpacingDistance
            });
          }
        }
      }
    }
    
    setGuideLines({ horizontal: horizontalGuides, vertical: verticalGuides });
    setDistances({ horizontal: horizontalDistances, vertical: verticalDistances });
    setShowSmartGuides(
      horizontalGuides.length > 0 || 
      verticalGuides.length > 0 || 
      horizontalDistances.length > 0 || 
      verticalDistances.length > 0
    );
  };

  useEffect(() => {
    if (!isDragging) {
      setShowSmartGuides(false);
      setGuideLines({ horizontal: [], vertical: [] });
      setDistances({ horizontal: [], vertical: [] });
    }
  }, [isDragging]);

  return {
    showSmartGuides,
    guideLines,
    distances,
    calculateSmartGuides,
    autoNudgePosition
  };
};
