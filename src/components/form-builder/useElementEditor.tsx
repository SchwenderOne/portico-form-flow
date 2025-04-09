
import { useState, useEffect, useRef } from "react";

export const useElementEditor = (elementId: string) => {
  const [isEditing, setIsEditing] = useState(false);
  const [elementRect, setElementRect] = useState<DOMRect | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        elementRef.current && 
        !elementRef.current.contains(event.target as Node) &&
        isEditing
      ) {
        setIsEditing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    
    if (elementRef.current) {
      setElementRect(elementRef.current.getBoundingClientRect());
    }
  };

  const handleBold = () => {
    console.log('Bold applied to element:', elementId);
    // Implementation would go here
  };

  const handleItalic = () => {
    console.log('Italic applied to element:', elementId);
    // Implementation would go here
  };

  const handleLink = (url?: string) => {
    console.log('Link applied to element:', elementId, url);
    // Implementation would go here
  };

  return {
    isEditing,
    elementRect,
    elementRef,
    handleDoubleClick,
    handleBold,
    handleItalic,
    handleLink,
    setIsEditing
  };
};
