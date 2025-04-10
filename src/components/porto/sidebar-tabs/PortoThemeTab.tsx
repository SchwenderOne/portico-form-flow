
import React, { useState } from "react";
import { usePorto } from "../context/PortoContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Paintbrush, 
  Type, 
  Box, 
  LayoutGrid, 
  Image, 
  Palette, 
  Droplet, 
  CopyCheck 
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

// Color schemes for brand presets
const colorSchemes = [
  {
    name: "Corporate Blue",
    primary: "#1867C0",
    secondary: "#5CBBF6",
    text: "#2C3E50",
    success: "#4CAF50",
    warning: "#FFC107",
    error: "#FF5252"
  },
  {
    name: "Government Gray",
    primary: "#37474F",
    secondary: "#78909C",
    text: "#263238",
    success: "#2E7D32",
    warning: "#FF8F00",
    error: "#C62828"
  },
  {
    name: "Healthcare Green",
    primary: "#00796B",
    secondary: "#26A69A",
    text: "#004D40",
    success: "#43A047",
    warning: "#FFB300",
    error: "#E53935"
  },
  {
    name: "Education Orange",
    primary: "#FF5722",
    secondary: "#FF8A65",
    text: "#3E2723",
    success: "#689F38",
    warning: "#F57C00",
    error: "#D32F2F"
  },
  {
    name: "NGO Purple",
    primary: "#6A1B9A",
    secondary: "#AB47BC",
    text: "#4A148C",
    success: "#388E3C",
    warning: "#FFA000",
    error: "#D32F2F"
  }
];

// Font combinations for typography presets
const fontPresets = [
  {
    name: "Modern Sans",
    heading: "Inter",
    body: "Open Sans",
    monospace: "JetBrains Mono"
  },
  {
    name: "Classic Serif",
    heading: "Merriweather",
    body: "Georgia",
    monospace: "Courier New"
  },
  {
    name: "Corporate Clean",
    heading: "Roboto",
    body: "Roboto",
    monospace: "Roboto Mono"
  },
  {
    name: "Government Standard",
    heading: "Source Sans Pro",
    body: "Source Sans Pro",
    monospace: "Source Code Pro"
  },
  {
    name: "Healthcare Professional",
    heading: "Poppins",
    body: "Nunito",
    monospace: "IBM Plex Mono"
  }
];

