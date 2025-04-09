
import { useCallback, useState, useEffect } from "react";
import { FormElement } from "@/types/form";

interface SmartGuideParams {
  orientation: 'horizontal' | 'vertical';
  position: number;
}

interface DistanceParams {
  elementId: string;
  distance: number;
  orientation: 'horizontal' | 'vertical';
}

// Threshold for snapping (in pixels)
const SNAP_THRESHOLD = 10;

export const useSmartGuides = (elements: FormElement[], isDragging: boolean) => {
  const [showSmartGuides, setShowSmartGuides] = useState(false);
  const [guideLines, setGuideLines] = useState<SmartGuideParams[]>([]);
  const [distances, setDistances] = useState<DistanceParams[]>([]);
  
  // Hide guides when not dragging
  useEffect(() => {
    if (!isDragging) {
      setShowSmartGuides(false);
      setGuideLines([]);
      setDistances([]);
    }
  }, [isDragging]);

  // Calculate smart guides when an element is moved
  const calculateSmartGuides = useCallback((movingElementId: string, position: { x: number, y: number }) => {
    const movingElement = elements.find(el => el.id === movingElementId);
    if (!movingElement) return;
    
    const newGuides: SmartGuideParams[] = [];
    const newDistances: DistanceParams[] = [];
    
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
        newGuides.push({ orientation: 'vertical', position: otherLeft });
        newDistances.push({ elementId: otherElement.id, distance: leftDistance, orientation: 'vertical' });
      }
      
      const rightDistance = Math.abs(movingRight - otherRight);
      if (rightDistance < SNAP_THRESHOLD) {
        newGuides.push({ orientation: 'vertical', position: otherRight });
        newDistances.push({ elementId: otherElement.id, distance: rightDistance, orientation: 'vertical' });
      }
      
      const centerXDistance = Math.abs(movingCenterX - otherCenterX);
      if (centerXDistance < SNAP_THRESHOLD) {
        newGuides.push({ orientation: 'vertical', position: otherCenterX });
        newDistances.push({ elementId: otherElement.id, distance: centerXDistance, orientation: 'vertical' });
      }
      
      // Additional vertical alignment: right to left and left to right
      const rightToLeftDistance = Math.abs(movingRight - otherLeft);
      if (rightToLeftDistance < SNAP_THRESHOLD) {
        newGuides.push({ orientation: 'vertical', position: otherLeft });
        newDistances.push({ elementId: otherElement.id, distance: rightToLeftDistance, orientation: 'vertical' });
      }
      
      const leftToRightDistance = Math.abs(movingLeft - otherRight);
      if (leftToRightDistance < SNAP_THRESHOLD) {
        newGuides.push({ orientation: 'vertical', position: otherRight });
        newDistances.push({ elementId: otherElement.id, distance: leftToRightDistance, orientation: 'vertical' });
      }
      
      // Horizontal alignments (top, center, bottom)
      const topDistance = Math.abs(movingTop - otherTop);
      if (topDistance < SNAP_THRESHOLD) {
        newGuides.push({ orientation: 'horizontal', position: otherTop });
        newDistances.push({ elementId: otherElement.id, distance: topDistance, orientation: 'horizontal' });
      }
      
      const bottomDistance = Math.abs(movingBottom - otherBottom);
      if (bottomDistance < SNAP_THRESHOLD) {
        newGuides.push({ orientation: 'horizontal', position: otherBottom });
        newDistances.push({ elementId: otherElement.id, distance: bottomDistance, orientation: 'horizontal' });
      }
      
      const centerYDistance = Math.abs(movingCenterY - otherCenterY);
      if (centerYDistance < SNAP_THRESHOLD) {
        newGuides.push({ orientation: 'horizontal', position: otherCenterY });
        newDistances.push({ elementId: otherElement.id, distance: centerYDistance, orientation: 'horizontal' });
      }
      
      // Additional horizontal alignment: bottom to top and top to bottom
      const bottomToTopDistance = Math.abs(movingBottom - otherTop);
      if (bottomToTopDistance < SNAP_THRESHOLD) {
        newGuides.push({ orientation: 'horizontal', position: otherTop });
        newDistances.push({ elementId: otherElement.id, distance: bottomToTopDistance, orientation: 'horizontal' });
      }
      
      const topToBottomDistance = Math.abs(movingTop - otherBottom);
      if (topToBottomDistance < SNAP_THRESHOLD) {
        newGuides.push({ orientation: 'horizontal', position: otherBottom });
        newDistances.push({ elementId: otherElement.id, distance: topToBottomDistance, orientation: 'horizontal' });
      }
    });
    
    // Also align to grid (multiples of 25px)
    const horizontalGridDistance = position.y % 25;
    if (horizontalGridDistance < SNAP_THRESHOLD || 25 - horizontalGridDistance < SNAP_THRESHOLD) {
      const gridY = Math.round(position.y / 25) * 25;
      newGuides.push({ orientation: 'horizontal', position: gridY });
      newDistances.push({ 
        elementId: 'grid', 
        distance: Math.min(horizontalGridDistance, 25 - horizontalGridDistance), 
        orientation: 'horizontal' 
      });
    }
    
    const verticalGridDistance = position.x % 25;
    if (verticalGridDistance < SNAP_THRESHOLD || 25 - verticalGridDistance < SNAP_THRESHOLD) {
      const gridX = Math.round(position.x / 25) * 25;
      newGuides.push({ orientation: 'vertical', position: gridX });
      newDistances.push({ 
        elementId: 'grid', 
        distance: Math.min(verticalGridDistance, 25 - verticalGridDistance), 
        orientation: 'vertical' 
      });
    }
    
    // Update state
    setShowSmartGuides(newGuides.length > 0);
    setGuideLines(newGuides);
    setDistances(newDistances);
    
  }, [elements]);

  // Auto-nudge position based on guides
  const autoNudgePosition = useCallback((movingElementId: string, position: { x: number, y: number }) => {
    const movingElement = elements.find(el => el.id === movingElementId);
    if (!movingElement) return position;
    
    let { x, y } = position;
    
    // Apply nudging based on closest guide
    if (guideLines.length > 0) {
      // Group distances by orientation
      const horizontalDistances = distances
        .filter(d => d.orientation === 'horizontal')
        .sort((a, b) => a.distance - b.distance);
      
      const verticalDistances = distances
        .filter(d => d.orientation === 'vertical')
        .sort((a, b) => a.distance - b.distance);
      
      // Apply horizontal nudging
      if (horizontalDistances.length > 0) {
        const closestHorizontal = horizontalDistances[0];
        const matchingGuide = guideLines.find(
          g => g.orientation === 'horizontal' && 
          Math.abs(g.position - (closestHorizontal.elementId === 'grid' 
            ? Math.round(y / 25) * 25 
            : g.position)) < 1
        );
        
        if (matchingGuide) {
          // Calculate how to snap based on what part of the element is close to the guide
          const movingTop = y;
          const movingBottom = y + movingElement.size.height;
          const movingCenterY = y + movingElement.size.height / 2;
          
          // Determine which part is closest to the guide
          const topDistance = Math.abs(movingTop - matchingGuide.position);
          const bottomDistance = Math.abs(movingBottom - matchingGuide.position);
          const centerDistance = Math.abs(movingCenterY - matchingGuide.position);
          
          const minDistance = Math.min(topDistance, bottomDistance, centerDistance);
          
          if (minDistance === topDistance) {
            y = matchingGuide.position; // Snap top edge
          } else if (minDistance === bottomDistance) {
            y = matchingGuide.position - movingElement.size.height; // Snap bottom edge
          } else {
            y = matchingGuide.position - movingElement.size.height / 2; // Snap center
          }
        }
      }
      
      // Apply vertical nudging
      if (verticalDistances.length > 0) {
        const closestVertical = verticalDistances[0];
        const matchingGuide = guideLines.find(
          g => g.orientation === 'vertical' && 
          Math.abs(g.position - (closestVertical.elementId === 'grid' 
            ? Math.round(x / 25) * 25 
            : g.position)) < 1
        );
        
        if (matchingGuide) {
          // Calculate how to snap based on what part of the element is close to the guide
          const movingLeft = x;
          const movingRight = x + movingElement.size.width;
          const movingCenterX = x + movingElement.size.width / 2;
          
          // Determine which part is closest to the guide
          const leftDistance = Math.abs(movingLeft - matchingGuide.position);
          const rightDistance = Math.abs(movingRight - matchingGuide.position);
          const centerDistance = Math.abs(movingCenterX - matchingGuide.position);
          
          const minDistance = Math.min(leftDistance, rightDistance, centerDistance);
          
          if (minDistance === leftDistance) {
            x = matchingGuide.position; // Snap left edge
          } else if (minDistance === rightDistance) {
            x = matchingGuide.position - movingElement.size.width; // Snap right edge
          } else {
            x = matchingGuide.position - movingElement.size.width / 2; // Snap center
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
