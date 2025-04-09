
import React from "react";
import ComplianceBadge from "@/components/compliance/ComplianceBadge";
import { useCompliance } from "@/context/ComplianceContext";
import { Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface ComplianceStatusProps {
  onPublish?: () => void;
}

const ComplianceStatus: React.FC<ComplianceStatusProps> = ({ onPublish }) => {
  const { complianceSettings, checkCompliance } = useCompliance();
  const navigate = useNavigate();
  const complianceStatus = checkCompliance();
  
  const handleGoToCompliance = () => {
    navigate("/compliance");
  };
  
  // Only show a warning dialog if user tries to publish a non-compliant form
  if (onPublish && complianceStatus !== 'compliant') {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="default">
            Publish Form
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Compliance Warning
            </DialogTitle>
            <DialogDescription>
              Your form may not meet all privacy compliance requirements.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm mb-4">
              Publishing without proper compliance settings may put you at risk for:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
              <li>Regulatory non-compliance (GDPR, CCPA, etc.)</li>
              <li>Potential legal liability</li>
              <li>Data privacy concerns</li>
            </ul>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleGoToCompliance} className="w-full sm:w-auto">
              <Shield className="h-4 w-4 mr-2" />
              Fix Compliance Issues
            </Button>
            <Button 
              onClick={onPublish} 
              variant="default" 
              className="w-full sm:w-auto"
            >
              Publish Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  
  return <ComplianceBadge />;
};

export default ComplianceStatus;
