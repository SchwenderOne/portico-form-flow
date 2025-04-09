
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { getFormAnalytics } from "@/services/analytics-service";
import { FormAnalytics } from "@/types/analytics";
import SubmissionOverview from "@/components/analytics/SubmissionOverview";
import SubmissionTrendChart from "@/components/analytics/SubmissionTrendChart";
import FieldPerformanceTable from "@/components/analytics/FieldPerformanceTable";
import EmptyState from "@/components/analytics/EmptyState";
import DateRangePicker from "@/components/analytics/DateRangePicker";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import FieldDropOffChart from "@/components/analytics/FieldDropOffChart";
import CompletionPieChart from "@/components/analytics/CompletionPieChart";
import { Card, CardContent } from "@/components/ui/card";

const AnalyticsPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<FormAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  
  // In a real app, you'd get the form ID from the URL or context
  const formId = "sample-form-1";
  
  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);
  
  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const data = await getFormAnalytics(formId);
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRefresh = () => {
    fetchAnalytics();
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Form Analytics</h1>
          <div className="flex gap-4">
            <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-40 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-4 w-64 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        ) : analytics && analytics.totalSubmissions > 0 ? (
          <div className="space-y-6">
            {/* Overview Metrics - Full Width */}
            <SubmissionOverview analytics={analytics} />
            
            {/* Charts Section - Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SubmissionTrendChart analytics={analytics} />
              <div className="grid grid-cols-1 gap-6">
                <CompletionPieChart analytics={analytics} />
                <FieldDropOffChart fields={analytics.fieldStats} />
              </div>
            </div>
            
            {/* Field Performance Table - Full Width */}
            <FieldPerformanceTable fields={analytics.fieldStats} />
          </div>
        ) : (
          <EmptyState onRefresh={handleRefresh} />
        )}
      </div>
    </AppLayout>
  );
};

export default AnalyticsPage;
