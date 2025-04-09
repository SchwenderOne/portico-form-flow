
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCompliance } from "@/context/ComplianceContext";
import { ComplianceStatus } from "@/types/compliance";
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  FileDown, 
  FileCheck, 
  Clock, 
  Link, 
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X
} from "lucide-react";
import { toast } from "sonner";

const ComplianceTab = () => {
  const { complianceSettings, updateComplianceSetting, checkCompliance, resetSettings } = useCompliance();
  const [gdprSectionOpen, setGdprSectionOpen] = useState(true);
  const [exportSectionOpen, setExportSectionOpen] = useState(true);
  const [legalSectionOpen, setLegalSectionOpen] = useState(true);
  const [dataRetentionSectionOpen, setDataRetentionSectionOpen] = useState(true);
  
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
  
  const handleGdprToggle = (checked: boolean) => {
    updateComplianceSetting('gdprEnabled', checked);
    if (checked) {
      toast.success("GDPR consent field will be added to your form");
    }
  };
  
  const handleAnonymizedExportToggle = (checked: boolean) => {
    updateComplianceSetting('anonymizedExport', checked);
  };
  
  const handleRetentionPeriodChange = (value: number[]) => {
    updateComplianceSetting('dataRetentionPeriod', value[0]);
  };
  
  const handleUrlChange = (key: 'termsAndConditionsUrl' | 'privacyPolicyUrl', value: string) => {
    updateComplianceSetting(key, value);
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
      
      <Collapsible
        open={gdprSectionOpen}
        onOpenChange={setGdprSectionOpen}
        className="w-full space-y-2 mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold">GDPR Compliance</h4>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <span className="sr-only">Toggle</span>
              {gdprSectionOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
                  <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
                  <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="space-y-4 pt-2">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="gdpr-toggle" className="text-sm">GDPR Consent Field</Label>
              <p className="text-xs text-muted-foreground">
                Adds a required opt-in consent checkbox to your form
              </p>
            </div>
            <Switch
              id="gdpr-toggle"
              checked={complianceSettings.gdprEnabled}
              onCheckedChange={handleGdprToggle}
            />
          </div>
          
          {complianceSettings.gdprEnabled && (
            <div className="bg-primary/5 rounded-md p-2 flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs">
                Users will be asked to consent to data processing before form submission.
              </p>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
      
      <Separator className="my-4" />
      
      <Collapsible
        open={exportSectionOpen}
        onOpenChange={setExportSectionOpen}
        className="w-full space-y-2 mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileDown className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold">Data Export</h4>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <span className="sr-only">Toggle</span>
              {exportSectionOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
                  <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
                  <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="space-y-4 pt-2">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="anonymized-toggle" className="text-sm">Anonymized Exports</Label>
              <p className="text-xs text-muted-foreground">
                Remove personal identifiers when exporting data (PDF/CSV)
              </p>
            </div>
            <Switch
              id="anonymized-toggle"
              checked={complianceSettings.anonymizedExport}
              onCheckedChange={handleAnonymizedExportToggle}
            />
          </div>
          
          {complianceSettings.anonymizedExport && (
            <div className="bg-primary/5 rounded-md p-2 flex items-start gap-2">
              <FileCheck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs">
                Personal data (names, emails, etc.) will be redacted in exports while maintaining response data.
              </p>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
      
      <Separator className="my-4" />
      
      <Collapsible
        open={legalSectionOpen}
        onOpenChange={setLegalSectionOpen}
        className="w-full space-y-2 mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold">Legal Links</h4>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <span className="sr-only">Toggle</span>
              {legalSectionOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
                  <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
                  <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="space-y-4 pt-2">
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="terms-url" className="text-sm">Terms & Conditions URL</Label>
              <Input
                id="terms-url"
                placeholder="https://example.com/terms"
                value={complianceSettings.termsAndConditionsUrl}
                onChange={(e) => handleUrlChange('termsAndConditionsUrl', e.target.value)}
                className="h-8"
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="privacy-url" className="text-sm">Privacy Policy URL</Label>
              <Input
                id="privacy-url"
                placeholder="https://example.com/privacy"
                value={complianceSettings.privacyPolicyUrl}
                onChange={(e) => handleUrlChange('privacyPolicyUrl', e.target.value)}
                className="h-8"
              />
            </div>
            
            {(!complianceSettings.termsAndConditionsUrl || !complianceSettings.privacyPolicyUrl) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-yellow-800">
                  Both Terms & Conditions and Privacy Policy links are required for compliance.
                </p>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Separator className="my-4" />
      
      <Collapsible
        open={dataRetentionSectionOpen}
        onOpenChange={setDataRetentionSectionOpen}
        className="w-full space-y-2 mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold">Data Retention</h4>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <span className="sr-only">Toggle</span>
              {dataRetentionSectionOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
                  <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
                  <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="space-y-4 pt-2">
          <div className="space-y-3">
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <Label htmlFor="retention-period" className="text-sm">Data Retention Period</Label>
                <span className="text-xs font-medium">{complianceSettings.dataRetentionPeriod} days</span>
              </div>
              <Slider
                id="retention-period"
                defaultValue={[complianceSettings.dataRetentionPeriod]}
                max={365}
                min={7}
                step={1}
                onValueChange={handleRetentionPeriodChange}
              />
              <p className="text-xs text-muted-foreground">
                Form responses will be automatically deleted after this period
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Separator className="my-4" />
      
      <div className="flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              Compliance Checklist
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Compliance Checklist</DialogTitle>
              <DialogDescription>
                Ensure your form meets privacy and compliance standards with this checklist.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 my-4">
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${complianceSettings.gdprEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {complianceSettings.gdprEnabled ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium">GDPR Consent Field</h4>
                  <p className="text-xs text-muted-foreground">
                    Include explicit consent for data processing
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${complianceSettings.termsAndConditionsUrl ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {complianceSettings.termsAndConditionsUrl ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium">Terms & Conditions Link</h4>
                  <p className="text-xs text-muted-foreground">
                    Link to your terms of service
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${complianceSettings.privacyPolicyUrl ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {complianceSettings.privacyPolicyUrl ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium">Privacy Policy Link</h4>
                  <p className="text-xs text-muted-foreground">
                    Link to your privacy policy
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${complianceSettings.anonymizedExport ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {complianceSettings.anonymizedExport ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium">Anonymized Exports</h4>
                  <p className="text-xs text-muted-foreground">
                    Protect personal data when exporting
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${complianceSettings.dataRetentionPeriod <= 180 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {complianceSettings.dataRetentionPeriod <= 180 ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium">Reasonable Data Retention</h4>
                  <p className="text-xs text-muted-foreground">
                    Keep data for no longer than 180 days if possible
                  </p>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={resetSettings} className="w-full sm:w-auto">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Settings
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <div className="flex items-center text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5 mr-1.5" />
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default ComplianceTab;
