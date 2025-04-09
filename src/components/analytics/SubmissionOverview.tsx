
import React from "react";
import { FormAnalytics } from "@/types/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceStrict } from "date-fns";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Clock, BarChart2, Percent, Users } from "lucide-react";

interface SubmissionOverviewProps {
  analytics: FormAnalytics;
}

const SubmissionOverview: React.FC<SubmissionOverviewProps> = ({ analytics }) => {
  const formattedTime = formatDistanceStrict(0, analytics.averageCompletionTimeSeconds * 1000);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.totalSubmissions}</div>
          <p className="text-xs text-muted-foreground">
            Entries: {analytics.totalSubmissions}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(analytics.completionRate * 100).toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            {analytics.dropOffRate > 0.3 
              ? "High drop-off rate" 
              : analytics.dropOffRate > 0.1 
                ? "Average drop-off rate" 
                : "Low drop-off rate"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formattedTime}</div>
          <p className="text-xs text-muted-foreground">
            Per submission
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Drop-off Rate</CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(analytics.dropOffRate * 100).toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            Users who abandoned
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionOverview;
