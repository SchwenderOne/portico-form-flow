
import React, { useRef, useEffect, useState } from "react";
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Link, 
  Copy, 
  Trash2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Palette
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FormElement } from "@/types/form";
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
  const [linkUrl, setLinkUrl] = useState("");
  const [fontSizePopoverOpen, setFontSizePopoverOpen] = useState(false);
  const [colorPopoverOpen, setColorPopoverOpen] = useState(false);

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

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkUrl.trim()) {
      onLink(linkUrl);
      setLinkUrl("");
      toast.success("Link added");
    }
  };

  const handleFontSizeChange = (size: string) => {
    onFontSize(size);
    setFontSizePopoverOpen(false);
    toast.success(`Font size changed to ${size}`);
  };

  const handleColorChange = (color: string) => {
    onTextColor(color);
    setColorPopoverOpen(false);
    toast.success("Text color changed");
  };

  const commonButtonClasses = "p-1.5 rounded-md hover:bg-portico-gray-soft text-portico-gray-dark hover:text-portico-purple transition-colors";

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
        <Tooltip>
          <TooltipTrigger asChild>
            <button className={commonButtonClasses} onClick={onBold} aria-label="Bold">
              <Bold size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Bold</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button className={commonButtonClasses} onClick={onItalic} aria-label="Italic">
              <Italic size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Italic</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button className={commonButtonClasses} onClick={onUnderline} aria-label="Underline">
              <Underline size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Underline</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button className={commonButtonClasses} onClick={onStrikethrough} aria-label="Strikethrough">
              <Strikethrough size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Strikethrough</p>
          </TooltipContent>
        </Tooltip>
        
        <div className="w-px h-4 bg-border mx-0.5" />
        
        {/* Font size */}
        <Popover open={fontSizePopoverOpen} onOpenChange={setFontSizePopoverOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <button className={commonButtonClasses} aria-label="Font Size">
                  <Type size={16} />
                </button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Font Size</p>
            </TooltipContent>
          </Tooltip>
          <PopoverContent className="w-40 p-2">
            <div className="grid grid-cols-2 gap-1">
              <Button size="sm" variant="ghost" className="text-xs" onClick={() => handleFontSizeChange("1")}>
                Small
              </Button>
              <Button size="sm" variant="ghost" className="text-xs" onClick={() => handleFontSizeChange("3")}>
                Medium
              </Button>
              <Button size="sm" variant="ghost" className="text-xs" onClick={() => handleFontSizeChange("5")}>
                Large
              </Button>
              <Button size="sm" variant="ghost" className="text-xs" onClick={() => handleFontSizeChange("7")}>
                X-Large
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Text color */}
        <Popover open={colorPopoverOpen} onOpenChange={setColorPopoverOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <button className={commonButtonClasses} aria-label="Text Color">
                  <Palette size={16} />
                </button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Text Color</p>
            </TooltipContent>
          </Tooltip>
          <PopoverContent className="w-40 p-2">
            <div className="grid grid-cols-4 gap-1">
              <button 
                className="w-8 h-8 rounded-md bg-black hover:opacity-80 transition-opacity"
                onClick={() => handleColorChange("#000000")}
                aria-label="Black"
              />
              <button 
                className="w-8 h-8 rounded-md bg-blue-500 hover:opacity-80 transition-opacity"
                onClick={() => handleColorChange("#3b82f6")}
                aria-label="Blue"
              />
              <button 
                className="w-8 h-8 rounded-md bg-red-500 hover:opacity-80 transition-opacity"
                onClick={() => handleColorChange("#ef4444")}
                aria-label="Red"
              />
              <button 
                className="w-8 h-8 rounded-md bg-green-500 hover:opacity-80 transition-opacity"
                onClick={() => handleColorChange("#22c55e")}
                aria-label="Green"
              />
              <button 
                className="w-8 h-8 rounded-md bg-purple-500 hover:opacity-80 transition-opacity"
                onClick={() => handleColorChange("#a855f7")}
                aria-label="Purple"
              />
              <button 
                className="w-8 h-8 rounded-md bg-amber-500 hover:opacity-80 transition-opacity"
                onClick={() => handleColorChange("#f59e0b")}
                aria-label="Amber"
              />
              <button 
                className="w-8 h-8 rounded-md bg-pink-500 hover:opacity-80 transition-opacity"
                onClick={() => handleColorChange("#ec4899")}
                aria-label="Pink"
              />
              <button 
                className="w-8 h-8 rounded-md bg-gray-500 hover:opacity-80 transition-opacity"
                onClick={() => handleColorChange("#6b7280")}
                aria-label="Gray"
              />
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Text link */}
        <Popover>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <button className={commonButtonClasses} aria-label="Add Link">
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
                <Input 
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
        
        <div className="w-px h-4 bg-border mx-0.5" />
        
        {/* Alignment options */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className={commonButtonClasses} 
              onClick={() => onAlign(elementId, 'left')}
              aria-label="Align Left"
            >
              <AlignLeft size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Align Left</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className={commonButtonClasses} 
              onClick={() => onAlign(elementId, 'center')}
              aria-label="Align Center"
            >
              <AlignCenter size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Align Center</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className={commonButtonClasses} 
              onClick={() => onAlign(elementId, 'right')}
              aria-label="Align Right"
            >
              <AlignRight size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Align Right</p>
          </TooltipContent>
        </Tooltip>
        
        <Separator orientation="vertical" className="mx-0.5 h-4" />
        
        {/* Element actions */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className={commonButtonClasses} 
              onClick={() => onDuplicate(elementId)}
              aria-label="Duplicate"
            >
              <Copy size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Duplicate</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className="p-1.5 rounded-md hover:bg-portico-gray-soft text-portico-gray-dark hover:text-destructive transition-colors"
              onClick={() => onDelete(elementId)}
              aria-label="Delete"
            >
              <Trash2 size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Delete</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default UnifiedFloatingToolbar;
