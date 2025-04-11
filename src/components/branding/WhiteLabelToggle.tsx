
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { toast } from "sonner";

type WhiteLabelToggleProps = {
  className?: string;
};

const WhiteLabelToggle: React.FC<WhiteLabelToggleProps> = ({ className }) => {
  const [isWhiteLabeled, setIsWhiteLabeled] = React.useState(true);
  const { brandSettings, resetToDefaults, updateIdentity } = useBrandSettings();

  const handleToggleWhiteLabel = (checked: boolean) => {
    setIsWhiteLabeled(checked);
    if (checked) {
      // Apply the custom branding
      if (brandSettings.identity.brandName === "Portico Forms") {
        // If still using default name, show a hint
        toast.info("Customize your brand identity in the Brand Settings panel", {
          description: "Change your brand name, logo, and colors to fully whitelabel your forms"
        });
      } else {
        toast.success("White labeling enabled", {
          description: `Forms will now use your ${brandSettings.identity.brandName} branding`
        });
      }
    } else {
      // Reset to Portico branding
      updateIdentity({
        brandName: "Portico Forms",
        tagline: "Forms you trust",
      });
      toast.success("White labeling disabled", {
        description: "Default Portico branding will be shown"
      });
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Switch 
        id="whitelabel-mode" 
        checked={isWhiteLabeled}
        onCheckedChange={handleToggleWhiteLabel}
      />
      <Label htmlFor="whitelabel-mode">White Label Mode</Label>
    </div>
  );
};

export default WhiteLabelToggle;
