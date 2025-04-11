
import { FormElement } from "@/types/form";

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
    checked: false,
    onCheckedChange: () => {}
  }
];

// Customer Feedback Survey with comprehensive fields
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
    placeholder: "Enter your name (optional)",
    required: false,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "email-feedback",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email (optional)",
    required: false,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "product-feedback",
    type: "text",
    label: "Product/Service Used",
    placeholder: "Which product or service are you reviewing?",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "rating-feedback",
    type: "select",
    label: "How would you rate our service?",
    required: true,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Excellent", "Good", "Average", "Poor", "Very Poor"]
  },
  {
    id: "ease-feedback",
    type: "select",
    label: "How easy was it to use our product/service?",
    required: true,
    position: { x: 100, y: 530 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Very Easy", "Easy", "Neutral", "Difficult", "Very Difficult"]
  },
  {
    id: "recommend-feedback",
    type: "select",
    label: "How likely are you to recommend us?",
    required: true,
    position: { x: 100, y: 630 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Very Likely", "Likely", "Neutral", "Unlikely", "Very Unlikely"]
  },
  {
    id: "comments-feedback",
    type: "textarea",
    label: "Additional Comments",
    placeholder: "Please share any additional feedback",
    required: false,
    position: { x: 100, y: 730 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "improvements-feedback",
    type: "textarea",
    label: "Suggested Improvements",
    placeholder: "How can we improve our product/service?",
    required: false,
    position: { x: 100, y: 870 },
    size: { width: 500, height: 120 },
    groupId: null
  }
];

// Simple Feedback Survey (shortened version)
const simpleFeedbackElements: FormElement[] = [
  {
    id: "header-simple-feedback",
    type: "header",
    content: "Quick Feedback Survey",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "rating-simple-feedback",
    type: "select",
    label: "How would you rate your experience?",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Excellent", "Good", "Average", "Poor", "Very Poor"]
  },
  {
    id: "recommend-simple-feedback",
    type: "select",
    label: "Would you recommend us to others?",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Yes", "Maybe", "No"]
  },
  {
    id: "comments-simple-feedback",
    type: "textarea",
    label: "Comments",
    placeholder: "Any additional feedback?",
    required: false,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 120 },
    groupId: null
  }
];

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
    checked: false,
    onCheckedChange: () => {}
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

// Event Registration Form
const eventRegistrationElements: FormElement[] = [
  {
    id: "header-event",
    type: "header",
    content: "Event Registration Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "name-event",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "email-event",
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
    id: "phone-event",
    type: "text",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "ticket-event",
    type: "select",
    label: "Ticket Type",
    required: true,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["General Admission", "VIP", "Early Bird", "Group"]
  },
  {
    id: "quantity-event",
    type: "number",
    label: "Number of Tickets",
    placeholder: "Enter number of tickets",
    required: true,
    position: { x: 100, y: 530 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "dietary-event",
    type: "textarea",
    label: "Dietary Requirements",
    placeholder: "Enter any dietary restrictions or preferences",
    required: false,
    position: { x: 100, y: 630 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "accessibility-event",
    type: "textarea",
    label: "Accessibility Requirements",
    placeholder: "Enter any accessibility needs",
    required: false,
    position: { x: 100, y: 770 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "hear-event",
    type: "select",
    label: "How did you hear about this event?",
    required: false,
    position: { x: 100, y: 910 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Social Media", "Email", "Word of Mouth", "Website", "Advertisement", "Other"]
  },
  {
    id: "terms-event",
    type: "checkbox",
    label: "I agree to the terms and conditions",
    required: true,
    position: { x: 100, y: 1010 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false,
    onCheckedChange: () => {}
  }
];

// Conference Registration Form (variation of event registration)
const conferenceRegistrationElements: FormElement[] = [
  {
    id: "header-conference",
    type: "header",
    content: "Conference Registration Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "name-conference",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "email-conference",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "organization-conference",
    type: "text",
    label: "Organization/Company",
    placeholder: "Enter your organization or company name",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "job-conference",
    type: "text",
    label: "Job Title",
    placeholder: "Enter your job title",
    required: true,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "package-conference",
    type: "select",
    label: "Registration Package",
    required: true,
    position: { x: 100, y: 530 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Full Conference", "Single Day", "Workshop Only", "Virtual Attendance"]
  },
  {
    id: "workshops-conference",
    type: "textarea",
    label: "Workshop Preferences",
    placeholder: "List workshops you'd like to attend",
    required: false,
    position: { x: 100, y: 630 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "dietary-conference",
    type: "textarea",
    label: "Dietary Requirements",
    placeholder: "List any dietary restrictions",
    required: false,
    position: { x: 100, y: 770 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "networking-conference",
    type: "checkbox",
    label: "I would like to participate in networking events",
    required: false,
    position: { x: 100, y: 910 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false,
    onCheckedChange: () => {}
  },
  {
    id: "consent-conference",
    type: "checkbox",
    label: "I consent to being photographed and recorded during the event",
    required: true,
    position: { x: 100, y: 1010 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false,
    onCheckedChange: () => {}
  }
];

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
  },
  {
    id: "program-grant",
    type: "text",
    label: "Grant Program",
    placeholder: "Enter name of grant program applying for",
    required: true,
    position: { x: 100, y: 770 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "amount-grant",
    type: "number",
    label: "Requested Amount ($)",
    placeholder: "Enter amount requested",
    required: true,
    position: { x: 100, y: 870 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "purpose-grant",
    type: "textarea",
    label: "Purpose of Grant",
    placeholder: "Describe the purpose of this grant request",
    required: true,
    position: { x: 100, y: 970 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "timeline-grant",
    type: "textarea",
    label: "Project Timeline",
    placeholder: "Describe the timeline for implementation",
    required: true,
    position: { x: 100, y: 1110 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "outcomes-grant",
    type: "textarea",
    label: "Expected Outcomes",
    placeholder: "Describe the expected outcomes and impact",
    required: true,
    position: { x: 100, y: 1250 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "certification-grant",
    type: "checkbox",
    label: "I certify that all information provided is true and accurate",
    required: true,
    position: { x: 100, y: 1390 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false,
    onCheckedChange: () => {}
  }
];

// Research Consent Form
const researchConsentElements: FormElement[] = [
  {
    id: "header-consent",
    type: "header",
    content: "Research Consent Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "name-consent",
    type: "text",
    label: "Participant Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "email-consent",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "phone-consent",
    type: "text",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "dob-consent",
    type: "date",
    label: "Date of Birth",
    required: true,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "study-info",
    type: "header",
    content: "Study Information",
    position: { x: 100, y: 530 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "risks-consent",
    type: "textarea",
    label: "Risks and Discomforts",
    placeholder: "I understand the following risks associated with this study...",
    required: true,
    position: { x: 100, y: 610 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "benefits-consent",
    type: "textarea",
    label: "Benefits",
    placeholder: "I understand the following benefits of participating in this study...",
    required: true,
    position: { x: 100, y: 750 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "privacy-consent",
    type: "checkbox",
    label: "I understand how my data will be used and my privacy rights",
    required: true,
    position: { x: 100, y: 890 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false,
    onCheckedChange: () => {}
  },
  {
    id: "withdraw-consent",
    type: "checkbox",
    label: "I understand I can withdraw from the study at any time",
    required: true,
    position: { x: 100, y: 990 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false,
    onCheckedChange: () => {}
  },
  {
    id: "questions-consent",
    type: "checkbox",
    label: "I have had the opportunity to ask questions about the study",
    required: true,
    position: { x: 100, y: 1090 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false,
    onCheckedChange: () => {}
  },
  {
    id: "participate-consent",
    type: "checkbox",
    label: "I voluntarily agree to participate in this research study",
    required: true,
    position: { x: 100, y: 1190 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false,
    onCheckedChange: () => {}
  },
  {
    id: "date-consent",
    type: "date",
    label: "Today's Date",
    required: true,
    position: { x: 100, y: 1290 },
    size: { width: 500, height: 80 },
    groupId: null
  }
];

// Contact Information Update Form
const contactInfoElements: FormElement[] = [
  {
    id: "header-contact",
    type: "header",
    content: "Contact Information Update",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "name-contact",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null,
    helpText: "Please enter your current legal name"
  },
  {
    id: "email-contact",
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
    id: "phone-contact",
    type: "text",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    required: false,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "address-contact",
    type: "textarea",
    label: "Current Address",
    placeholder: "Enter your current address",
    required: true,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "city-contact",
    type: "text",
    label: "City",
    placeholder: "Enter your city",
    required: true,
    position: { x: 100, y: 570 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "state-contact",
    type: "text",
    label: "State/Province",
    placeholder: "Enter your state or province",
    required: true,
    position: { x: 100, y: 670 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "zip-contact",
    type: "text",
    label: "ZIP/Postal Code",
    placeholder: "Enter your ZIP or postal code",
    required: true,
    position: { x: 100, y: 770 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "country-contact",
    type: "text",
    label: "Country",
    placeholder: "Enter your country",
    required: true,
    position: { x: 100, y: 870 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "preferred-contact",
    type: "select",
    label: "Preferred Contact Method",
    required: true,
    position: { x: 100, y: 970 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Email", "Phone", "Mail"]
  }
];

// Employee Onboarding Form
const employeeOnboardingElements: FormElement[] = [
  {
    id: "header-onboarding",
    type: "header",
    content: "Employee Onboarding Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "name-onboarding",
    type: "text",
    label: "Full Legal Name",
    placeholder: "Enter your full legal name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "email-onboarding",
    type: "email",
    label: "Personal Email Address",
    placeholder: "Enter your personal email address",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "phone-onboarding",
    type: "text",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "address-onboarding",
    type: "textarea",
    label: "Home Address",
    placeholder: "Enter your home address",
    required: true,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "dob-onboarding",
    type: "date",
    label: "Date of Birth",
    required: true,
    position: { x: 100, y: 570 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "ssn-onboarding",
    type: "text",
    label: "Social Security Number",
    placeholder: "XXX-XX-XXXX",
    required: true,
    position: { x: 100, y: 670 },
    size: { width: 500, height: 80 },
    groupId: null,
    helpText: "This information is kept secure and encrypted"
  },
  {
    id: "position-onboarding",
    type: "text",
    label: "Job Title",
    placeholder: "Enter your job title",
    required: true,
    position: { x: 100, y: 770 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "department-onboarding",
    type: "text",
    label: "Department",
    placeholder: "Enter your department",
    required: true,
    position: { x: 100, y: 870 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "start-onboarding",
    type: "date",
    label: "Start Date",
    required: true,
    position: { x: 100, y: 970 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "emergency-name-onboarding",
    type: "text",
    label: "Emergency Contact Name",
    placeholder: "Enter emergency contact name",
    required: true,
    position: { x: 100, y: 1070 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "emergency-phone-onboarding",
    type: "text",
    label: "Emergency Contact Phone",
    placeholder: "Enter emergency contact phone",
    required: true,
    position: { x: 100, y: 1170 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "direct-deposit-onboarding",
    type: "checkbox",
    label: "I would like to set up direct deposit",
    required: false,
    position: { x: 100, y: 1270 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false,
    onCheckedChange: () => {}
  },
  {
    id: "acknowledgment-onboarding",
    type: "checkbox",
    label: "I acknowledge receipt of company policies and employee handbook",
    required: true,
    position: { x: 100, y: 1370 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false,
    onCheckedChange: () => {}
  }
];

// Donation Form
const donationElements: FormElement[] = [
  {
    id: "header-donation",
    type: "header",
    content: "Donation Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "name-donation",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "email-donation",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "phone-donation",
    type: "text",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    required: false,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "address-donation",
    type: "textarea",
    label: "Mailing Address",
    placeholder: "Enter your mailing address",
    required: true,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "amount-donation",
    type: "select",
    label: "Donation Amount",
    required: true,
    position: { x: 100, y: 570 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["$25", "$50", "$100", "$250", "$500", "Other"]
  },
  {
    id: "other-amount-donation",
    type: "number",
    label: "Other Amount ($)",
    placeholder: "Enter custom donation amount",
    required: false,
    position: { x: 100, y: 670 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "frequency-donation",
    type: "select",
    label: "Donation Frequency",
    required: true,
    position: { x: 100, y: 770 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["One-time", "Monthly", "Quarterly", "Annually"]
  },
  {
    id: "designation-donation",
    type: "select",
    label: "Donation Designation",
    required: false,
    position: { x: 100, y: 870 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["General Fund", "Program Support", "Scholarship Fund", "Emergency Relief", "Other"]
  },
  {
    id: "comments-donation",
    type: "textarea",
    label: "Comments",
    placeholder: "Additional comments or special instructions",
    required: false,
    position: { x: 100, y: 970 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "anonymous-donation",
    type: "checkbox",
    label: "I wish to remain anonymous",
    required: false,
    position: { x: 100, y: 1110 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false,
    onCheckedChange: () => {}
  },
  {
    id: "newsletter-donation",
    type: "checkbox",
    label: "Please send me newsletters and updates",
    required: false,
    position: { x: 100, y: 1210 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false,
    onCheckedChange: () => {}
  }
];

// Incident Report Form
const incidentReportElements: FormElement[] = [
  {
    id: "header-incident",
    type: "header",
    content: "Incident Report Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "reporter-incident",
    type: "text",
    label: "Reporter Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "email-incident",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "phone-incident",
    type: "text",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "date-incident",
    type: "date",
    label: "Date of Incident",
    required: true,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "time-incident",
    type: "text",
    label: "Time of Incident",
    placeholder: "e.g., 2:30 PM",
    required: true,
    position: { x: 100, y: 530 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "location-incident",
    type: "text",
    label: "Location of Incident",
    placeholder: "Enter where the incident occurred",
    required: true,
    position: { x: 100, y: 630 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "type-incident",
    type: "select",
    label: "Type of Incident",
    required: true,
    position: { x: 100, y: 730 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Injury", "Property Damage", "Theft", "Harassment", "Near Miss", "Other"]
  },
  {
    id: "description-incident",
    type: "textarea",
    label: "Incident Description",
    placeholder: "Describe in detail what happened",
    required: true,
    position: { x: 100, y: 830 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "actions-incident",
    type: "textarea",
    label: "Actions Taken",
    placeholder: "Describe any actions taken immediately after the incident",
    required: false,
    position: { x: 100, y: 970 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "witnesses-incident",
    type: "textarea",
    label: "Witnesses",
    placeholder: "List names and contact information of any witnesses",
    required: false,
    position: { x: 100, y: 1110 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "followup-incident",
    type: "textarea",
    label: "Follow-up Required",
    placeholder: "Describe any follow-up actions needed",
    required: false,
    position: { x: 100, y: 1250 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "accuracy-incident",
    type: "checkbox",
    label: "I confirm that all information provided is accurate to the best of my knowledge",
    required: true,
    position: { x: 100, y: 1390 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false,
    onCheckedChange: () => {}
  }
];

// Membership Application Form
const membershipApplicationElements: FormElement[] = [
  {
    id: "header-membership",
    type: "header",
    content: "Membership Application Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "name-membership",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "email-membership",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "phone-membership",
    type: "text",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "address-membership",
    type: "textarea",
    label: "Mailing Address",
    placeholder: "Enter your full mailing address",
    required: true,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "dob-membership",
    type: "date",
    label: "Date of Birth",
    required: true,
    position: { x: 100, y: 570 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "occupation-membership",
    type: "text",
    label: "Occupation",
    placeholder: "Enter your current occupation",
    required: false,
    position: { x: 100, y: 670 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "employer-membership",
    type: "text",
    label: "Employer",
    placeholder: "Enter your employer name",
    required: false,
    position: { x: 100, y: 770 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "type-membership",
    type: "select",
    label: "Membership Type",
    required: true,
    position: { x: 100, y: 870 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Individual", "Family", "Student", "Senior", "Corporate", "Lifetime"]
  },
  {
    id: "duration-membership",
    type: "select",
    label: "Membership Duration",
    required: true,
    position: { x: 100, y: 970 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["1 Year", "2 Years", "3 Years", "5 Years", "Lifetime"]
  },
  {
    id: "interests-membership",
    type: "textarea",
    label: "Areas of Interest",
    placeholder: "Please list your relevant interests",
    required: false,
    position: { x: 100, y: 1070 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "how-membership",
    type: "select",
    label: "How did you hear about us?",
    required: false,
    position: { x: 100, y: 1210 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Word of mouth", "Website", "Social media", "Event", "Advertisement", "Referral", "Other"]
  },
  {
    id: "communications-membership",
    type: "checkbox",
    label: "I wish to receive communications and newsletters",
    required: false,
    position: { x: 100, y: 1310 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: true,
    onCheckedChange: () => {}
  },
  {
    id: "terms-membership",
    type: "checkbox",
    label: "I agree to the terms and conditions of membership",
    required: true,
    position: { x: 100, y: 1410 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false,
    onCheckedChange: () => {}
  }
];

// Student Registration Form
const studentRegistrationElements: FormElement[] = [
  {
    id: "header-student",
    type: "header",
    content: "Student Registration Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "name-student",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full legal name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "preferred-student",
    type: "text",
    label: "Preferred Name",
    placeholder: "Enter your preferred name (if different)",
    required: false,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "dob-student",
    type: "date",
    label: "Date of Birth",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "email-student",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    position: { x: 100, y: 430 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "phone-student",
    type: "text",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    required: true,
    position: { x: 100, y: 530 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "address-student",
    type: "textarea",
    label: "Current Address",
    placeholder: "Enter your full address",
    required: true,
    position: { x: 100, y: 630 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "program-student",
    type: "select",
    label: "Program of Study",
    required: true,
    position: { x: 100, y: 770 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Business Administration", "Computer Science", "Engineering", "Liberal Arts", "Mathematics", "Science", "Fine Arts", "Other"]
  },
  {
    id: "level-student",
    type: "select",
    label: "Academic Level",
    required: true,
    position: { x: 100, y: 870 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Freshman", "Sophomore", "Junior", "Senior", "Graduate", "Non-Degree"]
  },
  {
    id: "start-student",
    type: "select",
    label: "Starting Term",
    required: true,
    position: { x: 100, y: 970 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["Fall 2025", "Spring 2026", "Summer 2026"]
  },
  {
    id: "previous-student",
    type: "textarea",
    label: "Previous Education",
    placeholder: "List previous schools attended, dates, and degrees earned",
    required: true,
    position: { x: 100, y: 1070 },
    size: { width: 500, height: 120 },
    groupId: null
  },
  {
    id: "emergency-name-student",
    type: "text",
    label: "Emergency Contact Name",
    placeholder: "Enter emergency contact name",
    required: true,
    position: { x: 100, y: 1210 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "emergency-phone-student",
    type: "text",
    label: "Emergency Contact Phone",
    placeholder: "Enter emergency contact phone",
    required: true,
    position: { x: 100, y: 1310 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "housing-student",
    type: "select",
    label: "Housing Preference",
    required: false,
    position: { x: 100, y: 1410 },
    size: { width: 500, height: 80 },
    groupId: null,
    options: ["On Campus", "Off Campus", "Commuter", "Undecided"]
  },
  {
    id: "disability-student",
    type: "checkbox",
    label: "I may need accommodation for a disability",
    required: false,
    position: { x: 100, y: 1510 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false,
    onCheckedChange: () => {}
  },
  {
    id: "consent-student",
    type: "checkbox",
    label: "I acknowledge that the information provided is accurate and complete",
    required: true,
    position: { x: 100, y: 1610 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false,
    onCheckedChange: () => {}
  }
];

// Generic Contact Form (simplified version)
const genericElements: FormElement[] = [
  {
    id: "header-generic",
    type: "header",
    content: "Contact Form",
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
  },
  {
    id: "message-generic",
    type: "textarea",
    label: "Message",
    placeholder: "Please enter your message",
    required: true,
    position: { x: 100, y: 330 },
    size: { width: 500, height: 120 },
    groupId: null
  }
];

export const templatesData = [
  {
    id: "1",
    title: "Job Application Form",
    description: "Standard job application form with all required fields including work experience, education, and skills.",
    category: "HR",
    industry: "Recruitment",
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&q=80&w=400&h=250",
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
    image: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?auto=format&fit=crop&q=80&w=400&h=250",
    created: "2023-09-05",
    author: "Marketing Team",
    popularity: 4.6,
    timeEstimate: "2-3 mins",
    elements: feedbackElements
  },
  {
    id: "13",
    title: "Quick Feedback Survey",
    description: "Simple, quick feedback form to gather essential customer opinions with minimal time commitment.",
    category: "Feedback",
    industry: "Various",
    image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&q=80&w=400&h=250",
    created: "2023-11-15",
    author: "CX Team",
    popularity: 4.3,
    timeEstimate: "1 min",
    elements: simpleFeedbackElements
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
    id: "14",
    title: "Medical History Form",
    description: "Detailed medical history form for healthcare providers to collect patient health information.",
    category: "Healthcare",
    industry: "Medical",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=400&h=250",
    created: "2024-01-15",
    author: "Medical Team",
    popularity: 4.7,
    timeEstimate: "5-8 mins",
    elements: medicalHistoryElements
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
    elements: eventRegistrationElements
  },
  {
    id: "15",
    title: "Conference Registration",
    description: "Comprehensive registration form for professional conferences with session and workshop selection.",
    category: "Events",
    industry: "Professional",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=400&h=250",
    created: "2024-02-05",
    author: "Conference Team",
    popularity: 4.8,
    timeEstimate: "4-6 mins",
    elements: conferenceRegistrationElements
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
    elements: governmentGrantElements
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
    elements: researchConsentElements
  },
  {
    id: "7",
    title: "Contact Information Update",
    description: "Simple form to update contact information for existing customers or members.",
    category: "Administrative",
    industry: "Various",
    image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=400&h=250", 
    created: "2023-07-22",
    author: "Admin Team",
    popularity: 4.2,
    timeEstimate: "1-2 mins",
    elements: contactInfoElements
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
    elements: employeeOnboardingElements
  },
  {
    id: "16",
    title: "Comprehensive Job Application",
    description: "Extended job application form with detailed sections for work history, references, and relocation preferences.",
    category: "HR",
    industry: "Recruitment",
    image: "https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?auto=format&fit=crop&q=80&w=400&h=250",
    created: "2024-01-22",
    author: "Talent Acquisition",
    popularity: 4.9,
    timeEstimate: "12-15 mins",
    elements: jobApplicationExtendedElements
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
    elements: donationElements
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
    elements: incidentReportElements
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
    elements: membershipApplicationElements
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
    elements: studentRegistrationElements
  }
];

