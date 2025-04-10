
import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltipContent,
  ChartTooltip 
} from "@/components/ui/chart";

interface LineChartProps {
  data: any[];
  categories: string[];
  index: string;
  className?: string;
}

export const LineChart = ({
  data,
  categories,
  index,
  className,
}: LineChartProps) => {
  const colors = ["#68b046", "#72c90a", "#9edc4f", "#b6e376", "#c9e99d"];

  return (
    <ChartContainer config={{}} className={className}>
      <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={index}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
};
