
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export interface GDPRConsentFieldProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  isEditing: boolean;
  privacyPolicyUrl?: string;
  termsAndConditionsUrl?: string;
}

const GDPRConsentField: React.FC<GDPRConsentFieldProps> = ({ 
  id, 
  checked, 
  onCheckedChange, 
  isEditing,
  privacyPolicyUrl,
  termsAndConditionsUrl
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <div className="flex items-start space-x-2">
        <Checkbox 
          id={`gdpr-consent-${id}`} 
          checked={checked}
          onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
          disabled={isEditing}
          className="mt-1"
        />
        <label 
          htmlFor={`gdpr-consent-${id}`}
          className="text-sm"
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
        >
          I consent to the processing of my personal data according to
          {privacyPolicyUrl && (
            <>
              {" "}
              <a 
                href={privacyPolicyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Privacy Policy
              </a>
            </>
          )}
          {termsAndConditionsUrl && privacyPolicyUrl && " and "}
          {termsAndConditionsUrl && (
            <>
              <a 
                href={termsAndConditionsUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Terms and Conditions
              </a>
            </>
          )}
          <span className="text-red-500 ml-1">*</span>
        </label>
      </div>
    </div>
  );
};

export default GDPRConsentField;
