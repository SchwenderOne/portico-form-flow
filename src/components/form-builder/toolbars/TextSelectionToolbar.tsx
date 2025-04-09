
import React, { useRef, useEffect, useState } from "react";
import { Bold, Italic, Link, Underline } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface TextSelectionToolbarProps {
  selectionRect: DOMRect;
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onLink: (url?: string) => void;
  selectedText: string;
}

const TextSelectionToolbar: React.FC<TextSelectionToolbarProps> = ({
  selectionRect,
  onBold,
  onItalic,
  onUnderline,
  onLink,
  selectedText
}) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [linkUrl, setLinkUrl] = useState("");

  // Calculate position when selectionRect changes
  useEffect(() => {
    if (toolbarRef.current) {
      const toolbarRect = toolbarRef.current.getBoundingClientRect();
      
      // Position the toolbar centered above the selection
      const newLeft = selectionRect.left + (selectionRect.width / 2) - (toolbarRect.width / 2);
      const newTop = selectionRect.top - toolbarRect.height - 8; // 8px gap
      
      // Adjust if toolbar would be off-screen
      const adjustedLeft = Math.max(8, Math.min(newLeft, window.innerWidth - toolbarRect.width - 8));
      const adjustedTop = newTop < 8 ? selectionRect.bottom + 8 : newTop;
      
      setPosition({ 
        left: adjustedLeft, 
        top: adjustedTop 
      });
    }
  }, [selectionRect]);

  // Prevent click propagation
  const handleToolbarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkUrl.trim()) {
      onLink(linkUrl);
      setLinkUrl("");
    }
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
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className="p-1.5 rounded-md hover:bg-portico-gray-soft text-portico-gray-dark hover:text-portico-purple transition-colors"
              onClick={onBold}
              aria-label="Bold"
            >
              <Bold size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Bold</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className="p-1.5 rounded-md hover:bg-portico-gray-soft text-portico-gray-dark hover:text-portico-purple transition-colors"
              onClick={onItalic}
              aria-label="Italic"
            >
              <Italic size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Italic</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className="p-1.5 rounded-md hover:bg-portico-gray-soft text-portico-gray-dark hover:text-portico-purple transition-colors"
              onClick={onUnderline}
              aria-label="Underline"
            >
              <Underline size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Underline</p>
          </TooltipContent>
        </Tooltip>
        
        <Popover>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <button 
                  className="p-1.5 rounded-md hover:bg-portico-gray-soft text-portico-gray-dark hover:text-portico-purple transition-colors"
                  aria-label="Add Link"
                >
                  <Link size={16} />
                </button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Add Link</p>
            </TooltipContent>
          </Tooltip>
          <PopoverContent className="w-64 p-3">
            <form onSubmit={handleLinkSubmit} className="space-y-3">
              <div className="space-y-1">
                <label htmlFor="link-url" className="text-xs font-medium">
                  URL
                </label>
                <input 
                  id="link-url"
                  type="url" 
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full border rounded-md text-sm px-2 py-1.5"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" size="sm">Apply</Button>
              </div>
            </form>
          </PopoverContent>
        </Popover>
      </div>
    </TooltipProvider>
  );
};

export default TextSelectionToolbar;
