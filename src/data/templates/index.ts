
import { TemplateData } from "@/types/template";
import { jobApplicationTemplates } from "./job-templates";
import { feedbackTemplates } from "./feedback-templates";
import { medicalTemplates } from "./medical-templates";
import { eventTemplates } from "./event-templates";
import { governmentTemplates } from "./government-templates";
import { educationTemplates } from "./education-templates";

// Combine all template categories into a single array
export const templatesData: TemplateData[] = [
  ...jobApplicationTemplates,
  ...feedbackTemplates,
  ...medicalTemplates,
  ...eventTemplates,
  ...governmentTemplates,
  ...educationTemplates,
  // Add a simple contact info update template
  {
    id: "contact-info-update",
    title: "Contact Information Update",
    description: "Simple form for updating contact information in your records",
    category: "Administrative",
    industry: "Various",
    created: "2024-03-18",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
    author: "Admin Team",
    popularity: 4.8,
    timeEstimate: "2-3 min",
    elements: []
  }
];

// Export additional template-related helpers if needed
export const getTemplateById = (id: string): TemplateData | undefined => {
  return templatesData.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): TemplateData[] => {
  return templatesData.filter(template => template.category === category);
};

export const getTemplatesByIndustry = (industry: string): TemplateData[] => {
  return templatesData.filter(template => template.industry === industry);
};
