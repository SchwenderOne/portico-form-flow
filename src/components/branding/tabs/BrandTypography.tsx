
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { toast } from "sonner";

const BrandTypography = () => {
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
    { value: "'Montserrat', sans-serif", label: "Montserrat" },
    { value: "'Lato', sans-serif", label: "Lato" },
  ];

  const handleTypographyChange = (key: keyof typeof brandSettings.typography, value: string) => {
    updateTypography({ [key]: value });
    toast.success("Typography updated", {
      description: "Changes are applied immediately",
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Typography Settings</h3>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="font-family">Font Family</Label>
            <Select 
              value={brandSettings.typography.fontFamily}
              onValueChange={(value) => handleTypographyChange('fontFamily', value)}
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
            <p className="text-sm text-muted-foreground">
              The main font used throughout your forms
            </p>
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
                onValueChange={(value) => handleTypographyChange('headingSize', `${value[0]}rem`)}
                className="flex-1"
              />
              <span className="text-sm w-16 text-right">
                {brandSettings.typography.headingSize}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Size for headers and titles in your forms
            </p>
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
                onValueChange={(value) => handleTypographyChange('bodySize', `${value[0]}rem`)}
                className="flex-1"
              />
              <span className="text-sm w-16 text-right">
                {brandSettings.typography.bodySize}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Size for regular text and input fields
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Typography Preview */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium mb-4">Typography Preview</h4>
          <div 
            className="p-6 border rounded-md"
            style={{ fontFamily: brandSettings.typography.fontFamily }}
          >
            <h1 
              style={{ 
                fontSize: brandSettings.typography.headingSize,
                color: brandSettings.colors.primary
              }}
              className="font-bold mb-4"
            >
              This is a heading
            </h1>
            <p 
              style={{ 
                fontSize: brandSettings.typography.bodySize
              }}
              className="mb-4"
            >
              This is a paragraph of text that demonstrates how your body text will look with the selected font family and size. The typography settings affect all text in your forms.
            </p>
            <div className="p-3 rounded-md" style={{ backgroundColor: brandSettings.colors.accent }}>
              <p 
                style={{ 
                  fontSize: brandSettings.typography.bodySize,
                  color: brandSettings.colors.primary 
                }}
                className="font-medium"
              >
                Text on accent background
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandTypography;
