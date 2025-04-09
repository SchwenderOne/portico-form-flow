
import React from "react";
import { FieldStatistics } from "@/types/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface FieldDropOffChartProps {
  fields: FieldStatistics[];
}

const FieldDropOffChart: React.FC<FieldDropOffChartProps> = ({ fields }) => {
  // Sort fields by abandonment rate (highest first)
  const topFields = [...fields]
    .sort((a, b) => b.abandonmentRate - a.abandonmentRate)
    .slice(0, 5);

  const chartData = topFields.map(field => ({
    name: field.fieldLabel,
    rate: parseFloat((field.abandonmentRate * 100).toFixed(1)),
  }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Top Drop-off Fields</CardTitle>
        <CardDescription>
          Fields with highest abandonment rates
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ChartContainer
          config={{
            dropoff: {
              label: "Abandonment Rate",
              color: "#f87171"
            }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis 
                type="number" 
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                scale="band" 
                width={100}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, "Abandonment Rate"]}
                labelFormatter={(label) => `Field: ${label}`}
              />
              <Bar
                dataKey="rate"
                name="Abandonment Rate"
                fill="var(--color-dropoff, #f87171)"
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default FieldDropOffChart;
