
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import BrandPreview from "./BrandPreview";
import { toast } from "sonner";

const ColorPanel = () => {
  const { brandSettings, updateColors } = useBrandSettings();

  // Toast notification for brand changes
  const handleColorChange = (colorKey: keyof typeof brandSettings.colors, color: string) => {
    updateColors({ [colorKey]: color });
    toast.success(`${colorKey.charAt(0).toUpperCase() + colorKey.slice(1)} color updated`, {
      description: "Your brand color changes are applied globally",
      duration: 2000,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="primary-color">Primary Color</Label>
          <div className="flex items-center gap-2">
            <ColorPicker 
              color={brandSettings.colors.primary} 
              onChange={(color) => handleColorChange('primary', color)}
            />
            <Input 
              id="primary-color"
              value={brandSettings.colors.primary} 
              onChange={(e) => handleColorChange('primary', e.target.value)}
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground">Used for buttons, links and accents</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="secondary-color">Secondary Color</Label>
          <div className="flex items-center gap-2">
            <ColorPicker 
              color={brandSettings.colors.secondary} 
              onChange={(color) => handleColorChange('secondary', color)}
            />
            <Input 
              id="secondary-color"
              value={brandSettings.colors.secondary} 
              onChange={(e) => handleColorChange('secondary', e.target.value)}
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground">Used for secondary buttons and highlights</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="accent-color">Accent Color</Label>
        <div className="flex items-center gap-2">
          <ColorPicker 
            color={brandSettings.colors.accent} 
            onChange={(color) => handleColorChange('accent', color)}
          />
          <Input 
            id="accent-color"
            value={brandSettings.colors.accent} 
            onChange={(e) => handleColorChange('accent', e.target.value)}
            className="flex-1"
          />
        </div>
        <p className="text-xs text-muted-foreground">Used for backgrounds and subtle accents</p>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="preview">
          <AccordionTrigger>Color Preview</AccordionTrigger>
          <AccordionContent>
            <BrandPreview type="colors" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ColorPanel;
