import React, { useRef, useEffect, useState, useCallback } from "react";
import { FormElement } from "@/types/form";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import TextFormattingControls from "./TextFormattingControls";
import ElementActions from "./ElementActions";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";

interface UnifiedFloatingToolbarProps {
  elementId: string;
  elementRect: DOMRect;
  isTextSelected: boolean;
  selectionRect: DOMRect | null;
  selectedText: string;
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onStrikethrough: () => void;
  onLink: (url?: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onAlign: (id: string, alignment: 'left' | 'center' | 'right') => void;
  onFontSize: (size: string) => void;
  onTextColor: (color: string) => void;
  element: FormElement;
}

const UnifiedFloatingToolbar: React.FC<UnifiedFloatingToolbarProps> = ({
  elementId,
  elementRect,
  isTextSelected,
  selectionRect,
  selectedText,
  onBold,
  onItalic,
  onUnderline,
  onStrikethrough,
  onLink,
  onDuplicate,
  onDelete,
  onAlign,
  onFontSize,
  onTextColor,
  element
}) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Set a unique toolbar ID to help manage instances
  const toolbarId = `toolbar-${elementId}`;
  
  // Define a debounced position update function
  const updatePosition = useCallback(() => {
    if (toolbarRef.current) {
      const toolbarRect = toolbarRef.current.getBoundingClientRect();
      let newLeft: number;
      let newTop: number;
      
      if (isTextSelected && selectionRect) {
        // Position above the selected text
        newLeft = selectionRect.left + (selectionRect.width / 2) - (toolbarRect.width / 2);
        newTop = selectionRect.top - toolbarRect.height - 8; // 8px gap
      } else {
        // Position above the element
        newLeft = elementRect.left + (elementRect.width / 2) - (toolbarRect.width / 2);
        newTop = elementRect.top - toolbarRect.height - 8;
      }
      
      // Account for scroll position
      const scrollX = window.scrollX || document.documentElement.scrollLeft;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      
      // Keep toolbar within viewport bounds
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Adjust if toolbar would be off-screen horizontally
      newLeft = Math.max(8, Math.min(newLeft, viewportWidth - toolbarRect.width - 8));
      
      // Adjust if toolbar would be off-screen vertically
      if (newTop < 8) {
        // If there's not enough space above, position below instead
        if (isTextSelected && selectionRect) {
          newTop = selectionRect.bottom + 8;
        } else {
          newTop = elementRect.bottom + 8;
        }
      }
      
      setPosition({ 
        left: newLeft, 
        top: newTop 
      });
    }
  }, [elementRect, isTextSelected, selectionRect]);
  
  // Debounce the position updates to prevent flickering
  const debouncedUpdatePosition = useDebounce(updatePosition, 50);

  // Clean up existing toolbars and update position when props change
  useEffect(() => {
    // First, remove any other floating toolbars
    const existingToolbars = document.querySelectorAll('.floating-toolbar');
    existingToolbars.forEach(toolbar => {
      if (toolbar.id !== toolbarId && toolbar.parentNode) {
        toolbar.parentNode.removeChild(toolbar);
      }
    });
    
    // Update position
    debouncedUpdatePosition();
    
    // Update position on window resize and scroll
    const handleWindowChange = () => {
      debouncedUpdatePosition();
    };
    
    window.addEventListener('resize', handleWindowChange);
    window.addEventListener('scroll', handleWindowChange);
    
    return () => {
      window.removeEventListener('resize', handleWindowChange);
      window.removeEventListener('scroll', handleWindowChange);
    };
  }, [elementRect, isTextSelected, selectionRect, debouncedUpdatePosition, toolbarId]);

  // Prevent click propagation
  const handleToolbarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div
        id={toolbarId}
        ref={toolbarRef}
        className="floating-toolbar fixed z-50 flex items-center gap-1 p-1 bg-white/95 backdrop-blur-sm border border-border rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 duration-100"
        style={{ 
          top: `${position.top}px`, 
          left: `${position.left}px`,
          transform: 'translateZ(0)' // Force hardware acceleration for smoother positioning
        }}
        onClick={handleToolbarClick}
      >
        {/* Text formatting tools */}
        <TextFormattingControls 
          onBold={onBold}
          onItalic={onItalic}
          onUnderline={onUnderline}
          onStrikethrough={onStrikethrough}
          onLink={onLink}
          onFontSize={onFontSize}
          onTextColor={onTextColor}
          selectedText={selectedText}
        />
        
        <div className="w-px h-4 bg-border mx-0.5" />
        
        {/* Element actions */}
        <ElementActions 
          elementId={elementId}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
          onAlign={onAlign}
          showAlignmentControls={true}
        />
      </div>
    </TooltipProvider>
  );
};

export default UnifiedFloatingToolbar;
