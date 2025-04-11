
import { FormElement } from "./form";

export interface TemplateData {
  id: string;
  title: string;
  description: string;
  category: string;
  industry: string;
  created: string;
  image: string;
  author?: string;
  popularity?: number;
  timeEstimate?: string;
  elements: FormElement[];
}
