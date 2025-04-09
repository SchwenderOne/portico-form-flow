
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
  className?: string;
  label?: string;
};

// Extended color palette with more design-friendly options
const presetColors = [
  "#9b87f5", // Purple (Portico default)
  "#1EAEDB", // Blue
  "#F97316", // Orange
  "#0EA5E9", // Sky blue
  "#10b981", // Green
  "#f43f5e", // Pink
  "#8E9196", // Gray
  "#000000", // Black
  "#ffffff", // White
  "#6e59a5", // Dark Purple
  "#e5deff", // Soft Purple
  "#ffdee2", // Soft Pink
  "#fec6a1", // Soft Orange
  "#d3e4fd", // Soft Blue
  "#f1f0fb", // Soft Gray
];

export function ColorPicker({ color, onChange, className, label }: ColorPickerProps) {
  const [inputColor, setInputColor] = useState(color);

  const handleColorChange = (newColor: string) => {
    // Validate hex color format
    const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(newColor);
    
    if (isValidHex) {
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
    }
    
    // Final validation on blur
    handleColorChange(value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "h-8 w-8 rounded-md border border-input flex items-center justify-center",
            className
          )}
          style={{ backgroundColor: color }}
          aria-label={label ? `Select ${label}` : "Select color"}
          type="button" // Prevent form submission
        />
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="space-y-3">
          {label && <Label className="text-xs">{label}</Label>}
          
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
              className="h-8 w-12 cursor-pointer border border-input rounded-md"
              aria-label={label ? `Color picker for ${label}` : "Color picker"}
            />
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
          
          <div className="grid grid-cols-5 gap-2 mt-2">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                className={cn(
                  "h-6 w-6 rounded-md border border-input",
                  color.toLowerCase() === presetColor.toLowerCase() && "ring-2 ring-primary ring-offset-1"
                )}
                style={{ backgroundColor: presetColor }}
                onClick={() => handleColorChange(presetColor)}
                aria-label={`Color: ${presetColor}`}
                type="button" // Prevent form submission
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
