
import { FormAnalytics, FieldStatistics, SubmissionTrendPoint, FormSubmissionData } from "@/types/analytics";
import { format, subDays, eachDayOfInterval } from "date-fns";

// Mock form submissions data
const generateMockSubmissions = (formId: string, count: number): FormSubmissionData[] => {
  const submissions: FormSubmissionData[] = [];

  for (let i = 0; i < count; i++) {
    const isComplete = Math.random() > 0.3;
    const submissionDate = subDays(new Date(), Math.floor(Math.random() * 30));
    const completionTime = Math.floor(Math.random() * 400) + 60; // 1-8 minutes
    
    const fieldInteractions = Array(Math.floor(Math.random() * 8) + 3)
      .fill(0)
      .map((_, index) => {
        const wasCompleted = Math.random() > 0.2; // 80% completion rate per field
        return {
          fieldId: `field-${index}`,
          fieldType: ['text', 'email', 'checkbox', 'select', 'date'][Math.floor(Math.random() * 5)],
          fieldLabel: `Question ${index + 1}`,
          timeSpentSeconds: Math.floor(Math.random() * 60) + 10,
          wasCompleted,
          ...(wasCompleted ? {} : { abandonedAt: format(submissionDate, 'yyyy-MM-dd HH:mm:ss') })
        };
      });

    submissions.push({
      id: `submission-${i}`,
      formId,
      submittedAt: format(submissionDate, 'yyyy-MM-dd HH:mm:ss'),
      completionTimeSeconds: completionTime,
      isComplete,
      fieldInteractions
    });
  }

  return submissions;
};

// Generate trends for the last 30 days
const generateSubmissionTrend = (submissions: FormSubmissionData[]): SubmissionTrendPoint[] => {
  const end = new Date();
  const start = subDays(end, 30);
  
  // Create an array of the last 30 days
  const days = eachDayOfInterval({ start, end });
  
  // Initialize counts for each day
  const trend = days.map(day => ({
    date: format(day, 'yyyy-MM-dd'),
    count: 0
  }));
  
  // Count submissions for each day
  submissions.forEach(submission => {
    const submissionDate = format(new Date(submission.submittedAt), 'yyyy-MM-dd');
    const trendPoint = trend.find(point => point.date === submissionDate);
    if (trendPoint) {
      trendPoint.count += 1;
    }
  });
  
  return trend;
};

// Calculate field statistics
const calculateFieldStats = (submissions: FormSubmissionData[]): FieldStatistics[] => {
  const fieldMap = new Map<string, {
    fieldType: string,
    fieldLabel: string,
    total: number,
    abandoned: number,
    totalTime: number,
    completed: number
  }>();
  
  // Collect data for each field
  submissions.forEach(submission => {
    submission.fieldInteractions.forEach(interaction => {
      const existing = fieldMap.get(interaction.fieldId) || {
        fieldType: interaction.fieldType,
        fieldLabel: interaction.fieldLabel,
        total: 0,
        abandoned: 0,
        totalTime: 0,
        completed: 0
      };
      
      existing.total += 1;
      existing.totalTime += interaction.timeSpentSeconds;
      
      if (!interaction.wasCompleted) {
        existing.abandoned += 1;
      } else {
        existing.completed += 1;
      }
      
      fieldMap.set(interaction.fieldId, existing);
    });
  });
  
  // Convert to array of field statistics
  return Array.from(fieldMap.entries()).map(([fieldId, stats]) => ({
    fieldId,
    fieldType: stats.fieldType,
    fieldLabel: stats.fieldLabel,
    abandonmentRate: stats.total > 0 ? stats.abandoned / stats.total : 0,
    averageTimeSpentSeconds: stats.total > 0 ? stats.totalTime / stats.total : 0,
    completionRate: stats.total > 0 ? stats.completed / stats.total : 0
  }));
};

// Calculate overall form analytics
const calculateFormAnalytics = (submissions: FormSubmissionData[]): FormAnalytics => {
  const totalSubmissions = submissions.length;
  const completedSubmissions = submissions.filter(sub => sub.isComplete).length;
  const completionRate = totalSubmissions > 0 ? completedSubmissions / totalSubmissions : 0;
  
  // Calculate average completion time for completed submissions
  const totalCompletionTime = submissions.reduce((sum, sub) => sum + sub.completionTimeSeconds, 0);
  const averageCompletionTime = totalSubmissions > 0 ? totalCompletionTime / totalSubmissions : 0;
  
  // Calculate overall drop-off rate (percentage of users who started but didn't complete)
  const dropOffRate = totalSubmissions > 0 ? 1 - completionRate : 0;
  
  // Calculate field-level statistics
  const fieldStats = calculateFieldStats(submissions);
  
  // Generate submission trend data
  const submissionTrend = generateSubmissionTrend(submissions);
  
  return {
    totalSubmissions,
    completionRate,
    averageCompletionTimeSeconds: averageCompletionTime,
    dropOffRate,
    fieldStats,
    submissionTrend
  };
};

export const getFormAnalytics = async (formId: string): Promise<FormAnalytics> => {
  // In a real app, this would fetch from an API
  // For now, generate mock data
  const mockSubmissions = generateMockSubmissions(formId, 150);
  return calculateFormAnalytics(mockSubmissions);
};

export const getFormSubmissions = async (formId: string): Promise<FormSubmissionData[]> => {
  // In a real app, this would fetch from an API
  return generateMockSubmissions(formId, 150);
};
