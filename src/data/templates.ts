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
    checked: false
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
    checked: false
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
    checked: false
  },
  {
    id: "consent-conference",
    type: "checkbox",
    label: "I consent to being photographed and recorded during the event",
    required: true,
    position: { x: 100, y: 1010 },
    size: { width: 500, height: 80 },
    groupId: null,
    checked: false
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
