
import { FormElement } from "@/types/form";
import { TemplateData } from "@/types/template";

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

// Export event templates
export const eventTemplates: TemplateData[] = [
  {
    id: "event-registration",
    title: "Event Registration Form",
    description: "Registration form for collecting attendee information for events",
    category: "Events",
    industry: "Entertainment",
    created: "2024-03-01",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
    author: "Events Team",
    popularity: 4.7,
    timeEstimate: "5-7 min",
    elements: eventRegistrationElements
  },
  {
    id: "conference-registration",
    title: "Conference Registration Form",
    description: "Professional conference registration with session selection options",
    category: "Events",
    industry: "Corporate",
    created: "2024-02-10",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
    author: "Corporate Events",
    popularity: 4.6,
    timeEstimate: "7-10 min",
    elements: conferenceRegistrationElements
  }
];
