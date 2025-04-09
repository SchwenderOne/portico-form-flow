
import { supabase } from "@/integrations/supabase/client";
import { DatabaseForm, DatabaseFormField, DatabaseFormResponse, DatabaseFormVersion, FormElement, FormMetadata } from "@/types/form";
import { toast } from "sonner";

// Form CRUD operations
export const createForm = async (title: string, description: string = "") => {
  try {
    // Get user ID first, then use it in the insert
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('forms')
      .insert({
        title, 
        description,
        created_by: userId
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as DatabaseForm;
  } catch (error: any) {
    toast.error("Failed to create form", { description: error.message });
    throw error;
  }
};

export const getForm = async (formId: string) => {
  try {
    const { data, error } = await supabase
      .from('forms')
      .select(`
        *,
        form_fields(*)
      `)
      .eq('id', formId)
      .single();
    
    if (error) throw error;
    return data as DatabaseForm & { form_fields: DatabaseFormField[] };
  } catch (error: any) {
    toast.error("Failed to fetch form", { description: error.message });
    throw error;
  }
};

export const getUserForms = async () => {
  try {
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data as DatabaseForm[];
  } catch (error: any) {
    toast.error("Failed to fetch forms", { description: error.message });
    throw error;
  }
};

export const updateForm = async (formId: string, updates: Partial<DatabaseForm>) => {
  try {
    const { data, error } = await supabase
      .from('forms')
      .update(updates)
      .eq('id', formId)
      .select()
      .single();
    
    if (error) throw error;
    return data as DatabaseForm;
  } catch (error: any) {
    toast.error("Failed to update form", { description: error.message });
    throw error;
  }
};

export const deleteForm = async (formId: string) => {
  try {
    const { error } = await supabase
      .from('forms')
      .delete()
      .eq('id', formId);
    
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast.error("Failed to delete form", { description: error.message });
    throw error;
  }
};

// Form fields operations
export const createFormField = async (formId: string, field: Omit<DatabaseFormField, 'id' | 'form_id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('form_fields')
      .insert({
        form_id: formId,
        ...field
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as DatabaseFormField;
  } catch (error: any) {
    toast.error("Failed to create form field", { description: error.message });
    throw error;
  }
};

export const updateFormField = async (fieldId: string, updates: Partial<DatabaseFormField>) => {
  try {
    const { data, error } = await supabase
      .from('form_fields')
      .update(updates)
      .eq('id', fieldId)
      .select()
      .single();
    
    if (error) throw error;
    return data as DatabaseFormField;
  } catch (error: any) {
    toast.error("Failed to update form field", { description: error.message });
    throw error;
  }
};

export const deleteFormField = async (fieldId: string) => {
  try {
    const { error } = await supabase
      .from('form_fields')
      .delete()
      .eq('id', fieldId);
    
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast.error("Failed to delete form field", { description: error.message });
    throw error;
  }
};

// Form versions operations
export const createFormVersion = async (formId: string, versionLabel: string, snapshot: any) => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from('form_versions')
      .insert({
        form_id: formId,
        version_label: versionLabel,
        created_by: userId,
        snapshot
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as DatabaseFormVersion;
  } catch (error: any) {
    toast.error("Failed to save form version", { description: error.message });
    throw error;
  }
};

export const getFormVersions = async (formId: string): Promise<DatabaseFormVersion[]> => {
  // In a real application, this would fetch versions from the database
  // For now, we'll return mock data based on the form ID
  
  // Mock data for different forms
  const mockVersions: Record<string, DatabaseFormVersion[]> = {
    "form-1": [
      {
        id: "v1-form-1",
        form_id: "form-1",
        version_label: "Initial Version",
        created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        created_by: "user-123",
        snapshot: {
          elements: [
            { id: "elem-1", type: "text", label: "Name", position: { x: 10, y: 10 }, size: { width: 200, height: 40 }, groupId: null }
          ],
          metadata: { title: "Customer Feedback Form", description: "Initial version", status: "draft" }
        }
      },
      {
        id: "v2-form-1",
        form_id: "form-1",
        version_label: "Added Email Field",
        created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        created_by: "user-123",
        snapshot: {
          elements: [
            { id: "elem-1", type: "text", label: "Name", position: { x: 10, y: 10 }, size: { width: 200, height: 40 }, groupId: null },
            { id: "elem-2", type: "email", label: "Email", position: { x: 10, y: 60 }, size: { width: 200, height: 40 }, groupId: null }
          ],
          metadata: { title: "Customer Feedback Form", description: "Added email field", status: "draft" }
        }
      },
      {
        id: "v3-form-1",
        form_id: "form-1",
        version_label: "Published Version",
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        created_by: "user-456",
        snapshot: {
          elements: [
            { id: "elem-1", type: "text", label: "Full Name", position: { x: 10, y: 10 }, size: { width: 200, height: 40 }, groupId: null },
            { id: "elem-2", type: "email", label: "Email Address", position: { x: 10, y: 60 }, size: { width: 200, height: 40 }, groupId: null },
            { id: "elem-3", type: "textarea", label: "Feedback", position: { x: 10, y: 110 }, size: { width: 400, height: 100 }, groupId: null }
          ],
          metadata: { title: "Customer Feedback Form", description: "Final version for publishing", status: "published" }
        }
      }
    ],
    "form-2": [
      {
        id: "v1-form-2",
        form_id: "form-2",
        version_label: "Initial Job Application",
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        created_by: "user-123",
        snapshot: {
          elements: [
            { id: "elem-1", type: "text", label: "Name", position: { x: 10, y: 10 }, size: { width: 200, height: 40 }, groupId: null },
            { id: "elem-2", type: "email", label: "Email", position: { x: 10, y: 60 }, size: { width: 200, height: 40 }, groupId: null }
          ],
          metadata: { title: "Job Application Form", description: "Basic job application", status: "draft" }
        }
      },
      {
        id: "v2-form-2",
        form_id: "form-2",
        version_label: "Added Education Fields",
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        created_by: "user-456",
        snapshot: {
          elements: [
            { id: "elem-1", type: "text", label: "Name", position: { x: 10, y: 10 }, size: { width: 200, height: 40 }, groupId: null },
            { id: "elem-2", type: "email", label: "Email", position: { x: 10, y: 60 }, size: { width: 200, height: 40 }, groupId: null },
            { id: "elem-3", type: "text", label: "Education", position: { x: 10, y: 110 }, size: { width: 200, height: 40 }, groupId: null }
          ],
          metadata: { title: "Job Application Form", description: "Added education fields", status: "draft" }
        }
      }
    ],
    "form-3": [
      {
        id: "v1-form-3",
        form_id: "form-3",
        version_label: "Event Registration Draft",
        created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        created_by: "user-456",
        snapshot: {
          elements: [
            { id: "elem-1", type: "text", label: "Name", position: { x: 10, y: 10 }, size: { width: 200, height: 40 }, groupId: null },
            { id: "elem-2", type: "email", label: "Email", position: { x: 10, y: 60 }, size: { width: 200, height: 40 }, groupId: null }
          ],
          metadata: { title: "Event Registration Form", description: "Basic registration form", status: "draft" }
        }
      }
    ]
  };
  
  // Return mock versions for the form or empty array if no versions exist
  return mockVersions[formId] || [];
};

export const getForms = async (): Promise<FormMetadata[]> => {
  // In a real application, this would fetch forms from the database
  // For now, we'll return mock data
  return [
    {
      id: "form-1",
      name: "Customer Feedback Form",
      description: "Collect feedback from customers about our services",
      status: "published",
      responsiblePerson: "Jane Doe",
      lastEditedBy: "John Smith",
      lastEditDate: new Date().toISOString(),
      tags: ["feedback", "customer"],
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "form-2",
      name: "Job Application Form",
      description: "Collect applications for open positions",
      status: "draft",
      responsiblePerson: "Jane Doe",
      lastEditedBy: "Jane Doe",
      lastEditDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["recruitment", "hr"],
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "form-3",
      name: "Event Registration Form",
      description: "Register participants for our annual conference",
      status: "review",
      responsiblePerson: "John Smith",
      lastEditedBy: "Jane Doe",
      lastEditDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["event", "registration"],
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ];
};

export const submitFormResponse = async (formId: string, responseData: any) => {
  try {
    const { data, error } = await supabase
      .from('form_responses')
      .insert({
        form_id: formId,
        response_data: responseData
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as DatabaseFormResponse;
  } catch (error: any) {
    toast.error("Failed to submit form response", { description: error.message });
    throw error;
  }
};

export const getFormResponses = async (formId: string) => {
  try {
    const { data, error } = await supabase
      .from('form_responses')
      .select('*')
      .eq('form_id', formId)
      .order('submitted_at', { ascending: false });
    
    if (error) throw error;
    return data as DatabaseFormResponse[];
  } catch (error: any) {
    toast.error("Failed to fetch form responses", { description: error.message });
    throw error;
  }
};

// Utility to convert between canvas form elements and database fields
export const convertElementsToFields = (elements: FormElement[]): Omit<DatabaseFormField, 'id' | 'form_id' | 'created_at' | 'updated_at'>[] => {
  return elements.map((element, index) => ({
    label: element.label || element.content || 'Unnamed element',
    type: element.type,
    order: index,
    settings: {
      position: element.position,
      size: element.size,
      required: element.required,
      placeholder: element.placeholder,
      helpText: element.helpText,
      validation: element.validation,
      content: element.content,
      options: element.options,
      groupId: element.groupId
    }
  }));
};

export const convertFieldsToElements = (fields: DatabaseFormField[]): FormElement[] => {
  return fields
    .sort((a, b) => a.order - b.order)
    .map(field => {
      const settings = field.settings as Record<string, any> || {};
      
      return {
        id: field.id,
        type: field.type,
        label: field.label,
        position: settings.position || { x: 100, y: 50 + (field.order * 100) },
        size: settings.size || { width: 500, height: field.type === 'header' ? 60 : 80 },
        required: settings.required || false,
        placeholder: settings.placeholder || '',
        helpText: settings.helpText || '',
        validation: settings.validation || undefined,
        content: settings.content || '',
        options: settings.options || [],
        groupId: settings.groupId || null,
      };
    });
};

// Save the entire form state (for auto-save or manual save)
export const saveFormState = async (formId: string, title: string, description: string, elements: FormElement[]) => {
  try {
    // First update the form metadata
    await updateForm(formId, { 
      title, 
      description,
      updated_at: new Date().toISOString()
    });
    
    // Get existing fields to determine what needs to be created, updated, or deleted
    const { data: existingFields, error } = await supabase
      .from('form_fields')
      .select('*')
      .eq('form_id', formId);
    
    if (error) throw error;
    
    // Convert elements to fields format
    const newFields = convertElementsToFields(elements);
    
    // Create a map of existing fields by their ids
    const existingFieldMap = new Map();
    for (const field of (existingFields as DatabaseFormField[])) {
      existingFieldMap.set(field.id, field);
    }
    
    // Update or create fields as needed
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      
      if (existingFieldMap.has(element.id)) {
        // Update existing field
        await updateFormField(element.id, {
          label: element.label || element.content || 'Unnamed element',
          type: element.type,
          order: i,
          settings: {
            position: element.position,
            size: element.size,
            required: element.required,
            placeholder: element.placeholder,
            helpText: element.helpText,
            validation: element.validation,
            content: element.content,
            options: element.options,
            groupId: element.groupId
          }
        });
        
        // Remove from map to track what's been processed
        existingFieldMap.delete(element.id);
      } else {
        // Create new field
        await createFormField(formId, {
          label: element.label || element.content || 'Unnamed element',
          type: element.type,
          order: i,
          settings: {
            position: element.position,
            size: element.size,
            required: element.required,
            placeholder: element.placeholder,
            helpText: element.helpText,
            validation: element.validation,
            content: element.content,
            options: element.options,
            groupId: element.groupId
          }
        });
      }
    }
    
    // Delete any fields that are no longer in the elements array
    for (const [id] of existingFieldMap) {
      await deleteFormField(id);
    }
    
    toast.success("Form saved successfully");
    return true;
  } catch (error: any) {
    toast.error("Failed to save form", { description: error.message });
    throw error;
  }
};
