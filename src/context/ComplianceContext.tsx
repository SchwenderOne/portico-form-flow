
import React, { createContext, useContext, useState } from "react";
import { ComplianceSettings, ComplianceStatus } from "@/types/compliance";
import { toast } from "sonner";

interface ComplianceContextType {
  complianceSettings: ComplianceSettings;
  updateComplianceSetting: <K extends keyof ComplianceSettings>(
    key: K,
    value: ComplianceSettings[K]
  ) => void;
  checkCompliance: () => ComplianceStatus;
  resetSettings: () => void;
}

const defaultComplianceSettings: ComplianceSettings = {
  gdprEnabled: false,
  anonymizedExport: false,
  termsAndConditionsUrl: "",
  privacyPolicyUrl: "",
  dataRetentionPeriod: 90,
  isCompliant: false,
};

const ComplianceContext = createContext<ComplianceContextType | undefined>(undefined);

export const ComplianceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [complianceSettings, setComplianceSettings] = useState<ComplianceSettings>(defaultComplianceSettings);

  const updateComplianceSetting = <K extends keyof ComplianceSettings>(
    key: K,
    value: ComplianceSettings[K]
  ) => {
    setComplianceSettings((prev) => {
      const newSettings = { ...prev, [key]: value };
      const isSettingsCompliant = checkIsCompliant(newSettings);
      return { ...newSettings, isCompliant: isSettingsCompliant };
    });
  };

  const checkIsCompliant = (settings: ComplianceSettings): boolean => {
    // A form is considered compliant if it has GDPR enabled, privacy policy, and terms
    return (
      settings.gdprEnabled &&
      !!settings.termsAndConditionsUrl &&
      !!settings.privacyPolicyUrl
    );
  };

  const checkCompliance = (): ComplianceStatus => {
    if (complianceSettings.isCompliant) {
      return 'compliant';
    }
    
    // If at least one compliance setting is active but not all required ones
    if (
      complianceSettings.gdprEnabled || 
      complianceSettings.anonymizedExport || 
      complianceSettings.termsAndConditionsUrl || 
      complianceSettings.privacyPolicyUrl
    ) {
      return 'warning';
    }
    
    return 'non-compliant';
  };

  const resetSettings = () => {
    setComplianceSettings(defaultComplianceSettings);
    toast.info("Compliance settings have been reset");
  };

  return (
    <ComplianceContext.Provider
      value={{
        complianceSettings,
        updateComplianceSetting,
        checkCompliance,
        resetSettings,
      }}
    >
      {children}
    </ComplianceContext.Provider>
  );
};

export const useCompliance = (): ComplianceContextType => {
  const context = useContext(ComplianceContext);
  if (context === undefined) {
    throw new Error("useCompliance must be used within a ComplianceProvider");
  }
  return context;
};
