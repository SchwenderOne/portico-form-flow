
import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
  className?: string;
  label?: string;
};

// Extended color palette with categorized design-friendly options
const colorPalettes = {
  brand: [
    "#9b87f5", // Purple (Portico default)
    "#6e59a5", // Dark Purple
    "#e5deff", // Soft Purple
    "#f1f0fb", // Soft Gray
  ],
  primary: [
    "#1EAEDB", // Blue
    "#0EA5E9", // Sky blue
    "#10b981", // Green
    "#d3e4fd", // Soft Blue
  ],
  accent: [
    "#F97316", // Orange
    "#f43f5e", // Pink
    "#ffdee2", // Soft Pink
    "#fec6a1", // Soft Orange
  ],
  neutral: [
    "#8E9196", // Gray
    "#000000", // Black
    "#ffffff", // White
    "#f3f3f3", // Light Gray
  ],
  ui: [
    "#ea384c", // Red
    "#fef7cd", // Soft Yellow
    "#f2fce2", // Soft Green
    "#ccc",    // Light Gray
  ]
};

export function ColorPicker({ color, onChange, className, label }: ColorPickerProps) {
  const [inputColor, setInputColor] = useState(color);
  const [activeTab, setActiveTab] = useState<string>("brand");

  // Update the input value when the color prop changes
  useEffect(() => {
    setInputColor(color);
  }, [color]);

  // Validate hex color format
  const isValidHexColor = (hex: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  };

  const handleColorChange = (newColor: string) => {
    // Validate hex color format
    if (isValidHexColor(newColor)) {
      onChange(newColor);
      setInputColor(newColor);
      
      // Show success toast for color change
      if (label) {
        toast.success(`${label} updated to ${newColor}`, {
          description: "Your color changes are applied",
          duration: 1500,
        });
      }
    } else {
      toast.error("Invalid color format", {
        description: "Please use a valid hex color (e.g. #9b87f5)",
        duration: 3000,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setInputColor(value);
    
    // Add # if missing
    if (value && !value.startsWith('#')) {
      value = '#' + value;
    }
  };

  const handleInputBlur = () => {
    let value = inputColor;
    
    // Add # if missing
    if (value && !value.startsWith('#')) {
      value = '#' + value;
      setInputColor(value);
    }
    
    // Final validation on blur
    if (isValidHexColor(value)) {
      handleColorChange(value);
    } else {
      // If invalid, revert to the current valid color
      setInputColor(color);
      toast.error("Invalid color format", {
        description: "Reverted to the last valid color",
        duration: 2000,
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "h-8 w-8 rounded-md border border-input flex items-center justify-center overflow-hidden",
            className
          )}
          style={{ backgroundColor: color }}
          aria-label={label ? `Select ${label}` : "Select color"}
          type="button" // Prevent form submission
        >
          {/* Show color preview with a checkered background for transparency */}
          <div className="absolute inset-0 rounded-md" style={{ 
            backgroundImage: `
              linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee),
              linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee)
            `,
            backgroundSize: '10px 10px',
            backgroundPosition: '0 0, 5px 5px',
            opacity: color.toLowerCase() === '#ffffff' ? 1 : 0
          }}/>
          <div className="absolute inset-0 rounded-md" style={{ backgroundColor: color }}/>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3">
        <div className="space-y-3">
          {label && <Label className="text-xs font-medium">{label}</Label>}
          
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
              className="h-8 w-12 cursor-pointer border border-input rounded-md"
              aria-label={label ? `Color picker for ${label}` : "Color picker"}
            />
            <div className="flex-1">
              <Input
                type="text"
                value={inputColor}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                placeholder="#000000"
                aria-label={label ? `Color code for ${label}` : "Color code"}
              />
            </div>
          </div>
          
          <Tabs defaultValue="brand" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-5 h-7 mb-2">
              <TabsTrigger value="brand" className="text-xs">Brand</TabsTrigger>
              <TabsTrigger value="primary" className="text-xs">Primary</TabsTrigger>
              <TabsTrigger value="accent" className="text-xs">Accent</TabsTrigger>
              <TabsTrigger value="neutral" className="text-xs">Neutral</TabsTrigger>
              <TabsTrigger value="ui" className="text-xs">UI</TabsTrigger>
            </TabsList>
            
            {Object.entries(colorPalettes).map(([paletteName, colors]) => (
              <TabsContent key={paletteName} value={paletteName} className="m-0 pt-1">
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((presetColor) => (
                    <button
                      key={`${paletteName}-${presetColor}`}
                      className={cn(
                        "h-10 w-10 rounded-md border border-input",
                        color.toLowerCase() === presetColor.toLowerCase() && "ring-2 ring-primary ring-offset-1"
                      )}
                      style={{ backgroundColor: presetColor }}
                      onClick={() => handleColorChange(presetColor)}
                      aria-label={`Color: ${presetColor}`}
                      type="button" // Prevent form submission
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  );
}
