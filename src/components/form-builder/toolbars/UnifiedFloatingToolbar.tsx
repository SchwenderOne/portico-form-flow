
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Link, 
  Trash2, 
  Copy, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Type,
  Palette,
  Highlighter,
  Superscript,
  Subscript,
  MousePointerClick
} from 'lucide-react';
import { FormElement } from '@/types/form';

interface UnifiedFloatingToolbarProps {
  elementId: string;
  elementRect: DOMRect;
  isTextSelected: boolean;
  selectionRect: DOMRect | null;
  selectedText: string | null;
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onStrikethrough: () => void;
  onLink: (url: string) => void;
  onDuplicate: (elementId: string) => void;
  onDelete: (elementId: string) => void;
  onAlign: (elementId: string, alignment: 'left' | 'center' | 'right') => void;
  onFontSize?: (size: string) => void;
  onTextColor?: (color: string) => void;
  onBackgroundColor?: (color: string) => void;
  onTextAlign?: (align: 'left' | 'center' | 'right' | 'justify') => void;
  onFontFamily?: (font: string) => void;
  onTextTransform?: (transform: 'superscript' | 'subscript') => void;
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
  onBackgroundColor,
  onTextAlign,
  onFontFamily,
  onTextTransform,
  element,
}) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
  
  // Font size options
  const fontSizes = [
    { value: '1', label: 'X-Small' },
    { value: '2', label: 'Small' },
    { value: '3', label: 'Normal' },
    { value: '4', label: 'Large' },
    { value: '5', label: 'X-Large' },
    { value: '6', label: 'XX-Large' },
    { value: '7', label: 'XXX-Large' },
  ];
  
  // Font family options
  const fontFamilies = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Trebuchet MS', label: 'Trebuchet MS' },
    { value: 'Verdana', label: 'Verdana' },
  ];
  
  // Color options for text and background
  const colors = [
    { value: '#000000', label: 'Black' },
    { value: '#333333', label: 'Dark Gray' },
    { value: '#666666', label: 'Gray' },
    { value: '#999999', label: 'Light Gray' },
    { value: '#ffffff', label: 'White' },
    { value: '#ff0000', label: 'Red' },
    { value: '#00ff00', label: 'Green' },
    { value: '#0000ff', label: 'Blue' },
    { value: '#ffff00', label: 'Yellow' },
    { value: '#ff00ff', label: 'Magenta' },
    { value: '#00ffff', label: 'Cyan' },
    { value: '#ffa500', label: 'Orange' },
    { value: '#800080', label: 'Purple' },
    { value: '#008000', label: 'Dark Green' },
    { value: '#800000', label: 'Maroon' },
    { value: '#000080', label: 'Navy' },
  ];
  
  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLink(linkUrl);
    setIsLinkPopoverOpen(false);
    setLinkUrl('');
  };
  
  // Determine position for text formatting toolbar
  const textToolbarStyle = selectionRect
    ? {
        position: 'absolute',
        top: `${selectionRect.top - elementRect.top - 40}px`,
        left: `${selectionRect.left - elementRect.left + selectionRect.width / 2 - 100}px`,
      }
    : {
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%) translateY(-100%)',
      };
  
  // Determine position for element toolbar
  const elementToolbarStyle = {
    position: 'absolute',
    top: '-40px',
    right: '0',
  };
  
  return (
    <>
      {isTextSelected && (
        <div
          className="bg-white shadow-md rounded-md p-1 flex gap-1 z-[9999] border"
          style={textToolbarStyle as React.CSSProperties}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBold}>
                  <Bold className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bold</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onItalic}>
                  <Italic className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Italic</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onUnderline}>
                  <Underline className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Underline</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onStrikethrough}>
                  <Strikethrough className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Strikethrough</TooltipContent>
            </Tooltip>
            
            {onTextTransform && (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onTextTransform('superscript')}>
                      <Superscript className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Superscript</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onTextTransform('subscript')}>
                      <Subscript className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Subscript</TooltipContent>
                </Tooltip>
              </>
            )}
            
            <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Link className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Link</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <PopoverContent className="w-80">
                <form onSubmit={handleLinkSubmit} className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="link">URL</Label>
                    <Input
                      id="link"
                      placeholder="https://example.com"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" size="sm">Insert Link</Button>
                  </div>
                </form>
              </PopoverContent>
            </Popover>
            
            {onTextAlign && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onTextAlign('left')}>
                    <AlignLeft className="h-4 w-4 mr-2" /> Left
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onTextAlign('center')}>
                    <AlignCenter className="h-4 w-4 mr-2" /> Center
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onTextAlign('right')}>
                    <AlignRight className="h-4 w-4 mr-2" /> Right
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onTextAlign('justify')}>
                    <AlignJustify className="h-4 w-4 mr-2" /> Justify
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {onFontSize && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Type className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {fontSizes.map((size) => (
                    <DropdownMenuItem key={size.value} onClick={() => onFontSize(size.value)}>
                      {size.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {onFontFamily && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MousePointerClick className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {fontFamilies.map((font) => (
                    <DropdownMenuItem 
                      key={font.value} 
                      onClick={() => onFontFamily(font.value)}
                      style={{ fontFamily: font.value }}
                    >
                      {font.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {onTextColor && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Palette className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="grid grid-cols-4 gap-1 p-1">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center"
                        style={{ backgroundColor: color.value }}
                        onClick={() => onTextColor(color.value)}
                        title={color.label}
                      />
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {onBackgroundColor && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Highlighter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="grid grid-cols-4 gap-1 p-1">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center"
                        style={{ backgroundColor: color.value }}
                        onClick={() => onBackgroundColor(color.value)}
                        title={color.label}
                      />
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </TooltipProvider>
        </div>
      )}
      
      <div
        className="bg-white shadow-md rounded-md p-1 flex gap-1 z-[9999] border"
        style={elementToolbarStyle as React.CSSProperties}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => onDuplicate(elementId)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Duplicate</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-red-500 hover:text-red-700" 
                onClick={() => onDelete(elementId)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};

export default UnifiedFloatingToolbar;
