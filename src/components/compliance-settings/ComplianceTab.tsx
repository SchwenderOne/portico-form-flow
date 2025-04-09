
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCompliance } from "@/context/ComplianceContext";
import { ComplianceStatus } from "@/types/compliance";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import GDPRSection from "./GDPRSection";
import DataExportSection from "./DataExportSection";
import LegalLinksSection from "./LegalLinksSection";
import DataRetentionSection from "./DataRetentionSection";
import ComplianceChecklist from "./ComplianceChecklist";

const ComplianceTab = () => {
  const { checkCompliance } = useCompliance();
  const complianceStatus = checkCompliance();
  
  const statusBadgeStyles = {
    'compliant': 'bg-green-500 hover:bg-green-600',
    'warning': 'bg-yellow-500 hover:bg-yellow-600',
    'non-compliant': 'bg-red-500 hover:bg-red-600'
  };
  
  const statusIconMap = {
    'compliant': <ShieldCheck className="h-4 w-4 mr-2" />,
    'warning': <ShieldAlert className="h-4 w-4 mr-2" />,
    'non-compliant': <Shield className="h-4 w-4 mr-2" />
  };
  
  const complianceInfo = {
    'compliant': "This form is compliant with basic privacy standards",
    'warning': "This form is partially compliant but missing some requirements",
    'non-compliant': "This form does not meet privacy compliance standards"
  };
  
  return (
    <div className="p-4 h-full overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Compliance Settings</h3>
        <Badge 
          variant="secondary" 
          className={`${statusBadgeStyles[complianceStatus]}`}
        >
          {statusIconMap[complianceStatus]}
          {complianceStatus === 'compliant' ? 'Compliant' : 
           complianceStatus === 'warning' ? 'Partially Compliant' : 
           'Non-Compliant'}
        </Badge>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        {complianceInfo[complianceStatus]}
      </p>
      
      <GDPRSection />
      
      <Separator className="my-4" />
      
      <DataExportSection />
      
      <Separator className="my-4" />
      
      <LegalLinksSection />
      
      <Separator className="my-4" />
      
      <DataRetentionSection />
      
      <Separator className="my-4" />
      
      <div className="flex justify-between">
        <ComplianceChecklist />
        
        <div className="flex items-center text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5 mr-1.5" />
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default ComplianceTab;
