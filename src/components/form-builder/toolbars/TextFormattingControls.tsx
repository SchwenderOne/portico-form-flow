
import React from "react";
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Link, 
  Type,
  Palette
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TextFormattingControlsProps {
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onStrikethrough?: () => void;
  onLink: (url?: string) => void;
  onFontSize?: (size: string) => void;
  onTextColor?: (color: string) => void;
  selectedText?: string;
}

const TextFormattingControls: React.FC<TextFormattingControlsProps> = ({
  onBold,
  onItalic,
  onUnderline,
  onStrikethrough,
  onLink,
  onFontSize,
  onTextColor,
  selectedText,
}) => {
  const [linkUrl, setLinkUrl] = React.useState("");
  const [fontSizePopoverOpen, setFontSizePopoverOpen] = React.useState(false);
  const [colorPopoverOpen, setColorPopoverOpen] = React.useState(false);
  
  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkUrl.trim()) {
      onLink(linkUrl);
      setLinkUrl("");
    }
  };

  const handleFontSizeChange = (size: string) => {
    if (onFontSize) {
      onFontSize(size);
      setFontSizePopoverOpen(false);
    }
  };

  const handleColorChange = (color: string) => {
    if (onTextColor) {
      onTextColor(color);
      setColorPopoverOpen(false);
    }
  };

  const commonButtonClasses = "p-1.5 rounded-md hover:bg-portico-gray-soft text-portico-gray-dark hover:text-portico-purple transition-colors";

  return (
    <>
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
      
      {onStrikethrough && (
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
      )}
      
      {onFontSize && (
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
      )}
      
      {onTextColor && (
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
      )}
      
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
                className="w-full"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="sm">Apply</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default TextFormattingControls;
