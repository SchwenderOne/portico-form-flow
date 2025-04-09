
import React from "react";
import { FormAnalytics } from "@/types/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format } from "date-fns";

interface SubmissionTrendChartProps {
  analytics: FormAnalytics;
}

const SubmissionTrendChart: React.FC<SubmissionTrendChartProps> = ({ analytics }) => {
  // Format dates for better display
  const chartData = analytics.submissionTrend.map(point => ({
    ...point,
    formattedDate: format(new Date(point.date), 'MMM dd')
  }));

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Submission Trend</CardTitle>
        <CardDescription>
          Form submissions over the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer
          config={{
            submissions: {
              label: "Submissions",
              color: "#8b5cf6"
            }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <XAxis 
                dataKey="formattedDate"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => value}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                name="Submissions"
                stroke="var(--color-submissions, #8b5cf6)"
                activeDot={{ r: 6 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SubmissionTrendChart;
