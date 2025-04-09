
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export const PortoThemeTab: React.FC = () => {
  const [primaryColor, setPrimaryColor] = React.useState("#9b87f5");
  const [backgroundColor, setBackgroundColor] = React.useState("#ffffff");
  const [textColor, setTextColor] = React.useState("#333333");
  const [fontFamily, setFontFamily] = React.useState("Inter");
  const [borderRadius, setBorderRadius] = React.useState(4);
  const [spacing, setSpacing] = React.useState(16);
  const [layout, setLayout] = React.useState("standard");

  const colorPresets = [
    { name: "Purple", primary: "#9b87f5", background: "#ffffff", text: "#333333" },
    { name: "Blue", primary: "#3b82f6", background: "#ffffff", text: "#333333" },
    { name: "Green", primary: "#10b981", background: "#ffffff", text: "#333333" },
    { name: "Red", primary: "#ef4444", background: "#ffffff", text: "#333333" },
    { name: "Dark", primary: "#6366f1", background: "#1f2937", text: "#f9fafb" },
  ];

  const handleApplyPreset = (preset: typeof colorPresets[0]) => {
    setPrimaryColor(preset.primary);
    setBackgroundColor(preset.background);
    setTextColor(preset.text);
    toast.success(`Applied ${preset.name} theme`);
  };

  const handleResetTheme = () => {
    setPrimaryColor("#9b87f5");
    setBackgroundColor("#ffffff");
    setTextColor("#333333");
    setFontFamily("Inter");
    setBorderRadius(4);
    setSpacing(16);
    setLayout("standard");
    toast.success("Theme reset to default");
  };

  const handleApplyTheme = () => {
    toast.success("Theme applied to form");
  };

  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Theme Presets</h3>
          <div className="grid grid-cols-5 gap-2">
            {colorPresets.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                className="h-8 p-0 aspect-square relative overflow-hidden"
                onClick={() => handleApplyPreset(preset)}
                style={{ backgroundColor: preset.background }}
              >
                <div
                  className="absolute inset-0 m-1 rounded-sm"
                  style={{ backgroundColor: preset.primary }}
                ></div>
                <span
                  className="absolute inset-0 flex items-center justify-center text-[8px] font-medium"
                  style={{ color: preset.text }}
                >
                  {preset.name}
                </span>
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Colors</h3>
          
          <div className="space-y-2">
            <Label htmlFor="primary-color">Primary Color</Label>
            <div className="flex gap-2">
              <div
                className="w-8 h-8 rounded border"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <Input
                id="primary-color"
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="background-color">Background Color</Label>
            <div className="flex gap-2">
              <div
                className="w-8 h-8 rounded border"
                style={{ backgroundColor: backgroundColor }}
              ></div>
              <Input
                id="background-color"
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="text-color">Text Color</Label>
            <div className="flex gap-2">
              <div
                className="w-8 h-8 rounded border"
                style={{ backgroundColor: textColor }}
              ></div>
              <Input
                id="text-color"
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Typography</h3>
          
          <div className="space-y-2">
            <Label htmlFor="font-family">Font Family</Label>
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger id="font-family">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Open Sans">Open Sans</SelectItem>
                <SelectItem value="Montserrat">Montserrat</SelectItem>
                <SelectItem value="Poppins">Poppins</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Layout</h3>
          
          <div className="space-y-2">
            <Label htmlFor="border-radius">Border Radius</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="border-radius"
                min={0}
                max={20}
                step={1}
                value={[borderRadius]}
                onValueChange={(value) => setBorderRadius(value[0])}
              />
              <span className="w-8 text-right">{borderRadius}px</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="spacing">Element Spacing</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="spacing"
                min={8}
                max={40}
                step={4}
                value={[spacing]}
                onValueChange={(value) => setSpacing(value[0])}
              />
              <span className="w-8 text-right">{spacing}px</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Form Layout</Label>
            <RadioGroup value={layout} onValueChange={setLayout}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard">Standard</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="compact" />
                <Label htmlFor="compact">Compact</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="comfortable" />
                <Label htmlFor="comfortable">Comfortable</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="pt-4 flex flex-col gap-2">
          <Button onClick={handleApplyTheme} className="w-full">
            <Check className="h-4 w-4 mr-2" />
            Apply Theme
          </Button>
          <Button variant="outline" onClick={handleResetTheme} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};
