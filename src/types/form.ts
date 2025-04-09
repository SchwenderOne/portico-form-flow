
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
  termsOfServiceUrl?: string;
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

// Supabase database types
export interface DatabaseForm {
  id: string;
  title: string;
  description: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published' | 'archived';
}

export interface DatabaseFormField {
  id: string;
  form_id: string;
  label: string;
  type: string;
  order: number;
  settings: any;
  created_at: string;
  updated_at: string;
}

export interface DatabaseFormResponse {
  id: string;
  form_id: string;
  user_id: string | null;
  submitted_at: string;
  response_data: any;
}

export interface DatabaseFormVersion {
  id: string;
  form_id: string;
  version_label: string;
  created_by: string;
  created_at: string;
  snapshot: any;
}
