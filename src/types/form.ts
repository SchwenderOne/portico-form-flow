
import { Validation } from "./validation";
import { Database } from "@/integrations/supabase/types";

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
  styling?: {
    fontFamily?: string;
    fontSize?: string;
    textAlign?: string;
    textColor?: string;
    bgColor?: string;
    borderStyle?: string;
    borderRadius?: string;
    padding?: string;
    margin?: string;
    shadow?: string;
  };
  // New properties for enhanced functionality
  isLocked?: boolean;
  isHidden?: boolean;
  description?: string;
  defaultValue?: any;
  conditionalLogic?: {
    enabled: boolean;
    conditions: Array<{
      fieldId: string;
      operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';
      value: any;
    }>;
    action: 'show' | 'hide' | 'enable' | 'disable';
  };
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

// Forms table type
export type DatabaseForm = Database['public']['Tables']['forms']['Row'];

// Form fields table type
export type DatabaseFormField = Database['public']['Tables']['form_fields']['Row'];

// Form responses table type
export type DatabaseFormResponse = Database['public']['Tables']['form_responses']['Row'];

// Form versions table type
export type DatabaseFormVersion = Database['public']['Tables']['form_versions']['Row'];
