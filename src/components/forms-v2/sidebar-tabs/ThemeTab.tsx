
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { ColorPickerWithSwatches } from "@/components/branding/ColorPickerWithSwatches";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const ThemeTab = () => {
  const { brandSettings, updateBrandSettings } = useBrandSettings();
  
  return (
    <div className="space-y-4">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-sm">Form Theme</CardTitle>
        <CardDescription className="text-xs">
          Customize the appearance of your form
        </CardDescription>
      </CardHeader>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="colors">
          <AccordionTrigger className="text-sm py-2">Colors</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Primary Color</Label>
                <ColorPickerWithSwatches
                  color={brandSettings.colors.primary}
                  onChange={(color) => updateBrandSettings({
                    ...brandSettings,
                    colors: {
                      ...brandSettings.colors,
                      primary: color
                    }
                  })}
                  className="border"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">Secondary Color</Label>
                <ColorPickerWithSwatches
                  color={brandSettings.colors.secondary}
                  onChange={(color) => updateBrandSettings({
                    ...brandSettings,
                    colors: {
                      ...brandSettings.colors,
                      secondary: color
                    }
                  })}
                  className="border"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">Accent Color</Label>
                <ColorPickerWithSwatches
                  color={brandSettings.colors.accent}
                  onChange={(color) => updateBrandSettings({
                    ...brandSettings,
                    colors: {
                      ...brandSettings.colors,
                      accent: color
                    }
                  })}
                  className="border"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="typography">
          <AccordionTrigger className="text-sm py-2">Typography</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Font Family</Label>
                <Select 
                  value={brandSettings.typography.fontFamily}
                  onValueChange={(value) => updateBrandSettings({
                    ...brandSettings,
                    typography: {
                      ...brandSettings.typography,
                      fontFamily: value
                    }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                    <SelectItem value="Montserrat">Montserrat</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">Base Font Size</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    defaultValue={[16]}
                    min={12}
                    max={24}
                    step={1}
                    className="flex-1"
                  />
                  <Input type="number" className="w-16 h-8" defaultValue={16} />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="spacing">
          <AccordionTrigger className="text-sm py-2">Spacing & Layout</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Form Padding</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    defaultValue={[16]}
                    min={0}
                    max={48}
                    step={2}
                    className="flex-1"
                  />
                  <Input type="number" className="w-16 h-8" defaultValue={16} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">Field Spacing</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    defaultValue={[16]}
                    min={8}
                    max={32}
                    step={2}
                    className="flex-1"
                  />
                  <Input type="number" className="w-16 h-8" defaultValue={16} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Compact Mode</Label>
                  <Switch />
                </div>
                <p className="text-xs text-muted-foreground">Reduces overall form spacing for a denser layout</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="styles">
          <AccordionTrigger className="text-sm py-2">Element Styles</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Border Radius</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    defaultValue={[8]}
                    min={0}
                    max={20}
                    step={1}
                    className="flex-1"
                  />
                  <Input type="number" className="w-16 h-8" defaultValue={8} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Show Field Labels</Label>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Show Field Borders</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ThemeTab;
