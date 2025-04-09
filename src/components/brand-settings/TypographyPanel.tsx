
import React from "react";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import BrandPreview from "./BrandPreview";

const TypographyPanel = () => {
  const { brandSettings, updateTypography } = useBrandSettings();

  const fontOptions = [
    { value: "Inter, system-ui, sans-serif", label: "Inter (Default)" },
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Helvetica, sans-serif", label: "Helvetica" },
    { value: "'Times New Roman', serif", label: "Times New Roman" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "'Courier New', monospace", label: "Courier New" },
    { value: "'Roboto', sans-serif", label: "Roboto" },
    { value: "'Open Sans', sans-serif", label: "Open Sans" },
    { value: "'Playfair Display', serif", label: "Playfair Display" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="font-family">Font Family</Label>
        <Select 
          value={brandSettings.typography.fontFamily}
          onValueChange={(value) => updateTypography({ fontFamily: value })}
        >
          <SelectTrigger id="font-family">
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                <span style={{ fontFamily: font.value }}>{font.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">Main font used throughout your form</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="heading-size">Heading Size</Label>
        <div className="flex items-center gap-3">
          <Slider
            id="heading-size"
            min={0.9}
            max={2}
            step={0.05}
            value={[parseFloat(brandSettings.typography.headingSize)]}
            onValueChange={(value) => updateTypography({ headingSize: `${value[0]}rem` })}
            className="flex-1"
          />
          <span className="text-sm w-16 text-right">
            {brandSettings.typography.headingSize}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">Size for headers and titles</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="body-size">Body Text Size</Label>
        <div className="flex items-center gap-3">
          <Slider
            id="body-size"
            min={0.7}
            max={1.2}
            step={0.025}
            value={[parseFloat(brandSettings.typography.bodySize)]}
            onValueChange={(value) => updateTypography({ bodySize: `${value[0]}rem` })}
            className="flex-1"
          />
          <span className="text-sm w-16 text-right">
            {brandSettings.typography.bodySize}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">Size for regular text and inputs</p>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="preview">
          <AccordionTrigger>Typography Preview</AccordionTrigger>
          <AccordionContent>
            <BrandPreview type="typography" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TypographyPanel;
