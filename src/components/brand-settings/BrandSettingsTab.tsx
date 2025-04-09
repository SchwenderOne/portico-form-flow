
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { toast } from "sonner";
import ColorPanel from "./ColorPanel";
import TypographyPanel from "./TypographyPanel";
import IdentityPanel from "./IdentityPanel";
import BrandPreview from "./BrandPreview";

const BrandSettingsTab = () => {
  const { resetToDefaults } = useBrandSettings();
  const [activeTab, setActiveTab] = useState("colors");

  // Toast notification for brand reset
  const handleResetDefaults = () => {
    resetToDefaults();
    toast.success("Brand settings reset to defaults");
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Brand Settings</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleResetDefaults} 
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reset to Defaults
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="identity">Identity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors">
          <ColorPanel />
        </TabsContent>
        
        <TabsContent value="typography">
          <TypographyPanel />
        </TabsContent>
        
        <TabsContent value="identity">
          <IdentityPanel />
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="outline" className="mr-2">Live Preview</Badge>
            <Badge variant="success">Changes Auto-saved</Badge>
          </div>
          <Button 
            variant="brand" 
            size="sm"
            onClick={() => toast.success("Brand settings applied globally", {
              description: "Your brand settings are now visible throughout the application"
            })}
          >
            Apply Branding
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrandSettingsTab;
