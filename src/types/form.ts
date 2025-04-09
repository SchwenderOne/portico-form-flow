
import { Validation } from "./validation";

// Base form element interface
export interface FormElement {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  groupId: string | null;
  helpText?: string;
  validation?: Validation;
  content?: string;
  options?: string[];
  value?: any;
}

// Export additional form-related types for better organization
export interface FormPosition {
  x: number;
  y: number;
}

export interface FormSize {
  width: number;
  height: number;
}

export interface FormTheme {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  fontFamily: string;
}

export interface FormSettings {
  theme: FormTheme;
  submitButtonText: string;
  redirectUrl?: string;
  showProgressBar: boolean;
  thankYouMessage?: string;
  gdprConsent?: boolean;
  privacyPolicyUrl?: string;
  termsAndConditionsUrl?: string;
  dataAnonymization?: boolean;
  dataRetentionPeriod?: number;
}

export interface FormMetadata {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'review' | 'published';
  responsiblePerson: string;
  lastEditedBy: string;
  lastEditDate: string;
  tags: string[];
  createdAt: string;
}
