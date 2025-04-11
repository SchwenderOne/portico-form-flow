import { FormElement } from "@/types/form";
import { TemplateData } from "@/types/template";

// Job Application Form elements with comprehensive fields
const jobApplicationElements: FormElement[] = [
  {
    id: "header-job",
    type: "header",
    content: "Job Application Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "name-job",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null,
    helpText: "Please enter your legal full name as it appears on your ID"
  },
  {
    id: "email-job",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null,
    validation: {
      type: "email",
      message: "Please enter a valid email address"
    }
  },
  {
    id: "phone-job",
    type: "text",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "position-job",
    type: "text",
    label: "Position Applied For",
    placeholder: "Enter the position you're applying for",
    required: true,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "experience-job",
    type: "textarea",
    label: "Work Experience",
    placeholder: "Describe your relevant work experience",
    required: true,
    position: { x: 100, y: 530 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "education-job",
    type: "textarea",
    label: "Education",
    placeholder: "List your educational qualifications",
    required: true,
    position: { x: 100, y: 670 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "skills-job",
    type: "textarea",
    label: "Skills",
    placeholder: "List your relevant skills",
    required: true,
    position: { x: 100, y: 810 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "availability-job",
    type: "date",
    label: "Available Start Date",
    required: true,
    position: { x: 100, y: 950 },
    size: { width: 500, height: 80 },
    groupId: null
  }
];

// Comprehensive Job Application (Extended version with more fields)
const jobApplicationExtendedElements: FormElement[] = [
  {
    id: "header-job-ext",
    type: "header",
    content: "Comprehensive Job Application",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "name-job-ext",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null,
    helpText: "Please enter your legal full name as it appears on your ID"
  },
  {
    id: "email-job-ext",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "phone-job-ext",
    type: "text",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "address-job-ext",
    type: "textarea",
    label: "Current Address",
    placeholder: "Enter your full address",
    required: true,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "position-job-ext",
    type: "text",
    label: "Position Applied For",
    placeholder: "Enter the position you're applying for",
    required: true,
    position: { x: 100, y: 570 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "salary-job-ext",
    type: "text",
    label: "Expected Salary",
    placeholder: "Enter your salary expectations",
    required: false,
    position: { x: 100, y: 670 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "experience-job-ext",
    type: "textarea",
    label: "Work Experience",
    placeholder: "Describe your relevant work experience",
    required: true,
    position: { x: 100, y: 770 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "education-job-ext",
    type: "textarea",
    label: "Education",
    placeholder: "List your educational qualifications",
    required: true,
    position: { x: 100, y: 910 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "skills-job-ext",
    type: "textarea",
    label: "Skills",
    placeholder: "List your relevant skills",
    required: true,
    position: { x: 100, y: 1050 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "references-job-ext",
    type: "textarea",
    label: "References",
    placeholder: "List professional references with contact information",
    required: false,
    position: { x: 100, y: 1190 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "availability-job-ext",
    type: "date",
    label: "Available Start Date",
    required: true,
    position: { x: 100, y: 1330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "relocate-job-ext",
    type: "select",
    label: "Willing to Relocate?",
    required: true,
    position: { x: 100, y: 1430 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Yes", "No", "Maybe"]
  },
  {
    id: "consent-job-ext",
    type: "checkbox",
    label: "I consent to having my data stored for recruitment purposes",
    required: true,
    position: { x: 100, y: 1530 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false
  }
];

// Export job application templates
export const jobApplicationTemplates: TemplateData[] = [
  {
    id: "job-application",
    title: "Job Application Form",
    description: "Standard job application form for collecting applicant information",
    category: "HR",
    industry: "Recruitment",
    created: "2024-03-15",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop",
    author: "HR Team",
    popularity: 4.8,
    timeEstimate: "5-10 min",
    elements: jobApplicationElements
  },
  {
    id: "job-application-extended",
    title: "Comprehensive Job Application",
    description: "Detailed job application with additional fields for thorough candidate screening",
    category: "HR",
    industry: "Recruitment",
    created: "2024-02-20",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2070&auto=format&fit=crop",
    author: "Talent Acquisition",
    popularity: 4.6,
    timeEstimate: "10-15 min",
    elements: jobApplicationExtendedElements
  }
];
