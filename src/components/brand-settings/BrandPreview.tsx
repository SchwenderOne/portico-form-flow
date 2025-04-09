
import React from "react";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type BrandPreviewProps = {
  type: "colors" | "typography" | "identity";
};

const BrandPreview = ({ type }: BrandPreviewProps) => {
  const { brandSettings } = useBrandSettings();

  if (type === "colors") {
    return (
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
    );
  }

  if (type === "typography") {
    return (
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
    );
  }

  return (
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
  );
};

export default BrandPreview;
