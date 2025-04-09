
export interface FormSubmissionData {
  id: string;
  formId: string;
  submittedAt: string;
  completionTimeSeconds: number;
  isComplete: boolean;
  fieldInteractions: FieldInteraction[];
}

export interface FieldInteraction {
  fieldId: string;
  fieldType: string;
  fieldLabel: string;
  timeSpentSeconds: number;
  wasCompleted: boolean;
  abandonedAt?: string;
}

export interface FormAnalytics {
  totalSubmissions: number;
  completionRate: number;
  averageCompletionTimeSeconds: number;
  dropOffRate: number;
  fieldStats: FieldStatistics[];
  submissionTrend: SubmissionTrendPoint[];
}

export interface FieldStatistics {
  fieldId: string;
  fieldType: string;
  fieldLabel: string;
  abandonmentRate: number;
  averageTimeSpentSeconds: number;
  completionRate: number;
}

export interface SubmissionTrendPoint {
  date: string;
  count: number;
}

export interface DateRangeFilter {
  startDate: Date;
  endDate: Date;
}
