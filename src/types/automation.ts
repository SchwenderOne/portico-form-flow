
export type TriggerType = 'formSubmission' | 'fieldFilled' | 'fieldCondition';
export type ActionType = 'sendEmail' | 'webhook' | 'showConfirmation' | 'tagSubmission';

export interface Condition {
  fieldId: string;
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
  value: string | number;
}

export interface Trigger {
  id: string;
  type: TriggerType;
  name: string;
  condition?: Condition;
  fieldId?: string;
}

export interface Action {
  id: string;
  type: ActionType;
  name: string;
  config: {
    emailTo?: string;
    emailSubject?: string;
    emailBody?: string;
    webhookUrl?: string;
    confirmationMessage?: string;
    tagName?: string;
  };
}

export interface Automation {
  id: string;
  name: string;
  formId: string;
  enabled: boolean;
  trigger: Trigger;
  actions: Action[];
  createdAt: string;
  updatedAt: string;
}
