
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Shield, AlertTriangle, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const ComplianceTab = () => {
  const [complianceScore, setComplianceScore] = React.useState(65);
  
  const handleRunCompliance = () => {
    toast.loading("Running compliance check...");
    setTimeout(() => {
      toast.success("Compliance check completed");
      setComplianceScore(85);
    }, 1500);
  };
  
  return (
    <div className="space-y-4">
      <div className="text-sm space-y-1">
        <h3 className="font-medium">Compliance Settings</h3>
        <p className="text-xs text-muted-foreground">
          Configure privacy and legal compliance settings
        </p>
      </div>
      
      <div className="rounded-md border p-3 bg-blue-50 border-blue-100">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm font-medium">Compliance Score</p>
          <Progress value={complianceScore} className="h-2" />
          <p className="text-xs text-blue-700">{complianceScore}% Compliant</p>
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full mt-2 gap-1 bg-white hover:bg-blue-100"
            onClick={handleRunCompliance}
          >
            <Shield className="h-3.5 w-3.5" />
            Run Compliance Check
          </Button>
        </div>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="gdpr">
          <AccordionTrigger className="text-sm py-2">
            <div className="flex items-center gap-2">
              <span>GDPR Compliance</span>
              <CheckCircle className="h-3.5 w-3.5 text-green-500" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs" htmlFor="gdpr-consent">Require Consent</Label>
              <Switch id="gdpr-consent" defaultChecked />
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs" htmlFor="privacy-url">Privacy Policy URL</Label>
              <Input id="privacy-url" placeholder="https://example.com/privacy" className="h-8 text-sm" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-xs" htmlFor="data-retention">Data Retention Period (days)</Label>
              <Input id="data-retention" placeholder="90" className="h-8 text-sm w-16" type="number" defaultValue={90} />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="hipaa">
          <AccordionTrigger className="text-sm py-2">
            <div className="flex items-center gap-2">
              <span>HIPAA Compliance</span>
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs" htmlFor="data-encryption">Encrypt Submitted Data</Label>
              <Switch id="data-encryption" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-xs" htmlFor="access-logging">Enable Access Logging</Label>
              <Switch id="access-logging" />
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs" htmlFor="dpo">Data Protection Officer</Label>
              <Input id="dpo" placeholder="DPO Name" className="h-8 text-sm" />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="accessibility">
          <AccordionTrigger className="text-sm py-2">
            <div className="flex items-center gap-2">
              <span>Accessibility (WCAG)</span>
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs" htmlFor="screen-reader">Screen Reader Support</Label>
              <Switch id="screen-reader" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-xs" htmlFor="high-contrast">High Contrast Mode</Label>
              <Switch id="high-contrast" />
            </div>
            
            <Button 
              variant="link" 
              size="sm" 
              className="text-xs h-6 p-0 flex items-center gap-1"
            >
              <span>Run Accessibility Scan</span>
              <ExternalLink className="h-3 w-3" />
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ComplianceTab;
