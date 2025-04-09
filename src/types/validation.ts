
// Define all possible validation types
export type ValidationTypes = 'email' | 'number' | 'regex' | 'length' | 'date' | 'custom';

// Base validation interface that all validations extend
export interface Validation {
  type: ValidationTypes;
  message?: string;
  
  // Number validation
  min?: number;
  max?: number;
  
  // Text length validation
  minLength?: number;
  maxLength?: number;
  
  // Regex validation
  pattern?: string;
  
  // Date validation
  minDate?: Date;
  maxDate?: Date;
  
  // Custom validation (can be anything)
  [key: string]: any;
}
