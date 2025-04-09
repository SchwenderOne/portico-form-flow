
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

// Fields that contain personal information and should be anonymized
const sensitiveFields = ["fullName", "email", "address", "phone", "ssn"];

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
          anonymized[key] = "user_" + Math.random().toString(36).substring(2, 8) + "@example.com";
        } else {
          // Replace with [REDACTED]
          anonymized[key] = "[REDACTED]";
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
): string => {
  // In a real app, this would generate the actual PDF
  // For now, we'll return a message that would be shown to the user
  return "PDF generation would be implemented with a library like jsPDF or react-pdf";
};
