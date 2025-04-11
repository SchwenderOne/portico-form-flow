
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { toast } from "sonner";
import BrandColors from "@/components/branding/tabs/BrandColors";
import BrandTypography from "@/components/branding/tabs/BrandTypography";
import BrandIdentity from "@/components/branding/tabs/BrandIdentity";
import WhiteLabelToggle from "@/components/branding/WhiteLabelToggle";

const BrandSettingsTab = () => {
  const { resetToDefaults } = useBrandSettings();
  const [activeTab, setActiveTab] = useState("colors");

  // Toast notification for brand reset
  const handleResetDefaults = () => {
    resetToDefaults();
    toast.success("Brand settings reset to defaults");
  };

  const handleApplyBranding = () => {
    toast.success("Brand settings applied globally", {
      description: "Your brand settings are now visible throughout the application"
    });
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
      
      <WhiteLabelToggle className="mb-4" />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="identity">Identity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors">
          <BrandColors />
        </TabsContent>
        
        <TabsContent value="typography">
          <BrandTypography />
        </TabsContent>
        
        <TabsContent value="identity">
          <BrandIdentity />
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="outline" className="mr-2">Live Preview</Badge>
            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Changes Auto-saved</Badge>
          </div>
          <Button 
            variant="default" 
            size="sm"
            onClick={handleApplyBranding}
          >
            Apply Branding
          </Button>
        </div>
      </div>
      
      <Card className="mt-4">
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium mb-2">Theme Preview</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="default">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandSettingsTab;
