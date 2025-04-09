
import React from "react";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const BrandPreview = () => {
  const { brandSettings } = useBrandSettings();

  return (
    <Card className="shadow-md overflow-hidden">
      <CardHeader
        style={{
          backgroundColor: brandSettings.colors.primary,
          color: "#FFFFFF",
        }}
      >
        <div className="flex items-center gap-3">
          {brandSettings.identity.logoUrl && (
            <img 
              src={brandSettings.identity.logoUrl} 
              alt="Logo" 
              className="h-8 w-8 object-contain bg-white rounded-sm p-1"
            />
          )}
          <CardTitle>
            {brandSettings.identity.brandName || "Portico Forms"}
          </CardTitle>
        </div>
        <div className="text-sm opacity-90">
          {brandSettings.identity.tagline || "Forms you trust"}
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6"
        style={{ fontFamily: brandSettings.typography.fontFamily }}
      >
        <div>
          <h2 style={{ 
            fontSize: brandSettings.typography.headingSize,
            color: brandSettings.colors.primary,
            fontFamily: brandSettings.typography.fontFamily,
            marginBottom: "0.5rem"
          }}>
            Form Preview
          </h2>
          <p style={{ 
            fontSize: brandSettings.typography.bodySize,
            fontFamily: brandSettings.typography.fontFamily,
          }}>
            This is how your form will appear to your users with the current brand settings.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label style={{ 
              fontSize: brandSettings.typography.bodySize,
              fontFamily: brandSettings.typography.fontFamily,
            }}>
              Full Name
            </Label>
            <Input 
              placeholder="John Doe" 
              style={{
                borderRadius: brandSettings.fieldStyles.borderRadius,
                borderStyle: brandSettings.fieldStyles.borderStyle,
                padding: brandSettings.fieldStyles.padding,
                fontFamily: brandSettings.typography.fontFamily,
                fontSize: brandSettings.typography.bodySize,
              }}
            />
          </div>
          
          <div className="space-y-2">
            <Label style={{ 
              fontSize: brandSettings.typography.bodySize,
              fontFamily: brandSettings.typography.fontFamily,
            }}>
              Email Address
            </Label>
            <Input 
              placeholder="your@email.com" 
              style={{
                borderRadius: brandSettings.fieldStyles.borderRadius,
                borderStyle: brandSettings.fieldStyles.borderStyle,
                padding: brandSettings.fieldStyles.padding,
                fontFamily: brandSettings.typography.fontFamily,
                fontSize: brandSettings.typography.bodySize,
              }}
            />
          </div>
          
          <div 
            className="p-3 rounded-md flex items-center gap-2"
            style={{ 
              backgroundColor: brandSettings.colors.accent,
              borderRadius: brandSettings.fieldStyles.borderRadius,
            }}
          >
            <Check size={16} style={{ color: brandSettings.colors.primary }} />
            <span 
              style={{ 
                color: brandSettings.colors.primary,
                fontSize: brandSettings.typography.bodySize,
                fontFamily: brandSettings.typography.fontFamily,
              }}
            >
              Your information is secure and private
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full"
          style={{
            backgroundColor: brandSettings.colors.primary,
            color: "white",
            borderRadius: brandSettings.fieldStyles.borderRadius,
            fontFamily: brandSettings.typography.fontFamily,
          }}
        >
          Submit Form
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BrandPreview;
