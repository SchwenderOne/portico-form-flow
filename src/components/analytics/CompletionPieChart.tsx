
import React from "react";
import { FormAnalytics } from "@/types/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface CompletionPieChartProps {
  analytics: FormAnalytics;
}

const CompletionPieChart: React.FC<CompletionPieChartProps> = ({ analytics }) => {
  const data = [
    { name: "Completed", value: Math.round(analytics.completionRate * 100), color: "#8b5cf6" },
    { name: "Abandoned", value: Math.round(analytics.dropOffRate * 100), color: "#f87171" },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Completion Rate</CardTitle>
        <CardDescription>
          Percentage of users who completed vs. abandoned the form
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ChartContainer
          config={{
            completed: {
              label: "Completed",
              color: "#8b5cf6"
            },
            abandoned: {
              label: "Abandoned",
              color: "#f87171"
            }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                innerRadius={30}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, ""]}
                labelFormatter={(label) => `${label}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CompletionPieChart;
