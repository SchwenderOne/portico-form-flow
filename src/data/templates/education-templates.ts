
import { FormElement } from "@/types/form";
import { TemplateData } from "@/types/template";

// Course Registration Form
const courseRegistrationElements: FormElement[] = [
  {
    id: "header-course",
    type: "header",
    content: "Course Registration Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "name-course",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "email-course",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "student-id-course",
    type: "text",
    label: "Student ID (if applicable)",
    placeholder: "Enter your student ID",
    required: false,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "course-select",
    type: "select",
    label: "Course Selection",
    required: true,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Introduction to Programming", "Advanced Mathematics", "Data Science Fundamentals", "Business Ethics", "Art History"]
  },
  {
    id: "semester-course",
    type: "select",
    label: "Semester",
    required: true,
    position: { x: 100, y: 530 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Fall 2024", "Spring 2025", "Summer 2025"]
  },
  {
    id: "prereq-course",
    type: "textarea",
    label: "Prerequisites Completed",
    placeholder: "List any prerequisites you've completed for this course",
    required: false,
    position: { x: 100, y: 630 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "accom-course",
    type: "textarea",
    label: "Accommodation Needs",
    placeholder: "Describe any accommodation needs",
    required: false,
    position: { x: 100, y: 770 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "agree-course",
    type: "checkbox",
    label: "I agree to the terms and academic policies",
    required: true,
    position: { x: 100, y: 910 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false
  }
];

// Scholarship Application Form
const scholarshipApplicationElements: FormElement[] = [
  {
    id: "header-scholarship",
    type: "header",
    content: "Scholarship Application Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "name-scholarship",
    type: "text",
    label: "Applicant Full Name",
    placeholder: "Enter your full legal name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "email-scholarship",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "phone-scholarship",
    type: "text",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "address-scholarship",
    type: "textarea",
    label: "Current Address",
    placeholder: "Enter your full current address",
    required: true,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "education-scholarship",
    type: "textarea",
    label: "Educational Background",
    placeholder: "Describe your educational history",
    required: true,
    position: { x: 100, y: 570 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "gpa-scholarship",
    type: "text",
    label: "Current GPA",
    placeholder: "Enter your current GPA",
    required: true,
    position: { x: 100, y: 710 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "institutions-scholarship",
    type: "select",
    label: "Target Institution",
    required: true,
    position: { x: 100, y: 810 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["University A", "University B", "College C", "Other"]
  },
  {
    id: "program-scholarship",
    type: "text",
    label: "Program of Study",
    placeholder: "Enter your intended program of study",
    required: true,
    position: { x: 100, y: 910 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "financial-scholarship",
    type: "textarea",
    label: "Statement of Financial Need",
    placeholder: "Explain your financial need for this scholarship",
    required: true,
    position: { x: 100, y: 1010 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "achievements-scholarship",
    type: "textarea",
    label: "Academic Achievements & Extracurricular Activities",
    placeholder: "List your academic achievements and extracurricular activities",
    required: true,
    position: { x: 100, y: 1150 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "agree-scholarship",
    type: "checkbox",
    label: "I certify that all information provided is accurate and complete",
    required: true,
    position: { x: 100, y: 1290 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false
  }
];

// Export education templates
export const educationTemplates: TemplateData[] = [
  {
    id: "course-registration",
    title: "Course Registration Form",
    description: "Registration form for academic courses and programs",
    category: "Education",
    industry: "Academic",
    created: "2024-02-25",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    author: "Academic Affairs",
    popularity: 4.5,
    timeEstimate: "5-7 min",
    elements: courseRegistrationElements
  },
  {
    id: "scholarship-application",
    title: "Scholarship Application Form",
    description: "Comprehensive application for academic scholarships and financial aid",
    category: "Education",
    industry: "Academic",
    created: "2024-02-05",
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop",
    author: "Financial Aid Office",
    popularity: 4.7,
    timeEstimate: "15-20 min",
    elements: scholarshipApplicationElements
  }
];
