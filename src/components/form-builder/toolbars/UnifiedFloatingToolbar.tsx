
import React, { useRef, useEffect, useState } from "react";
import {
  Bold, Italic, Underline, Link, Copy, Trash2, 
  AlignLeft, AlignCenter, AlignRight, ChevronDown, 
  Type, PaintBucket, Strikethrough
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCollaboration } from "@/context/CollaborationContext";
import { FormElement } from "@/types/form";

interface UnifiedFloatingToolbarProps {
  elementId: string;
  elementRect: DOMRect;
  isTextSelected?: boolean;
  selectionRect?: DOMRect | null;
  selectedText?: string;
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onStrikethrough?: () => void;
  onLink: (url?: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onAlign?: (id: string, alignment: 'left' | 'center' | 'right') => void;
  onFontSize?: (size: string) => void;
  onTextColor?: (color: string) => void;
  element?: FormElement;
}

const UnifiedFloatingToolbar: React.FC<UnifiedFloatingToolbarProps> = ({
  elementId,
  elementRect,
  isTextSelected = false,
  selectionRect = null,
  selectedText = '',
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
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const { isElementLocked, getElementEditor } = useCollaboration();

  // Check if this element is being edited by another user
  const isLocked = element ? isElementLocked(element.id) : false;
  const editor = element ? getElementEditor(element.id) : null;

  // Calculate position when elementRect or selectionRect changes
  useEffect(() => {
    if (toolbarRef.current) {
      const toolbarRect = toolbarRef.current.getBoundingClientRect();
      const targetRect = isTextSelected && selectionRect ? selectionRect : elementRect;
      
      // Position the toolbar centered above the element or selection
      const newLeft = targetRect.left + (targetRect.width / 2) - (toolbarRect.width / 2);
      const newTop = targetRect.top - toolbarRect.height - 8; // 8px gap
      
      // Adjust if toolbar would be off-screen
      const adjustedLeft = Math.max(8, Math.min(newLeft, window.innerWidth - toolbarRect.width - 8));
      const adjustedTop = newTop < 8 ? targetRect.bottom + 8 : newTop;
      
      setPosition({ 
        left: adjustedLeft, 
        top: adjustedTop 
      });
    }
  }, [elementRect, selectionRect, isTextSelected, showAdvancedOptions]);

  // Prevent click propagation
  const handleToolbarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkUrl.trim()) {
      onLink(linkUrl);
      setLinkUrl("");
    }
  };

  // Determine which sections to show based on context
  const showTextFormatting = true; // Always show basic text formatting options
  const showLayoutOptions = !isTextSelected && onAlign; // Only show layout options when whole element is selected

  if (isLocked) {
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
          <div className="px-2 py-1 flex items-center gap-2 text-amber-500">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="text-xs font-medium">Being edited by {editor?.displayName || 'another user'}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">This element is currently being edited</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    );
  }

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
        {/* Layout/alignment options */}
        {showLayoutOptions && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="p-1.5 rounded-md hover:bg-portico-gray-soft text-portico-gray-dark hover:text-portico-purple transition-colors"
                  onClick={() => onAlign && onAlign(elementId, 'left')}
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
                  className="p-1.5 rounded-md hover:bg-portico-gray-soft text-portico-gray-dark hover:text-portico-purple transition-colors"
                  onClick={() => onAlign && onAlign(elementId, 'center')}
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
                  className="p-1.5 rounded-md hover:bg-portico-gray-soft text-portico-gray-dark hover:text-portico-purple transition-colors"
                  onClick={() => onAlign && onAlign(elementId, 'right')}
                  aria-label="Align Right"
                >
                  <AlignRight size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Align Right</p>
              </TooltipContent>
            </Tooltip>
            
            <div className="w-px h-4 bg-border mx-0.5" />
          </>
        )}
        
        {/* Text formatting section */}
        {showTextFormatting && (
          <>
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
            
            {onStrikethrough && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className="p-1.5 rounded-md hover:bg-portico-gray-soft text-portico-gray-dark hover:text-portico-purple transition-colors"
                    onClick={onStrikethrough}
                    aria-label="Strikethrough"
                  >
                    <Strikethrough size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Strikethrough</p>
                </TooltipContent>
              </Tooltip>
            )}
            
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
          </>
        )}
        
        {/* Advanced options dropdown */}
        {(onFontSize || onTextColor) && (
          <>
            <div className="w-px h-4 bg-border mx-0.5" />
            
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className="p-1.5 rounded-md hover:bg-portico-gray-soft text-portico-gray-dark hover:text-portico-purple transition-colors"
                      aria-label="More Formatting Options"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">More Formatting Options</p>
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  {onFontSize && (
                    <DropdownMenuItem onClick={() => onFontSize('small')}>
                      <Type className="mr-2 h-4 w-4" />
                      <span>Font Size</span>
                    </DropdownMenuItem>
                  )}
                  {onTextColor && (
                    <DropdownMenuItem onClick={() => onTextColor('#9b87f5')}>
                      <PaintBucket className="mr-2 h-4 w-4" />
                      <span>Text Color</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        
        {/* Common actions section */}
        <div className="w-px h-4 bg-border mx-0.5" />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className="p-1.5 rounded-md hover:bg-portico-gray-soft text-portico-gray-dark hover:text-portico-purple transition-colors"
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
