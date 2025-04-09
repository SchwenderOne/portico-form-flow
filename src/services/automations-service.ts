
import { v4 as uuidv4 } from "uuid";
import { Automation, Trigger, Action } from "@/types/automation";
import { FormElement } from "@/types/form";
import { toast } from "sonner";

// Mock data storage - in a real app, this would be a database
let automations: Automation[] = [
  {
    id: "auto-1",
    name: "Send confirmation email on submission",
    formId: "form-1",
    enabled: true,
    trigger: {
      id: "trigger-1",
      type: "formSubmission",
      name: "Form is submitted"
    },
    actions: [
      {
        id: "action-1",
        type: "sendEmail",
        name: "Send email",
        config: {
          emailTo: "admin@example.com",
          emailSubject: "New form submission",
          emailBody: "You have received a new form submission. Please check your dashboard."
        }
      }
    ],
    createdAt: "2025-04-01T10:00:00Z",
    updatedAt: "2025-04-01T10:00:00Z"
  }
];

// Mock form elements for development
export const mockFormElements: FormElement[] = [
  {
    id: "field-1",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 50 },
    size: { width: 300, height: 80 },
    groupId: null
  },
  {
    id: "field-2",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    required: true,
    position: { x: 100, y: 150 },
    size: { width: 300, height: 80 },
    groupId: null
  },
  {
    id: "field-3",
    type: "number",
    label: "Age",
    placeholder: "Enter your age",
    required: false,
    position: { x: 100, y: 250 },
    size: { width: 300, height: 80 },
    groupId: null
  },
  {
    id: "field-4",
    type: "select",
    label: "Country",
    placeholder: "Select your country",
    required: true,
    options: ["United States", "Canada", "United Kingdom"],
    position: { x: 100, y: 350 },
    size: { width: 300, height: 100 },
    groupId: null
  },
  {
    id: "field-5",
    type: "textarea",
    label: "Additional Comments",
    placeholder: "Enter any additional comments",
    required: false,
    position: { x: 100, y: 450 },
    size: { width: 300, height: 120 },
    groupId: null
  }
];

// Get all automations
export const getAllAutomations = async (): Promise<Automation[]> => {
  // In a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(automations);
    }, 500);
  });
};

// Get automation by ID
export const getAutomationById = async (id: string): Promise<Automation | null> => {
  // In a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      const automation = automations.find(a => a.id === id) || null;
      resolve(automation);
    }, 300);
  });
};

// Create new automation
export const createAutomation = async (automation: Automation): Promise<Automation> => {
  // In a real app, this would send to an API
  return new Promise((resolve) => {
    // Ensure it has an ID and timestamps
    const newAutomation: Automation = {
      ...automation,
      id: automation.id || uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setTimeout(() => {
      automations.push(newAutomation);
      resolve(newAutomation);
    }, 500);
  });
};

// Update automation
export const updateAutomation = async (automation: Automation): Promise<Automation> => {
  // In a real app, this would send to an API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = automations.findIndex(a => a.id === automation.id);
      
      if (index === -1) {
        reject(new Error("Automation not found"));
        return;
      }
      
      const updatedAutomation: Automation = {
        ...automation,
        updatedAt: new Date().toISOString()
      };
      
      automations[index] = updatedAutomation;
      resolve(updatedAutomation);
    }, 500);
  });
};

// Delete automation
export const deleteAutomation = async (id: string): Promise<void> => {
  // In a real app, this would send to an API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = automations.length;
      automations = automations.filter(a => a.id !== id);
      
      if (automations.length === initialLength) {
        reject(new Error("Automation not found"));
        return;
      }
      
      resolve();
    }, 500);
  });
};

// Toggle automation enabled/disabled status
export const toggleAutomationStatus = async (id: string, enabled: boolean): Promise<Automation> => {
  // In a real app, this would send to an API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = automations.findIndex(a => a.id === id);
      
      if (index === -1) {
        reject(new Error("Automation not found"));
        return;
      }
      
      const updatedAutomation: Automation = {
        ...automations[index],
        enabled,
        updatedAt: new Date().toISOString()
      };
      
      automations[index] = updatedAutomation;
      resolve(updatedAutomation);
    }, 300);
  });
};

// Test automation (simulate execution)
export const testAutomation = async (automation: Automation): Promise<boolean> => {
  console.log(`Testing automation: ${automation.name}`);
  
  // Log the trigger
  console.log(`Trigger: ${automation.trigger.name}`);
  
  // Log each action
  automation.actions.forEach(action => {
    console.log(`Action: ${action.name}`);
    console.log('Config:', action.config);
  });
  
  // Simulate processing time
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would actually test the automation logic
      toast.success("Automation test completed", {
        description: `${automation.name} executed successfully in test mode`
      });
      resolve(true);
    }, 1500);
  });
};

// Execute automation with real data (for demonstration)
export const executeAutomation = async (automationId: string, payload: any): Promise<boolean> => {
  const automation = await getAutomationById(automationId);
  
  if (!automation) {
    toast.error("Automation not found");
    return false;
  }
  
  if (!automation.enabled) {
    toast.error("Automation is disabled");
    return false;
  }
  
  console.log(`Executing automation: ${automation.name}`, payload);
  
  // In a real app, this would actually execute the automation
  toast.success("Automation executed", {
    description: `${automation.name} was triggered and executed`
  });
  
  return true;
};
