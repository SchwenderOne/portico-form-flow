
import { FormElement } from "@/types/form";
import { TemplateData } from "@/types/template";

// Detailed Patient Intake Form
const patientIntakeElements: FormElement[] = [
  {
    id: "header-patient",
    type: "header",
    content: "Patient Intake Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "name-patient",
    type: "text",
    label: "Patient Full Name",
    placeholder: "Enter full legal name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "dob-patient",
    type: "date",
    label: "Date of Birth",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "gender-patient",
    type: "select",
    label: "Gender",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Male", "Female", "Non-binary", "Prefer not to say"]
  },
  {
    id: "address-patient",
    type: "textarea",
    label: "Home Address",
    placeholder: "Enter your full address",
    required: true,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "phone-patient",
    type: "text",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    required: true,
    position: { x: 100, y: 570 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "email-patient",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: false,
    position: { x: 100, y: 670 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "emergency-name-patient",
    type: "text",
    label: "Emergency Contact Name",
    placeholder: "Enter name of emergency contact",
    required: true,
    position: { x: 100, y: 770 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "emergency-phone-patient",
    type: "text",
    label: "Emergency Contact Phone",
    placeholder: "Enter phone number of emergency contact",
    required: true,
    position: { x: 100, y: 870 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "insurance-patient",
    type: "text",
    label: "Insurance Provider",
    placeholder: "Enter insurance provider name",
    required: true,
    position: { x: 100, y: 970 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "policy-patient",
    type: "text",
    label: "Policy Number",
    placeholder: "Enter your insurance policy number",
    required: true,
    position: { x: 100, y: 1070 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "allergies-patient",
    type: "textarea",
    label: "Known Allergies",
    placeholder: "List any known allergies or type 'None'",
    required: true,
    position: { x: 100, y: 1170 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "medications-patient",
    type: "textarea",
    label: "Current Medications",
    placeholder: "List all current medications or type 'None'",
    required: true,
    position: { x: 100, y: 1310 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "conditions-patient",
    type: "textarea",
    label: "Existing Medical Conditions",
    placeholder: "List any existing medical conditions or type 'None'",
    required: true,
    position: { x: 100, y: 1450 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "consent-patient",
    type: "checkbox",
    label: "I consent to treatment and the release of information for insurance purposes",
    required: true,
    position: { x: 100, y: 1590 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false
  }
];

// Medical History Form (variation of patient intake)
const medicalHistoryElements: FormElement[] = [
  {
    id: "header-medical",
    type: "header",
    content: "Medical History Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "name-medical",
    type: "text",
    label: "Patient Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "dob-medical",
    type: "date",
    label: "Date of Birth",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "conditions-medical",
    type: "textarea",
    label: "Current Medical Conditions",
    placeholder: "List all current medical conditions",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "medications-medical",
    type: "textarea",
    label: "Current Medications",
    placeholder: "List all medications and dosages",
    required: true,
    position: { x: 100, y: 470 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "allergies-medical",
    type: "textarea",
    label: "Allergies",
    placeholder: "List all allergies to medications, foods, etc.",
    required: true,
    position: { x: 100, y: 610 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "surgeries-medical",
    type: "textarea",
    label: "Previous Surgeries",
    placeholder: "List all previous surgeries with dates",
    required: false,
    position: { x: 100, y: 750 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "family-medical",
    type: "textarea",
    label: "Family Medical History",
    placeholder: "List relevant family medical history",
    required: false,
    position: { x: 100, y: 890 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "smoking-medical",
    type: "select",
    label: "Smoking Status",
    required: true,
    position: { x: 100, y: 1030 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Never smoked", "Former smoker", "Current smoker"]
  },
  {
    id: "alcohol-medical",
    type: "select",
    label: "Alcohol Consumption",
    required: true,
    position: { x: 100, y: 1130 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["None", "Occasional", "Moderate", "Heavy"]
  }
];

// Export medical templates
export const medicalTemplates: TemplateData[] = [
  {
    id: "patient-intake",
    title: "Patient Intake Form",
    description: "Comprehensive medical intake for new patients with detailed health information",
    category: "Healthcare",
    industry: "Medical",
    created: "2024-03-05",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop",
    author: "Healthcare Compliance",
    popularity: 4.5,
    timeEstimate: "10-15 min",
    elements: patientIntakeElements
  },
  {
    id: "medical-history",
    title: "Medical History Form",
    description: "Form for collecting patient medical history and current health status",
    category: "Healthcare",
    industry: "Medical",
    created: "2024-02-15",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    author: "Medical Standards",
    popularity: 4.3,
    timeEstimate: "8-12 min",
    elements: medicalHistoryElements
  }
];
