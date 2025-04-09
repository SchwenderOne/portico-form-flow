
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useCompliance } from "@/context/ComplianceContext";
import { ShieldCheck, ShieldAlert, Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ComplianceBadge = () => {
  const { checkCompliance } = useCompliance();
  const complianceStatus = checkCompliance();
  
  if (complianceStatus === 'non-compliant') {
    return null; // Don't show any badge if non-compliant
  }
  
  const statusIconMap = {
    'compliant': <ShieldCheck className="h-3.5 w-3.5 mr-1" />,
    'warning': <ShieldAlert className="h-3.5 w-3.5 mr-1" />,
    'non-compliant': <Shield className="h-3.5 w-3.5 mr-1" />
  };
  
  const statusStyles = {
    'compliant': 'bg-green-100 hover:bg-green-200 text-green-800 border-green-300',
    'warning': 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border-yellow-300',
    'non-compliant': 'bg-red-100 hover:bg-red-200 text-red-800 border-red-300'
  };
  
  const statusMessages = {
    'compliant': 'This form is compliant with privacy standards',
    'warning': 'This form is partially compliant but missing some requirements',
    'non-compliant': 'This form does not meet privacy compliance standards'
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="outline" 
            className={`${statusStyles[complianceStatus]} text-xs py-1 h-6 flex items-center`}
          >
            {statusIconMap[complianceStatus]}
            {complianceStatus === 'compliant' ? 'Compliant' : 'Partial Compliance'}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs max-w-[200px]">{statusMessages[complianceStatus]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ComplianceBadge;
