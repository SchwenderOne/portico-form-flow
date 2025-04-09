
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type ColorPickerWithSwatchesProps = {
  color: string;
  onChange: (color: string) => void;
  className?: string;
  label?: string;
};

// Color palette with design-friendly options
const PRESET_COLORS = [
  // Primary brand colors
  "#9b87f5", // Purple (Portico default)
  "#1EAEDB", // Blue
  "#10b981", // Green
  "#F97316", // Orange
  "#f43f5e", // Pink
  
  // Accent colors
  "#6e59a5", // Dark Purple
  "#0EA5E9", // Sky blue
  "#8E9196", // Neutral Gray
  "#000000", // Black
  "#FFFFFF", // White
  
  // Soft colors
  "#e5deff", // Soft Purple
  "#d3e4fd", // Soft Blue
  "#fec6a1", // Soft Orange
  "#ffdee2", // Soft Pink
  "#f1f0fb", // Soft Gray
];

export function ColorPickerWithSwatches({ 
  color, 
  onChange, 
  className, 
  label 
}: ColorPickerWithSwatchesProps) {
  const [inputColor, setInputColor] = useState(color);
  const [isOpen, setIsOpen] = useState(false);

  const validateAndUpdateColor = (newColor: string) => {
    // Basic validation for hex color format (3 or 6 digits)
    const isValidHex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(newColor);
    
    if (isValidHex) {
      onChange(newColor);
      setInputColor(newColor);
      setIsOpen(false);
    } else {
      toast.error("Invalid color format", {
        description: "Please use a valid hex color (e.g., #9b87f5)",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputColor(value.startsWith('#') ? value : `#${value}`);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "h-10 w-10 rounded-md border border-input flex items-center justify-center",
            "transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            className
          )}
          style={{ 
            backgroundColor: color,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)" 
          }}
          aria-label={label || "Select color"}
          type="button" // Prevent form submission
        />
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="start" sideOffset={5}>
        <div className="space-y-4">
          {label && <Label className="text-sm font-medium">{label}</Label>}
          
          <div className="space-y-2">
            <Label htmlFor="hex-color" className="text-xs">Hex Color</Label>
            <div className="flex items-center gap-2">
              <div 
                className="h-8 w-8 rounded-md border"
                style={{ backgroundColor: inputColor }}
              />
              <div className="flex-1 flex items-center">
                <span className="text-sm mr-1">#</span>
                <Input
                  id="hex-color"
                  value={inputColor.replace('#', '')}
                  onChange={(e) => setInputColor(`#${e.target.value}`)}
                  className="flex-1"
                  placeholder="Enter hex value"
                  maxLength={6}
                />
              </div>
              <Button 
                size="sm" 
                onClick={() => validateAndUpdateColor(inputColor)}
              >
                Apply
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs">Color Picker</Label>
            <input
              type="color"
              value={color}
              onChange={(e) => validateAndUpdateColor(e.target.value)}
              className="w-full h-10 cursor-pointer rounded-md border border-input"
              aria-label="Color picker"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs">Color Presets</Label>
            <div className="grid grid-cols-5 gap-2">
              {PRESET_COLORS.map((presetColor) => (
                <button
                  key={presetColor}
                  className={cn(
                    "h-8 w-full rounded-md border transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
                    color.toUpperCase() === presetColor.toUpperCase() && "ring-2 ring-primary ring-offset-2"
                  )}
                  style={{ 
                    backgroundColor: presetColor,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                  }}
                  onClick={() => validateAndUpdateColor(presetColor)}
                  aria-label={`Select color: ${presetColor}`}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
