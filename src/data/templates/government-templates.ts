
import { FormElement } from "@/types/form";
import { TemplateData } from "@/types/template";

// Government Grant Application Form
const governmentGrantElements: FormElement[] = [
  {
    id: "header-grant",
    type: "header",
    content: "Government Grant Application",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "org-grant",
    type: "text",
    label: "Organization Name",
    placeholder: "Enter legal name of organization",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "ein-grant",
    type: "text",
    label: "EIN/Tax ID",
    placeholder: "Enter Tax ID number",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "contact-grant",
    type: "text",
    label: "Primary Contact Name",
    placeholder: "Enter name of primary contact",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "email-grant",
    type: "email",
    label: "Contact Email",
    placeholder: "Enter email address",
    required: true,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "phone-grant",
    type: "text",
    label: "Contact Phone",
    placeholder: "Enter phone number",
    required: true,
    position: { x: 100, y: 530 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "address-grant",
    type: "textarea",
    label: "Organization Address",
    placeholder: "Enter full address",
    required: true,
    position: { x: 100, y: 630 },
    size: { width: 500, height: 120 },
    groupId: null
  }
];

// Export government templates
export const governmentTemplates: TemplateData[] = [
  {
    id: "government-grant",
    title: "Government Grant Application",
    description: "Detailed application form for government grant funding requests",
    category: "Government",
    industry: "Public Sector",
    created: "2024-01-20",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    author: "Grants Division",
    popularity: 4.2,
    timeEstimate: "15-20 min",
    elements: governmentGrantElements
  }
];
