
import React, { createContext, useContext, useState } from "react";
import { ComplianceSettings, ComplianceStatus, defaultComplianceSettings } from "@/types/compliance";
import { toast } from "sonner";

interface ComplianceContextType {
  complianceSettings: ComplianceSettings;
  updateSettings: (settings: ComplianceSettings) => void;
  updateGDPRSettings: ({ gdprEnabled, dataProcessingDisclosure }: { 
    gdprEnabled?: boolean; 
    dataProcessingDisclosure?: boolean 
  }) => void;
  updateLegalLinks: ({ privacyPolicyUrl, termsOfServiceUrl }: { 
    privacyPolicyUrl?: string | null; 
    termsOfServiceUrl?: string | null 
  }) => void;
  updateDataRetention: ({ dataRetentionPeriod }: { 
    dataRetentionPeriod: number 
  }) => void;
  updateComplianceSetting: <K extends keyof ComplianceSettings>(
    key: K,
    value: ComplianceSettings[K]
  ) => void;
  checkCompliance: () => ComplianceStatus;
  resetSettings: () => void;
}

const ComplianceContext = createContext<ComplianceContextType | undefined>(undefined);

export const ComplianceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [complianceSettings, setComplianceSettings] = useState<ComplianceSettings>(defaultComplianceSettings);

  const updateSettings = (settings: ComplianceSettings) => {
    setComplianceSettings(settings);
  };

  const updateGDPRSettings = ({ 
    gdprEnabled, 
    dataProcessingDisclosure 
  }: { 
    gdprEnabled?: boolean; 
    dataProcessingDisclosure?: boolean 
  }) => {
    setComplianceSettings(prev => {
      const newSettings = { 
        ...prev, 
        ...(gdprEnabled !== undefined ? { gdprEnabled } : {}),
        ...(dataProcessingDisclosure !== undefined ? { dataProcessingDisclosure } : {})
      };
      return { ...newSettings, isCompliant: checkIsCompliant(newSettings) };
    });
  };

  const updateLegalLinks = ({ 
    privacyPolicyUrl, 
    termsOfServiceUrl 
  }: { 
    privacyPolicyUrl?: string | null; 
    termsOfServiceUrl?: string | null 
  }) => {
    setComplianceSettings(prev => {
      const newSettings = { 
        ...prev, 
        ...(privacyPolicyUrl !== undefined ? { privacyPolicyUrl } : {}),
        ...(termsOfServiceUrl !== undefined ? { termsOfServiceUrl } : {})
      };
      return { ...newSettings, isCompliant: checkIsCompliant(newSettings) };
    });
  };

  const updateDataRetention = ({ 
    dataRetentionPeriod 
  }: { 
    dataRetentionPeriod: number 
  }) => {
    setComplianceSettings(prev => {
      const newSettings = { ...prev, dataRetentionPeriod };
      return { ...newSettings, isCompliant: checkIsCompliant(newSettings) };
    });
  };

  const updateComplianceSetting = <K extends keyof ComplianceSettings>(
    key: K,
    value: ComplianceSettings[K]
  ) => {
    setComplianceSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      const isSettingsCompliant = checkIsCompliant(newSettings);
      return { ...newSettings, isCompliant: isSettingsCompliant };
    });
  };

  const checkIsCompliant = (settings: ComplianceSettings): boolean => {
    // A form is considered compliant if it has GDPR enabled, privacy policy, and terms
    return (
      settings.gdprEnabled &&
      !!settings.termsOfServiceUrl &&
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
      complianceSettings.anonymizeExports || 
      complianceSettings.termsOfServiceUrl || 
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
        updateSettings,
        updateGDPRSettings,
        updateLegalLinks,
        updateDataRetention,
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

// Alias for backward compatibility - this helps fix the import error
export const useComplianceSettings = useCompliance;
