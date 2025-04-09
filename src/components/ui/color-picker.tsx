
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
  className?: string;
};

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
];

export function ColorPicker({ color, onChange, className }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "h-8 w-8 rounded-md border border-input flex items-center justify-center",
            className
          )}
          style={{ backgroundColor: color }}
          aria-label="Select color"
        />
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="h-8 w-12 cursor-pointer"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
            />
          </div>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                className={cn(
                  "h-6 w-6 rounded-md border border-input",
                  color === presetColor && "ring-2 ring-primary ring-offset-1"
                )}
                style={{ backgroundColor: presetColor }}
                onClick={() => onChange(presetColor)}
                aria-label={`Color: ${presetColor}`}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
