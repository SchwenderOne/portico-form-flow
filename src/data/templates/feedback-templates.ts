import { FormElement } from "@/types/form";
import { TemplateData } from "@/types/template";

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

// Export feedback templates
export const feedbackTemplates: TemplateData[] = [
  {
    id: "customer-feedback",
    title: "Customer Feedback Survey",
    description: "Collect detailed feedback about your products or services",
    category: "Feedback",
    industry: "Various",
    created: "2024-03-10",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=1974&auto=format&fit=crop",
    author: "Customer Experience",
    popularity: 4.7,
    timeEstimate: "5-8 min",
    elements: feedbackElements
  },
  {
    id: "simple-feedback",
    title: "Quick Feedback Form",
    description: "Short form for gathering essential feedback with minimal user effort",
    category: "Feedback",
    industry: "Various",
    created: "2024-01-25",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2070&auto=format&fit=crop",
    popularity: 4.9,
    timeEstimate: "2-3 min",
    elements: simpleFeedbackElements
  }
];
