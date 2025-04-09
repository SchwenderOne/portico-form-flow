
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
