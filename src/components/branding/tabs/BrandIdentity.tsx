
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";

const BrandIdentity = () => {
  const { brandSettings, updateIdentity, updateFieldStyles } = useBrandSettings();
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      
      // Create a temporary URL for the uploaded file
      const logoUrl = URL.createObjectURL(file);
      updateIdentity({ logoUrl });
      
      toast.success("Logo uploaded", {
        description: "Your logo has been updated successfully",
      });
    }
  };

  const handleRemoveLogo = () => {
    updateIdentity({ logoUrl: null });
    setLogoFile(null);
    toast.success("Logo removed", {
      description: "Your logo has been removed",
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Brand Identity</h3>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="brand-name">Brand Name</Label>
            <Input 
              id="brand-name"
              value={brandSettings.identity.brandName} 
              onChange={(e) => updateIdentity({ brandName: e.target.value })}
              placeholder="Your organization name"
            />
            <p className="text-sm text-muted-foreground">
              The name of your organization or product
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input 
              id="tagline"
              value={brandSettings.identity.tagline} 
              onChange={(e) => updateIdentity({ tagline: e.target.value })}
              placeholder="Your brand tagline or slogan"
            />
            <p className="text-sm text-muted-foreground">
              A short slogan or description for your brand
            </p>
          </div>

          <div className="space-y-2">
            <Label>Logo</Label>
            <div className="flex items-center gap-4">
              <div 
                className="w-20 h-20 border rounded-md flex items-center justify-center overflow-hidden bg-gray-50"
              >
                {brandSettings.identity.logoUrl ? (
                  <img 
                    src={brandSettings.identity.logoUrl} 
                    alt="Logo" 
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="text-muted-foreground text-sm">No logo</span>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    asChild
                  >
                    <label htmlFor="logo-upload" className="cursor-pointer flex items-center justify-center gap-2">
                      <Upload size={16} />
                      Upload Logo
                      <Input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  </Button>
                  {brandSettings.identity.logoUrl && (
                    <Button 
                      variant="destructive" 
                      onClick={handleRemoveLogo}
                      size="icon"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Recommended size: 500x500px (PNG or SVG preferred)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <h4 className="text-sm font-medium">Form Element Styling</h4>
          
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
                <SelectItem value="double">Double</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="field-padding">Field Padding</Label>
            <div className="flex items-center gap-3">
              <Slider
                id="field-padding"
                min={0.25}
                max={1.5}
                step={0.125}
                value={[parseFloat(brandSettings.fieldStyles.padding)]}
                onValueChange={(value) => updateFieldStyles({ padding: `${value[0]}rem` })}
                className="flex-1"
              />
              <span className="text-sm w-16 text-right">
                {brandSettings.fieldStyles.padding}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandIdentity;
