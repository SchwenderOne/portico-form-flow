
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
  options?: string[];
  content?: string;
  groupId: string | null;
  validation?: {
    type?: 'email' | 'number' | 'regex' | 'length' | 'date' | 'custom';
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    message?: string;
    required?: boolean;
  };
  helpText?: string;
  disabled?: boolean;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  elements: FormElement[];
  createdAt: Date;
  updatedAt: Date;
  branding?: {
    logo?: string;
    colors?: {
      primary: string;
      secondary: string;
      background: string;
    };
    fonts?: {
      heading: string;
      body: string;
    };
  };
}

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  elements: FormElement[];
  createdAt: Date;
}
