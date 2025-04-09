
import React, { useState } from "react";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { useCompliance } from "@/context/ComplianceContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GDPRSection from "./GDPRSection";
import LegalLinksSection from "./LegalLinksSection";
import DataRetentionSection from "./DataRetentionSection";
import DataExportSection from "./DataExportSection";
import ComplianceChecklist from "./ComplianceChecklist";

const ComplianceTab: React.FC = () => {
  const { 
    complianceSettings, 
    updateSettings
  } = useCompliance();
  
  const [activeTab, setActiveTab] = useState("gdpr");

  const handleSaveSettings = () => {
    toast.success("Compliance settings saved", {
      description: "Your compliance settings have been updated"
    });
  };

  // New handler for anonymize exports setting
  const handleAnonymizeExportsChange = (value: boolean) => {
    updateSettings({
      ...complianceSettings,
      anonymizeExports: value
    });
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">Compliance Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure privacy and legal compliance settings for your form
          </p>
        </div>
        <Button onClick={handleSaveSettings} variant="outline" size="sm">
          Save Settings
        </Button>
      </div>

      <Tabs defaultValue="gdpr" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="gdpr">GDPR</TabsTrigger>
          <TabsTrigger value="legal">Legal Links</TabsTrigger>
          <TabsTrigger value="retention">Data Retention</TabsTrigger>
          <TabsTrigger value="export">Data Export</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gdpr" className="space-y-4">
          <GDPRSection />
        </TabsContent>
        
        <TabsContent value="legal" className="space-y-4">
          <LegalLinksSection />
        </TabsContent>
        
        <TabsContent value="retention" className="space-y-4">
          <DataRetentionSection />
        </TabsContent>
        
        <TabsContent value="export" className="space-y-4">
          <DataExportSection 
            anonymizeExports={complianceSettings.anonymizeExports}
            onAnonymizeExportsChange={handleAnonymizeExportsChange}
          />
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 pt-4 border-t">
        <ComplianceChecklist />
      </div>
    </div>
  );
};

export default ComplianceTab;
