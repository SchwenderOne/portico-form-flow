
import { useCallback, useState, useEffect } from "react";
import { FormElement } from "@/types/form";

// Threshold for snapping (in pixels)
const SNAP_THRESHOLD = 10;

export const useSmartGuides = (elements: FormElement[], isDragging: boolean) => {
  const [showSmartGuides, setShowSmartGuides] = useState(false);
  const [guideLines, setGuideLines] = useState<{
    horizontal: number[];
    vertical: number[];
  }>({ horizontal: [], vertical: [] });
  
  const [distances, setDistances] = useState<{
    horizontal: { position: number; distance: number }[];
    vertical: { position: number; distance: number }[];
  }>({ horizontal: [], vertical: [] });
  
  // Hide guides when not dragging
  useEffect(() => {
    if (!isDragging) {
      setShowSmartGuides(false);
      setGuideLines({ horizontal: [], vertical: [] });
      setDistances({ horizontal: [], vertical: [] });
    }
  }, [isDragging]);

  // Calculate smart guides when an element is moved
  const calculateSmartGuides = useCallback((movingElementId: string, position: { x: number, y: number }) => {
    const movingElement = elements.find(el => el.id === movingElementId);
    if (!movingElement) return;
    
    const horizontalGuides: number[] = [];
    const verticalGuides: number[] = [];
    const horizontalDistances: { position: number; distance: number }[] = [];
    const verticalDistances: { position: number; distance: number }[] = [];
    
    // Get the boundaries of the moving element
    const movingLeft = position.x;
    const movingRight = position.x + movingElement.size.width;
    const movingTop = position.y;
    const movingBottom = position.y + movingElement.size.height;
    const movingCenterX = position.x + movingElement.size.width / 2;
    const movingCenterY = position.y + movingElement.size.height / 2;
    
    // Check against each other element
    elements.forEach(otherElement => {
      if (otherElement.id === movingElementId) return;
      
      // Get the boundaries of the other element
      const otherLeft = otherElement.position.x;
      const otherRight = otherElement.position.x + otherElement.size.width;
      const otherTop = otherElement.position.y;
      const otherBottom = otherElement.position.y + otherElement.size.height;
      const otherCenterX = otherElement.position.x + otherElement.size.width / 2;
      const otherCenterY = otherElement.position.y + otherElement.size.height / 2;
      
      // Vertical alignments (left, center, right)
      const leftDistance = Math.abs(movingLeft - otherLeft);
      if (leftDistance < SNAP_THRESHOLD) {
        verticalGuides.push(otherLeft);
        verticalDistances.push({ position: otherLeft, distance: leftDistance });
      }
      
      const rightDistance = Math.abs(movingRight - otherRight);
      if (rightDistance < SNAP_THRESHOLD) {
        verticalGuides.push(otherRight);
        verticalDistances.push({ position: otherRight, distance: rightDistance });
      }
      
      const centerXDistance = Math.abs(movingCenterX - otherCenterX);
      if (centerXDistance < SNAP_THRESHOLD) {
        verticalGuides.push(otherCenterX);
        verticalDistances.push({ position: otherCenterX, distance: centerXDistance });
      }
      
      // Additional vertical alignment: right to left and left to right
      const rightToLeftDistance = Math.abs(movingRight - otherLeft);
      if (rightToLeftDistance < SNAP_THRESHOLD) {
        verticalGuides.push(otherLeft);
        verticalDistances.push({ position: otherLeft, distance: rightToLeftDistance });
      }
      
      const leftToRightDistance = Math.abs(movingLeft - otherRight);
      if (leftToRightDistance < SNAP_THRESHOLD) {
        verticalGuides.push(otherRight);
        verticalDistances.push({ position: otherRight, distance: leftToRightDistance });
      }
      
      // Horizontal alignments (top, center, bottom)
      const topDistance = Math.abs(movingTop - otherTop);
      if (topDistance < SNAP_THRESHOLD) {
        horizontalGuides.push(otherTop);
        horizontalDistances.push({ position: otherTop, distance: topDistance });
      }
      
      const bottomDistance = Math.abs(movingBottom - otherBottom);
      if (bottomDistance < SNAP_THRESHOLD) {
        horizontalGuides.push(otherBottom);
        horizontalDistances.push({ position: otherBottom, distance: bottomDistance });
      }
      
      const centerYDistance = Math.abs(movingCenterY - otherCenterY);
      if (centerYDistance < SNAP_THRESHOLD) {
        horizontalGuides.push(otherCenterY);
        horizontalDistances.push({ position: otherCenterY, distance: centerYDistance });
      }
      
      // Additional horizontal alignment: bottom to top and top to bottom
      const bottomToTopDistance = Math.abs(movingBottom - otherTop);
      if (bottomToTopDistance < SNAP_THRESHOLD) {
        horizontalGuides.push(otherTop);
        horizontalDistances.push({ position: otherTop, distance: bottomToTopDistance });
      }
      
      const topToBottomDistance = Math.abs(movingTop - otherBottom);
      if (topToBottomDistance < SNAP_THRESHOLD) {
        horizontalGuides.push(otherBottom);
        horizontalDistances.push({ position: otherBottom, distance: topToBottomDistance });
      }
    });
    
    // Also align to grid (multiples of 25px)
    const horizontalGridDistance = position.y % 25;
    if (horizontalGridDistance < SNAP_THRESHOLD || 25 - horizontalGridDistance < SNAP_THRESHOLD) {
      const gridY = Math.round(position.y / 25) * 25;
      horizontalGuides.push(gridY);
      horizontalDistances.push({ 
        position: gridY, 
        distance: Math.min(horizontalGridDistance, 25 - horizontalGridDistance)
      });
    }
    
    const verticalGridDistance = position.x % 25;
    if (verticalGridDistance < SNAP_THRESHOLD || 25 - verticalGridDistance < SNAP_THRESHOLD) {
      const gridX = Math.round(position.x / 25) * 25;
      verticalGuides.push(gridX);
      verticalDistances.push({ 
        position: gridX, 
        distance: Math.min(verticalGridDistance, 25 - verticalGridDistance) 
      });
    }
    
    // Update state
    setShowSmartGuides(horizontalGuides.length > 0 || verticalGuides.length > 0);
    setGuideLines({ horizontal: horizontalGuides, vertical: verticalGuides });
    setDistances({ horizontal: horizontalDistances, vertical: verticalDistances });
    
  }, [elements]);

  // Auto-nudge position based on guides
  const autoNudgePosition = useCallback((movingElementId: string, position: { x: number, y: number }) => {
    const movingElement = elements.find(el => el.id === movingElementId);
    if (!movingElement) return position;
    
    let { x, y } = position;
    
    // Apply nudging based on closest guides
    if (guideLines.horizontal.length > 0 || guideLines.vertical.length > 0) {
      // Group distances by orientation
      const horizontalDistances = distances.horizontal.sort((a, b) => a.distance - b.distance);
      const verticalDistances = distances.vertical.sort((a, b) => a.distance - b.distance);
      
      // Apply horizontal nudging
      if (horizontalDistances.length > 0) {
        const closestHorizontal = horizontalDistances[0];
        const matchingGuide = guideLines.horizontal.find(
          position => Math.abs(position - closestHorizontal.position) < 1
        );
        
        if (matchingGuide !== undefined) {
          // Calculate how to snap based on what part of the element is close to the guide
          const movingTop = y;
          const movingBottom = y + movingElement.size.height;
          const movingCenterY = y + movingElement.size.height / 2;
          
          // Determine which part is closest to the guide
          const topDistance = Math.abs(movingTop - matchingGuide);
          const bottomDistance = Math.abs(movingBottom - matchingGuide);
          const centerDistance = Math.abs(movingCenterY - matchingGuide);
          
          const minDistance = Math.min(topDistance, bottomDistance, centerDistance);
          
          if (minDistance === topDistance) {
            y = matchingGuide; // Snap top edge
          } else if (minDistance === bottomDistance) {
            y = matchingGuide - movingElement.size.height; // Snap bottom edge
          } else {
            y = matchingGuide - movingElement.size.height / 2; // Snap center
          }
        }
      }
      
      // Apply vertical nudging
      if (verticalDistances.length > 0) {
        const closestVertical = verticalDistances[0];
        const matchingGuide = guideLines.vertical.find(
          position => Math.abs(position - closestVertical.position) < 1
        );
        
        if (matchingGuide !== undefined) {
          // Calculate how to snap based on what part of the element is close to the guide
          const movingLeft = x;
          const movingRight = x + movingElement.size.width;
          const movingCenterX = x + movingElement.size.width / 2;
          
          // Determine which part is closest to the guide
          const leftDistance = Math.abs(movingLeft - matchingGuide);
          const rightDistance = Math.abs(movingRight - matchingGuide);
          const centerDistance = Math.abs(movingCenterX - matchingGuide);
          
          const minDistance = Math.min(leftDistance, rightDistance, centerDistance);
          
          if (minDistance === leftDistance) {
            x = matchingGuide; // Snap left edge
          } else if (minDistance === rightDistance) {
            x = matchingGuide - movingElement.size.width; // Snap right edge
          } else {
            x = matchingGuide - movingElement.size.width / 2; // Snap center
          }
        }
      }
    }
    
    return { x, y };
  }, [elements, guideLines, distances]);

  return {
    showSmartGuides,
    guideLines,
    distances,
    calculateSmartGuides,
    autoNudgePosition
  };
};
