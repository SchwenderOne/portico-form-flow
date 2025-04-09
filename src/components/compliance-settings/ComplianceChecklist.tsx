
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle2, X, RefreshCw } from "lucide-react";
import { useCompliance } from "@/context/ComplianceContext";
import { toast } from "sonner";

const ComplianceChecklist = () => {
  const { complianceSettings, resetSettings } = useCompliance();

  return (
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
          <Button variant="outline" onClick={() => {
            resetSettings();
            toast.info("Compliance settings have been reset");
          }} className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComplianceChecklist;
