
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { Image } from "lucide-react";
import BrandPreview from "./BrandPreview";

const IdentityPanel = () => {
  const { brandSettings, updateIdentity, updateFieldStyles } = useBrandSettings();
  const [logoFile, setLogoFile] = useState<File | null>(null);

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
            <BrandPreview type="identity" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default IdentityPanel;
