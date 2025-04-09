
import { Automation, Trigger, Action } from "@/types/automation";
import { FormElement } from "@/types/form";
import { v4 as uuidv4 } from "uuid";

// Mock data for automations
const mockAutomations: Automation[] = [
  {
    id: uuidv4(),
    name: "Send email on form submission",
    formId: "form-1",
    enabled: true,
    trigger: {
      id: uuidv4(),
      type: "formSubmission",
      name: "Form is submitted",
    },
    actions: [
      {
        id: uuidv4(),
        type: "sendEmail",
        name: "Send email",
        config: {
          emailTo: "admin@example.com",
          emailSubject: "New form submission",
          emailBody: "You have received a new form submission.",
        },
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Tag high priority submissions",
    formId: "form-1",
    enabled: true,
    trigger: {
      id: uuidv4(),
      type: "fieldCondition",
      name: "Priority field equals 'High'",
      condition: {
        fieldId: "field-1",
        operator: "equals",
        value: "High",
      },
    },
    actions: [
      {
        id: uuidv4(),
        type: "tagSubmission",
        name: "Tag submission",
        config: {
          tagName: "high-priority",
        },
      },
      {
        id: uuidv4(),
        type: "sendEmail",
        name: "Send email",
        config: {
          emailTo: "urgent@example.com",
          emailSubject: "High priority submission",
          emailBody: "A high priority submission has been received.",
        },
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock form elements for testing
export const mockFormElements: FormElement[] = [
  {
    id: "field-1",
    type: "select",
    label: "Priority",
    position: { x: 100, y: 100 },
    size: { width: 300, height: 80 },
    placeholder: "Select priority",
    options: ["Low", "Medium", "High"],
    groupId: null,
  },
  {
    id: "field-2",
    type: "text",
    label: "Full Name",
    position: { x: 100, y: 200 },
    size: { width: 300, height: 80 },
    placeholder: "Enter your name",
    groupId: null,
  },
  {
    id: "field-3",
    type: "email",
    label: "Email Address",
    position: { x: 100, y: 300 },
    size: { width: 300, height: 80 },
    placeholder: "Enter your email",
    groupId: null,
  },
];

// Get all automations for a form
export const getAutomationsForForm = (formId: string): Promise<Automation[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAutomations.filter(a => a.formId === formId));
    }, 500);
  });
};

// Get all automations
export const getAllAutomations = (): Promise<Automation[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockAutomations]);
    }, 500);
  });
};

// Get an automation by ID
export const getAutomationById = (id: string): Promise<Automation | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAutomations.find(a => a.id === id));
    }, 300);
  });
};

// Create a new automation
export const createAutomation = (automation: Automation): Promise<Automation> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAutomation = {
        ...automation,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockAutomations.push(newAutomation);
      resolve(newAutomation);
    }, 500);
  });
};

// Update an existing automation
export const updateAutomation = (automation: Automation): Promise<Automation> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockAutomations.findIndex(a => a.id === automation.id);
      if (index === -1) {
        reject(new Error(`Automation with ID ${automation.id} not found`));
        return;
      }
      
      const updatedAutomation = {
        ...automation,
        updatedAt: new Date().toISOString(),
      };
      mockAutomations[index] = updatedAutomation;
      resolve(updatedAutomation);
    }, 500);
  });
};

// Delete an automation
export const deleteAutomation = (id: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockAutomations.findIndex(a => a.id === id);
      if (index === -1) {
        reject(new Error(`Automation with ID ${id} not found`));
        return;
      }
      
      mockAutomations.splice(index, 1);
      resolve(true);
    }, 500);
  });
};

// Toggle automation enabled status
export const toggleAutomationStatus = (id: string, enabled: boolean): Promise<Automation> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockAutomations.findIndex(a => a.id === id);
      if (index === -1) {
        reject(new Error(`Automation with ID ${id} not found`));
        return;
      }
      
      const updatedAutomation = {
        ...mockAutomations[index],
        enabled,
        updatedAt: new Date().toISOString(),
      };
      mockAutomations[index] = updatedAutomation;
      resolve(updatedAutomation);
    }, 300);
  });
};

// Execute an automation (mock implementation)
export const executeAutomation = (automation: Automation, formData: any): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Executing automation: ${automation.name}`);
      
      // Evaluate if the trigger conditions are met
      let triggerMatched = false;
      
      switch (automation.trigger.type) {
        case "formSubmission":
          triggerMatched = true;
          break;
          
        case "fieldFilled":
          if (automation.trigger.fieldId && formData[automation.trigger.fieldId]) {
            triggerMatched = true;
          }
          break;
          
        case "fieldCondition":
          if (automation.trigger.condition && automation.trigger.condition.fieldId) {
            const { fieldId, operator, value } = automation.trigger.condition;
            const fieldValue = formData[fieldId];
            
            if (fieldValue !== undefined) {
              switch (operator) {
                case "equals":
                  triggerMatched = fieldValue === value;
                  break;
                case "notEquals":
                  triggerMatched = fieldValue !== value;
                  break;
                case "contains":
                  triggerMatched = String(fieldValue).includes(String(value));
                  break;
                case "greaterThan":
                  triggerMatched = Number(fieldValue) > Number(value);
                  break;
                case "lessThan":
                  triggerMatched = Number(fieldValue) < Number(value);
                  break;
              }
            }
          }
          break;
      }
      
      // If the trigger conditions are met, execute the actions
      if (triggerMatched) {
        console.log(`Trigger conditions met for automation: ${automation.name}`);
        
        // Execute each action
        automation.actions.forEach(action => {
          console.log(`Executing action: ${action.name}`);
          
          switch (action.type) {
            case "sendEmail":
              console.log(`Sending email to: ${action.config.emailTo}`);
              console.log(`Subject: ${action.config.emailSubject}`);
              console.log(`Body: ${action.config.emailBody}`);
              break;
              
            case "webhook":
              console.log(`Calling webhook: ${action.config.webhookUrl}`);
              break;
              
            case "showConfirmation":
              console.log(`Showing confirmation: ${action.config.confirmationMessage}`);
              break;
              
            case "tagSubmission":
              console.log(`Tagging submission with: ${action.config.tagName}`);
              break;
          }
        });
        
        resolve(true);
      } else {
        console.log(`Trigger conditions not met for automation: ${automation.name}`);
        resolve(false);
      }
    }, 500);
  });
};
