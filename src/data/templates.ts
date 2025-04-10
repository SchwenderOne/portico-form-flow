import { FormElement } from "@/types/form";

// Sample form elements for templates
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
    id: "experience-job",
    type: "textarea",
    label: "Work Experience",
    placeholder: "Describe your relevant work experience",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 120 },
    groupId: null
  }
];

const feedbackElements: FormElement[] = [
  {
    id: "header-feedback",
    type: "header",
    content: "Customer Feedback Survey",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "name-feedback",
    type: "text",
    label: "Your Name",
    placeholder: "Enter your name",
    required: false,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "rating-feedback",
    type: "select",
    label: "How would you rate our service?",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Excellent", "Good", "Average", "Poor", "Very Poor"]
  },
  {
    id: "comments-feedback",
    type: "textarea",
    label: "Additional Comments",
    placeholder: "Please share any additional feedback",
    required: false,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 120 },
    groupId: null
  }
];

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
    label: "Patient Name",
    placeholder: "Enter full name",
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
    id: "insurance-patient",
    type: "text",
    label: "Insurance Provider",
    placeholder: "Enter insurance provider name",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "allergies-patient",
    type: "textarea",
    label: "Known Allergies",
    placeholder: "List any known allergies",
    required: false,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 120 },
    groupId: null
  }
];

// Define generic elements for other templates
const genericElements: FormElement[] = [
  {
    id: "header-generic",
    type: "header",
    content: "Form Title",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "name-generic",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "email-generic",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null
  }
];

// Update templates with more realistic images
export const templatesData = [
  {
    id: "1",
    title: "Job Application Form",
    description: "Standard job application form with all required fields including work experience, education, and skills.",
    category: "HR",
    industry: "Recruitment",
    image: "https://images.unsplash.com/photo-1551651057-8c07e9ceb00e?auto=format&fit=crop&q=80&w=400&h=250",
    created: "2023-10-12",
    author: "HR Team",
    popularity: 4.8,
    timeEstimate: "5-10 mins",
    elements: jobApplicationElements
  },
  {
    id: "2",
    title: "Customer Feedback Survey",
    description: "Collect detailed feedback from your customers about products and services.",
    category: "Feedback",
    industry: "Retail",
    image: "https://images.unsplash.com/photo-1581088247940-69acdbc5c20e?auto=format&fit=crop&q=80&w=400&h=250",
    created: "2023-09-05",
    author: "Marketing Team",
    popularity: 4.6,
    timeEstimate: "2-3 mins",
    elements: feedbackElements
  },
  {
    id: "3",
    title: "Patient Intake Form",
    description: "Complete patient intake form for healthcare facilities with medical history and insurance information.",
    category: "Healthcare",
    industry: "Medical",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400&h=250",
    created: "2023-11-20",
    author: "Healthcare Admin",
    popularity: 4.9,
    timeEstimate: "8-12 mins",
    elements: patientIntakeElements
  },
  {
    id: "4",
    title: "Event Registration Form",
    description: "Register attendees for your upcoming event with meal preferences and accessibility requirements.",
    category: "Events",
    industry: "Entertainment",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400&h=250",
    created: "2023-12-01",
    author: "Events Team",
    popularity: 4.7,
    timeEstimate: "3-5 mins",
    elements: genericElements
  },
  {
    id: "5",
    title: "Government Grant Application",
    description: "Apply for government grants with all required information and compliance documentation.",
    category: "Government",
    industry: "Public Sector",
    image: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&fit=crop&q=80&w=400&h=250",
    created: "2023-10-30",
    author: "Gov Affairs",
    popularity: 4.5,
    timeEstimate: "15-20 mins",
    elements: genericElements
  },
  {
    id: "6",
    title: "Research Consent Form",
    description: "Detailed consent form for research participation with clear explanation of procedures and risks.",
    category: "Research",
    industry: "Education",
    image: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&q=80&w=400&h=250", 
    created: "2023-08-15",
    author: "Research Team",
    popularity: 4.4,
    timeEstimate: "10-15 mins",
    elements: genericElements
  },
  {
    id: "7",
    title: "Contact Information Update",
    description: "Simple form to update contact information for existing customers or members.",
    category: "Administrative",
    industry: "Various",
    image: "https://images.unsplash.com/photo-1574707100000-fe0a1f08049c?auto=format&fit=crop&q=80&w=400&h=250", 
    created: "2023-07-22",
    author: "Admin Team",
    popularity: 4.2,
    timeEstimate: "1-2 mins",
    elements: genericElements
  },
  {
    id: "8",
    title: "Employee Onboarding",
    description: "Comprehensive onboarding form for new employees with tax information and policy acknowledgments.",
    category: "HR",
    industry: "Corporate",
    image: "https://images.unsplash.com/photo-1535957998253-26ae1ef29506?auto=format&fit=crop&q=80&w=400&h=250", 
    created: "2023-11-05",
    author: "HR Department",
    popularity: 4.7,
    timeEstimate: "10-15 mins",
    elements: genericElements
  },
  {
    id: "9",
    title: "Donation Form",
    description: "Secure donation form for non-profit organizations with multiple payment options.",
    category: "Non-profit",
    industry: "Charity",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=400&h=250", 
    created: "2023-09-18",
    author: "Fundraising Team",
    popularity: 4.6,
    timeEstimate: "2-4 mins",
    elements: genericElements
  },
  {
    id: "10",
    title: "Incident Report",
    description: "Detailed incident reporting form with witness statements and evidence upload functionality.",
    category: "Security",
    industry: "Various",
    image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?auto=format&fit=crop&q=80&w=400&h=250", 
    created: "2023-10-14",
    author: "Security Team",
    popularity: 4.8,
    timeEstimate: "5-8 mins",
    elements: genericElements
  },
  {
    id: "11",
    title: "Membership Application",
    description: "Comprehensive membership application form for associations and organizations.",
    category: "Membership",
    industry: "Associations",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400&h=250", 
    created: "2023-12-05",
    author: "Membership Team",
    popularity: 4.5,
    timeEstimate: "7-10 mins",
    elements: genericElements
  },
  {
    id: "12",
    title: "Student Registration",
    description: "Educational institution registration form with academic history and program selection.",
    category: "Education",
    industry: "Academic",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400&h=250", 
    created: "2023-08-30",
    author: "Admissions",
    popularity: 4.7,
    timeEstimate: "8-12 mins",
    elements: genericElements
  }
];