export const PortoThemeTab: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = usePorto();
  const [activeTab, setActiveTab] = useState("colors");

  // Custom colors state
  const [primaryColor, setPrimaryColor] = useState("#8B5CF6");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [textColor, setTextColor] = useState("#1A1F2C");
  const [borderRadius, setBorderRadius] = useState("4");
  const [fontFamily, setFontFamily] = useState("Inter");

  const applyTheme = () => {
    // Here we would connect to the form context and apply the theme
    // For demo purposes, we'll just show a toast
    toast.success("Theme applied to form");
  };

  const applyColorScheme = (colorScheme: typeof colorSchemes[0]) => {
    setPrimaryColor(colorScheme.primary);
    setTextColor(colorScheme.text);
    toast.success(`Applied ${colorScheme.name} color scheme`);
  };

  const applyFontPreset = (fontPreset: typeof fontPresets[0]) => {
    setFontFamily(fontPreset.heading);
    toast.success(`Applied ${fontPreset.name} font preset`);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="colors" className="flex-1">
              <Palette className="h-4 w-4 mr-2" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex-1">
              <Type className="h-4 w-4 mr-2" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex-1">
              <LayoutGrid className="h-4 w-4 mr-2" />
              Layout
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors" className="space-y-4 mt-4">
            <Accordion type="single" collapsible defaultValue="custom-colors">
              <AccordionItem value="custom-colors">
                <AccordionTrigger>Custom Colors</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <div className="flex gap-2">
                          <div 
                            className="w-8 h-8 rounded-md border" 
                            style={{ backgroundColor: primaryColor }}
                          />
                          <Input
                            id="primaryColor"
                            type="text"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="backgroundColor">Background</Label>
                        <div className="flex gap-2">
                          <div 
                            className="w-8 h-8 rounded-md border" 
                            style={{ backgroundColor: backgroundColor }}
                          />
                          <Input
                            id="backgroundColor"
                            type="text"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="textColor">Text Color</Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-8 h-8 rounded-md border" 
                          style={{ backgroundColor: textColor }}
                        />
                        <Input
                          id="textColor"
                          type="text"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="borderRadius">Border Radius (px)</Label>
                      <Input
                        id="borderRadius"
                        type="number"
                        min="0"
                        max="24"
                        value={borderRadius}
                        onChange={(e) => setBorderRadius(e.target.value)}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="brand-presets">
                <AccordionTrigger>Brand Presets</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-2">
                    {colorSchemes.map((scheme, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start h-auto py-3"
                        onClick={() => applyColorScheme(scheme)}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-md border flex items-center justify-center"
                            style={{ backgroundColor: scheme.primary }}
                          >
                            <Droplet className="h-5 w-5 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-sm">{scheme.name}</p>
                            <div className="flex gap-1 mt-1">
                              {[scheme.primary, scheme.secondary, scheme.success, scheme.warning, scheme.error].map((color, i) => (
                                <div 
                                  key={i} 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          
          <TabsContent value="typography" className="space-y-4 mt-4">
            <Accordion type="single" collapsible defaultValue="font-settings">
              <AccordionItem value="font-settings">
                <AccordionTrigger>Font Settings</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="fontFamily">Form Font</Label>
                      <select
                        id="fontFamily"
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                        className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md"
                      >
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Poppins">Poppins</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Lato">Lato</option>
                        <option value="Merriweather">Merriweather</option>
                        <option value="Source Sans Pro">Source Sans Pro</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="headingSize">Heading Size (px)</Label>
                      <Input
                        id="headingSize"
                        type="number"
                        min="16"
                        max="48"
                        defaultValue="24"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bodySize">Body Size (px)</Label>
                      <Input
                        id="bodySize"
                        type="number"
                        min="12"
                        max="24"
                        defaultValue="16"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="font-presets">
                <AccordionTrigger>Font Presets</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-2">
                    {fontPresets.map((preset, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start h-auto py-3"
                        onClick={() => applyFontPreset(preset)}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-md border flex items-center justify-center bg-primary/10"
                          >
                            <Type className="h-5 w-5 text-primary" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-sm">{preset.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              H: {preset.heading} / B: {preset.body}
                            </p>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          
          <TabsContent value="layout" className="space-y-4 mt-4">
            <Accordion type="single" collapsible defaultValue="form-layout">
              <AccordionItem value="form-layout">
                <AccordionTrigger>Form Layout</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="formWidth">Form Width (px)</Label>
                      <Input
                        id="formWidth"
                        type="number"
                        min="320"
                        max="1200"
                        defaultValue="800"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="formPadding">Form Padding (px)</Label>
                      <Input
                        id="formPadding"
                        type="number"
                        min="0"
                        max="48"
                        defaultValue="24"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fieldSpacing">Field Spacing (px)</Label>
                      <Input
                        id="fieldSpacing"
                        type="number"
                        min="8"
                        max="48"
                        defaultValue="16"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                        <div className="w-full h-1 bg-primary/30 mb-1"></div>
                        <div className="w-full h-2 bg-primary/60 mb-1"></div>
                        <div className="w-full h-1 bg-primary/30 mb-1"></div>
                        <span className="text-xs">Stacked Layout</span>
                      </Button>
                      
                      <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                        <div className="flex w-full gap-2">
                          <div className="w-1/2 h-4 bg-primary/60"></div>
                          <div className="w-1/2 h-4 bg-primary/60"></div>
                        </div>
                        <div className="flex w-full gap-2 mt-2">
                          <div className="w-1/2 h-4 bg-primary/60"></div>
                          <div className="w-1/2 h-4 bg-primary/60"></div>
                        </div>
                        <span className="text-xs mt-2">Two-Column Layout</span>
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="background-options">
                <AccordionTrigger>Background Options</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="h-20 flex flex-col gap-1">
                        <Box className="h-4 w-4 text-primary" />
                        <span className="text-xs">Solid Color</span>
                      </Button>
                      
                      <Button variant="outline" className="h-20 flex flex-col gap-1">
                        <Image className="h-4 w-4 text-primary" />
                        <span className="text-xs">Background Image</span>
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="h-20 flex flex-col gap-1">
                        <div className="h-4 w-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                        <span className="text-xs">Gradient</span>
                      </Button>
                      
                      <Button variant="outline" className="h-20 flex flex-col gap-1">
                        <div className="h-4 w-4 border border-dashed border-primary rounded-full" />
                        <span className="text-xs">Pattern</span>
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
        
        <Separator />
        
        <Button onClick={applyTheme} className="w-full">
          <CopyCheck className="h-4 w-4 mr-2" />
          Apply Theme to Form
        </Button>
      </div>
    </ScrollArea>
  );
};
