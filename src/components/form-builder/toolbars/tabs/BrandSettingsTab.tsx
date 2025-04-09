import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Palette, Type, Image, RefreshCw } from "lucide-react";

const BrandSettingsTab = () => {
  const { 
    brandSettings, 
    updateColors, 
    updateTypography, 
    updateIdentity, 
    updateFieldStyles,
    resetToDefaults 
  } = useBrandSettings();
  
  const [activeTab, setActiveTab] = useState("colors");
  const [logoFile, setLogoFile] = useState<File | null>(null);

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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      
      // Create a temporary URL for the uploaded file
      const logoUrl = URL.createObjectURL(file);
      updateIdentity({ logoUrl });
    }
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Brand Settings</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetToDefaults} 
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reset to Defaults
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="colors" className="flex items-center gap-1.5">
            <Palette className="h-4 w-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-1.5">
            <Type className="h-4 w-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="identity" className="flex items-center gap-1.5">
            <Image className="h-4 w-4" />
            Identity
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors" className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <ColorPicker 
                    color={brandSettings.colors.primary} 
                    onChange={(color) => updateColors({ primary: color })}
                  />
                  <Input 
                    id="primary-color"
                    value={brandSettings.colors.primary} 
                    onChange={(e) => updateColors({ primary: e.target.value })}
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
                    onChange={(color) => updateColors({ secondary: color })}
                  />
                  <Input 
                    id="secondary-color"
                    value={brandSettings.colors.secondary} 
                    onChange={(e) => updateColors({ secondary: e.target.value })}
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
                  onChange={(color) => updateColors({ accent: color })}
                />
                <Input 
                  id="accent-color"
                  value={brandSettings.colors.accent} 
                  onChange={(e) => updateColors({ accent: e.target.value })}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">Used for backgrounds and subtle accents</p>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="preview">
              <AccordionTrigger>Color Preview</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-4 border rounded-md">
                  <div className="flex flex-col gap-2">
                    <div 
                      className="h-10 rounded-md" 
                      style={{ backgroundColor: brandSettings.colors.primary }}
                    ></div>
                    <div 
                      className="h-6 rounded-md" 
                      style={{ backgroundColor: brandSettings.colors.secondary }}
                    ></div>
                    <div 
                      className="h-20 rounded-md p-3 flex items-center justify-center" 
                      style={{ backgroundColor: brandSettings.colors.accent }}
                    >
                      <span style={{ color: brandSettings.colors.primary }}>
                        Text on Accent Background
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      style={{ backgroundColor: brandSettings.colors.primary, color: "#fff" }}
                    >
                      Primary Button
                    </Button>
                    <Button
                      variant="outline"
                      style={{ 
                        backgroundColor: "transparent", 
                        borderColor: brandSettings.colors.primary,
                        color: brandSettings.colors.primary 
                      }}
                    >
                      Secondary Button
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="typography" className="space-y-4">
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
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="preview">
              <AccordionTrigger>Typography Preview</AccordionTrigger>
              <AccordionContent>
                <div className="p-4 border rounded-md space-y-3">
                  <h2 style={{ 
                    fontFamily: brandSettings.typography.fontFamily,
                    fontSize: brandSettings.typography.headingSize,
                    color: brandSettings.colors.primary
                  }}>
                    Form Heading
                  </h2>
                  <p style={{ 
                    fontFamily: brandSettings.typography.fontFamily,
                    fontSize: brandSettings.typography.bodySize
                  }}>
                    This is how your form text will appear to users. The typography settings
                    affect all text elements including labels, inputs, and descriptions.
                  </p>
                  <div className="space-y-1">
                    <Label style={{ 
                      fontFamily: brandSettings.typography.fontFamily,
                      fontSize: brandSettings.typography.bodySize
                    }}>
                      Input Label
                    </Label>
                    <Input 
                      style={{ fontFamily: brandSettings.typography.fontFamily }}
                      placeholder="Input text preview"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="identity" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brand-name">Brand Name</Label>
              <Input 
                id="brand-name"
                value={brandSettings.identity.brandName} 
                onChange={(e) => updateIdentity({ brandName: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Your organization or project name</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input 
                id="tagline"
                value={brandSettings.identity.tagline} 
                onChange={(e) => updateIdentity({ tagline: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">A short slogan or description</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="logo-upload">Logo</Label>
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 border border-dashed rounded-md flex items-center justify-center overflow-hidden"
                >
                  {brandSettings.identity.logoUrl ? (
                    <img 
                      src={brandSettings.identity.logoUrl} 
                      alt="Logo" 
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <Image className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Recommended size: 500x500px</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="field-border-radius">Field Border Radius</Label>
            <div className="flex items-center gap-3">
              <Slider
                id="field-border-radius"
                min={0}
                max={1.5}
                step={0.125}
                value={[parseFloat(brandSettings.fieldStyles.borderRadius)]}
                onValueChange={(value) => updateFieldStyles({ borderRadius: `${value[0]}rem` })}
                className="flex-1"
              />
              <span className="text-sm w-16 text-right">
                {brandSettings.fieldStyles.borderRadius}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="field-border-style">Field Border Style</Label>
            <Select 
              value={brandSettings.fieldStyles.borderStyle}
              onValueChange={(value) => updateFieldStyles({ borderStyle: value })}
            >
              <SelectTrigger id="field-border-style">
                <SelectValue placeholder="Select border style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="dashed">Dashed</SelectItem>
                <SelectItem value="dotted">Dotted</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="preview">
              <AccordionTrigger>Brand Preview</AccordionTrigger>
              <AccordionContent>
                <div className="p-4 border rounded-md space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    {brandSettings.identity.logoUrl && (
                      <img 
                        src={brandSettings.identity.logoUrl} 
                        alt="Logo" 
                        className="h-8 w-8 object-contain"
                      />
                    )}
                    <div>
                      <h3 className="font-medium" style={{ 
                        fontFamily: brandSettings.typography.fontFamily,
                        color: brandSettings.colors.primary
                      }}>
                        {brandSettings.identity.brandName}
                      </h3>
                      <p className="text-xs text-muted-foreground" style={{ 
                        fontFamily: brandSettings.typography.fontFamily
                      }}>
                        {brandSettings.identity.tagline}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div style={{ 
                      padding: brandSettings.fieldStyles.padding,
                      borderRadius: brandSettings.fieldStyles.borderRadius,
                      borderStyle: brandSettings.fieldStyles.borderStyle,
                      borderWidth: "1px",
                      borderColor: brandSettings.colors.primary
                    }}>
                      <p className="text-sm" style={{ fontFamily: brandSettings.typography.fontFamily }}>
                        This is how your form fields will appear
                      </p>
                    </div>
                    <Button style={{ 
                      backgroundColor: brandSettings.colors.primary,
                      color: "#fff",
                      fontFamily: brandSettings.typography.fontFamily,
                      borderRadius: brandSettings.fieldStyles.borderRadius
                    }}>
                      Submit Form
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="outline" className="mr-2">Live Preview</Badge>
            <Badge variant="success">Changes Auto-saved</Badge>
          </div>
          <Button size="sm" className="bg-portico-purple hover:bg-portico-purple-dark">
            Apply Branding
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrandSettingsTab;
