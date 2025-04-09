
import { supabase } from "@/integrations/supabase/client";
import { DatabaseForm, DatabaseFormField, DatabaseFormResponse, DatabaseFormVersion, FormElement } from "@/types/form";
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

export const getFormVersions = async (formId: string) => {
  try {
    const { data, error } = await supabase
      .from('form_versions')
      .select('*')
      .eq('form_id', formId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as DatabaseFormVersion[];
  } catch (error: any) {
    toast.error("Failed to fetch form versions", { description: error.message });
    throw error;
  }
};

// Form responses operations
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
