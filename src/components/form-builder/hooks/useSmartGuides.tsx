
import { useState, useEffect } from "react";
import { FormElement as FormElementType } from "@/types/form";

export const useSmartGuides = (elements: FormElementType[], isDragging: boolean) => {
  const [showSmartGuides, setShowSmartGuides] = useState(false);
  const [guideLines, setGuideLines] = useState<{horizontal: number[], vertical: number[]}>({
    horizontal: [],
    vertical: []
  });

  const calculateSmartGuides = (movingId: string, position: { x: number, y: number }) => {
    const movingElement = elements.find(el => el.id === movingId);
    if (!movingElement) return;
    
    const horizontalGuides: number[] = [];
    const verticalGuides: number[] = [];
    
    const movingLeft = position.x;
    const movingRight = position.x + movingElement.size.width;
    const movingTop = position.y;
    const movingBottom = position.y + movingElement.size.height;
    const movingCenterX = position.x + movingElement.size.width / 2;
    const movingCenterY = position.y + movingElement.size.height / 2;
    
    elements.forEach(el => {
      if (el.id === movingId) return;
      
      const elLeft = el.position.x;
      const elRight = el.position.x + el.size.width;
      const elTop = el.position.y;
      const elBottom = el.position.y + el.size.height;
      const elCenterX = el.position.x + el.size.width / 2;
      const elCenterY = el.position.y + el.size.height / 2;
      
      if (Math.abs(movingTop - elTop) < 10) horizontalGuides.push(elTop);
      if (Math.abs(movingCenterY - elCenterY) < 10) horizontalGuides.push(elCenterY);
      if (Math.abs(movingBottom - elBottom) < 10) horizontalGuides.push(elBottom);
      
      if (Math.abs(movingLeft - elLeft) < 10) verticalGuides.push(elLeft);
      if (Math.abs(movingCenterX - elCenterX) < 10) verticalGuides.push(elCenterX);
      if (Math.abs(movingRight - elRight) < 10) verticalGuides.push(elRight);
    });
    
    setGuideLines({ horizontal: horizontalGuides, vertical: verticalGuides });
    setShowSmartGuides(horizontalGuides.length > 0 || verticalGuides.length > 0);
  };

  useEffect(() => {
    if (!isDragging) {
      setShowSmartGuides(false);
      setGuideLines({ horizontal: [], vertical: [] });
    }
  }, [isDragging]);

  return {
    showSmartGuides,
    guideLines,
    calculateSmartGuides
  };
};
