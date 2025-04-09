import { FormElement } from "@/types/form";
import { BrandSettings } from "@/types/brand";
import { format as formatDate } from "date-fns";

// Mock form response data for demonstration purposes
// In a real app, this would come from your database
export interface FormResponse {
  id: string;
  submittedAt: string;
  data: Record<string, any>;
}

const mockResponses: FormResponse[] = [
  {
    id: "resp-001",
    submittedAt: "2025-04-01T10:15:00Z",
    data: {
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      age: 32,
      feedback: "The service was excellent!"
    }
  },
  {
    id: "resp-002",
    submittedAt: "2025-04-02T14:30:00Z",
    data: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      age: 28,
      feedback: "Could use some improvements."
    }
  },
  {
    id: "resp-003",
    submittedAt: "2025-04-03T09:45:00Z",
    data: {
      fullName: "Alex Johnson",
      email: "alex.j@example.com",
      age: 45,
      feedback: "Very user-friendly interface."
    }
  }
];

// Comprehensive list of fields that contain personal information and should be anonymized
const sensitiveFields = [
  "fullName", "name", "firstName", "lastName", "middleName", 
  "email", "emailAddress", 
  "address", "streetAddress", "city", "state", "country", "zipCode", "postalCode",
  "phone", "phoneNumber", "mobileNumber", "cellPhone", 
  "ssn", "socialSecurity", "socialSecurityNumber", "taxId", "passport",
  "dob", "dateOfBirth", "birthDate", "birthplace",
  "creditCard", "cardNumber", "cvv", "ccv", "cvc",
  "bankAccount", "accountNumber", "routingNumber",
  "license", "licenseNumber", "driversLicense"
];

// Function to determine if a field is sensitive
const isSensitiveField = (fieldName: string): boolean => {
  return sensitiveFields.some(field => 
    fieldName.toLowerCase().includes(field.toLowerCase())
  );
};

// Function to anonymize sensitive data
const anonymizeData = (data: Record<string, any>): Record<string, any> => {
  const anonymized = { ...data };
  
  Object.keys(anonymized).forEach(key => {
    if (isSensitiveField(key)) {
      if (typeof anonymized[key] === 'string') {
        if (key.toLowerCase().includes('email')) {
          // Special handling for email to maintain format
          const username = "user_" + Math.random().toString(36).substring(2, 8);
          const domain = anonymized[key].split('@')[1] || "example.com";
          anonymized[key] = `${username}@${domain}`;
        } else if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('ssn') || key.toLowerCase().includes('license')) {
          // Maintain format for numbers by replacing with X's but keeping separators
          anonymized[key] = anonymized[key].replace(/\d/g, 'X');
        } else {
          // Replace with [REDACTED]
          anonymized[key] = "[REDACTED]";
        }
      } else if (typeof anonymized[key] === 'number') {
        // For numeric fields like age, credit scores, etc.
        if (key.toLowerCase().includes('age')) {
          // Keep age range but not exact age
          const age = anonymized[key];
          const ageRange = Math.floor(age / 10) * 10;
          anonymized[key] = `${ageRange}-${ageRange + 9}`;
        } else {
          // Other numbers get randomized
          anonymized[key] = Math.floor(Math.random() * 100);
        }
      }
    }
  });
  
  return anonymized;
};

// Get form responses (would fetch from API in real app)
export const getFormResponses = (): FormResponse[] => {
  return mockResponses;
};

// Export to JSON
export const exportToJSON = (
  formElements: FormElement[], 
  anonymize: boolean = false
): string => {
  let responses = getFormResponses();
  
  if (anonymize) {
    responses = responses.map(response => ({
      ...response,
      data: anonymizeData(response.data)
    }));
  }
  
  const exportData = {
    exportedAt: new Date().toISOString(),
    formElements,
    responses
  };
  
  return JSON.stringify(exportData, null, 2);
};

// Export to CSV
export const exportToCSV = (
  formElements: FormElement[], 
  anonymize: boolean = false
): string => {
  let responses = getFormResponses();
  
  if (anonymize) {
    responses = responses.map(response => ({
      ...response,
      data: anonymizeData(response.data)
    }));
  }
  
  // Get all unique keys from all responses
  const allKeys = new Set<string>();
  responses.forEach(response => {
    Object.keys(response.data).forEach(key => allKeys.add(key));
  });
  
  // Create header row
  const headers = ["Response ID", "Submitted At", ...Array.from(allKeys)];
  const csvRows = [headers.join(",")];
  
  // Add data rows
  responses.forEach(response => {
    const row = [
      response.id,
      response.submittedAt,
      ...Array.from(allKeys).map(key => {
        const value = response.data[key] || "";
        // Escape commas and quotes for CSV
        return typeof value === 'string' 
          ? `"${value.replace(/"/g, '""')}"`
          : value;
      })
    ];
    csvRows.push(row.join(","));
  });
  
  return csvRows.join("\n");
};

// Helper function to generate a filename with current date
export const generateExportFilename = (format: string, anonymized: boolean): string => {
  const date = formatDate(new Date(), "yyyy-MM-dd");
  const anonymizedPrefix = anonymized ? "anonymized-" : "";
  return `portico-form-${anonymizedPrefix}export-${date}.${format}`;
};

// Function to trigger download of file
export const downloadFile = (
  content: string, 
  filename: string, 
  contentType: string
): void => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};

// Helper for PDF export - this would integrate with a PDF library in a real app
export const preparePdfExport = (
  formElements: FormElement[], 
  brandSettings: BrandSettings,
  includeBranding: boolean,
  anonymize: boolean
): object => {
  // Get data
  let responses = getFormResponses();
  
  if (anonymize) {
    responses = responses.map(response => ({
      ...response,
      data: anonymizeData(response.data)
    }));
  }
  
  // Prepare metadata for PDF generation
  const pdfData = {
    title: "Form Responses Export",
    date: new Date().toISOString(),
    formElements,
    responses,
    branding: includeBranding ? {
      logo: brandSettings.identity.logoUrl,
      primaryColor: brandSettings.colors.primary,
      fontFamily: brandSettings.typography.fontFamily,
      brandName: brandSettings.identity.brandName
    } : null
  };
  
  // In a real app, this would generate the actual PDF using a library
  // For this demo, we'll return the data that would be used to generate the PDF
  return pdfData;
};

// Test the anonymization with sample data
export const testAnonymization = () => {
  const testData = {
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    ssn: "123-45-6789",
    age: 42,
    feedback: "This is a test comment"
  };
  
  console.log("Original data:", testData);
  console.log("Anonymized data:", anonymizeData(testData));
  
  return anonymizeData(testData);
};
