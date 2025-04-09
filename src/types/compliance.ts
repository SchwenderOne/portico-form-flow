
export interface ComplianceSettings {
  gdprEnabled: boolean;
  dataProcessingDisclosure: boolean;
  privacyPolicyUrl: string | null;
  termsOfServiceUrl: string | null;
  dataRetentionPeriod: number;
  anonymizeExports: boolean;
  isCompliant: boolean;
}

export const defaultComplianceSettings: ComplianceSettings = {
  gdprEnabled: false,
  dataProcessingDisclosure: false,
  privacyPolicyUrl: null,
  termsOfServiceUrl: null,
  dataRetentionPeriod: 365, // 1 year by default
  anonymizeExports: true, // Anonymize by default for better privacy
  isCompliant: false
};

export interface ComplianceChecklistItem {
  id: string;
  title: string;
  description: string;
  status: "complete" | "incomplete" | "warning";
  settingKey: keyof ComplianceSettings | null;
}

export type ComplianceStatus = 'compliant' | 'warning' | 'non-compliant';
