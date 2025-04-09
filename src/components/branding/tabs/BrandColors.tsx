
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { ColorPickerWithSwatches } from "@/components/branding/ColorPickerWithSwatches";
import { toast } from "sonner";

const BrandColors = () => {
  const { brandSettings, updateColors, resetToDefaults } = useBrandSettings();

  const handleColorChange = (colorKey: keyof typeof brandSettings.colors, color: string) => {
    updateColors({ [colorKey]: color });
    toast.success(`${colorKey.charAt(0).toUpperCase() + colorKey.slice(1)} color updated`, {
      description: "Changes are applied immediately",
    });
  };

  const handleResetColors = () => {
    resetToDefaults();
    toast.success("Brand colors reset to defaults", {
      description: "All colors have been reset to their default values",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Brand Colors</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleResetColors}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reset Colors
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex gap-2">
                <ColorPickerWithSwatches 
                  color={brandSettings.colors.primary}
                  onChange={(color) => handleColorChange('primary', color)}
                  label="Primary Color"
                />
                <Input
                  id="primary-color"
                  value={brandSettings.colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="flex-1"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Used for buttons, links, and important UI elements
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex gap-2">
                <ColorPickerWithSwatches
                  color={brandSettings.colors.secondary}
                  onChange={(color) => handleColorChange('secondary', color)}
                  label="Secondary Color"
                />
                <Input
                  id="secondary-color"
                  value={brandSettings.colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="flex-1"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Used for secondary buttons and accents
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Label htmlFor="accent-color">Accent Color</Label>
            <div className="flex gap-2">
              <ColorPickerWithSwatches
                color={brandSettings.colors.accent}
                onChange={(color) => handleColorChange('accent', color)}
                label="Accent Color"
              />
              <Input
                id="accent-color"
                value={brandSettings.colors.accent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="flex-1"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Used for backgrounds, highlights and subtle UI elements
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="p-4 rounded-md flex items-center justify-center h-24" style={{ backgroundColor: brandSettings.colors.primary }}>
          <span className="font-medium text-white">Primary</span>
        </div>
        <div className="p-4 rounded-md flex items-center justify-center h-24" style={{ backgroundColor: brandSettings.colors.secondary }}>
          <span className="font-medium text-white">Secondary</span>
        </div>
        <div className="p-4 rounded-md flex items-center justify-center h-24" style={{ backgroundColor: brandSettings.colors.accent }}>
          <span className="font-medium" style={{ color: brandSettings.colors.primary }}>Accent</span>
        </div>
      </div>
    </div>
  );
};

export default BrandColors;
