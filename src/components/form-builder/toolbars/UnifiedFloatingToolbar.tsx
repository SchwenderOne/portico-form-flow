
import React, { useRef, useEffect, useState } from "react";
import { FormElement } from "@/types/form";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import TextFormattingControls from "./TextFormattingControls";
import ElementActions from "./ElementActions";
import { toast } from "sonner";

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

  // Use the selection rectangle if text is selected, otherwise use the element rectangle
  useEffect(() => {
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
      
      // Adjust if toolbar would be off-screen
      const adjustedLeft = Math.max(8, Math.min(newLeft, window.innerWidth - toolbarRect.width - 8));
      const adjustedTop = newTop < 8 ? (isTextSelected && selectionRect ? selectionRect.bottom + 8 : elementRect.bottom + 8) : newTop;
      
      setPosition({ 
        left: adjustedLeft, 
        top: adjustedTop 
      });
    }
  }, [elementRect, isTextSelected, selectionRect]);

  // Prevent click propagation
  const handleToolbarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div
        ref={toolbarRef}
        className="fixed z-50 flex items-center gap-1 p-1 bg-white/95 backdrop-blur-sm border border-border rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 duration-100"
        style={{ 
          top: `${position.top}px`, 
          left: `${position.left}px` 
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
