
export interface ComplianceSettings {
  gdprEnabled: boolean;
  anonymizedExport: boolean;
  termsAndConditionsUrl: string;
  privacyPolicyUrl: string;
  dataRetentionPeriod: number; // in days
  isCompliant: boolean;
}

export type ComplianceStatus = 'compliant' | 'non-compliant' | 'warning';
