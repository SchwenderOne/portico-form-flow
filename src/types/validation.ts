
// Validation types
export interface ValidationBase {
  type: string;
  message?: string;
}

export interface LengthValidation extends ValidationBase {
  type: 'length';
  minLength?: number;
  maxLength?: number;
}

export interface NumberValidation extends ValidationBase {
  type: 'number';
  min?: number;
  max?: number;
}

export interface RegexValidation extends ValidationBase {
  type: 'regex';
  pattern: string;
}

export interface EmailValidation extends ValidationBase {
  type: 'email';
}

export interface DateValidation extends ValidationBase {
  type: 'date';
  minDate?: string;
  maxDate?: string;
}

export interface CustomValidation extends ValidationBase {
  type: 'custom';
  validator?: (value: any) => boolean;
}

export type Validation = 
  | LengthValidation
  | NumberValidation
  | RegexValidation
  | EmailValidation
  | DateValidation
  | CustomValidation;
