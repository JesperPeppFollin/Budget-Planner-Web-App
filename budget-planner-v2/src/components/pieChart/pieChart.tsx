"use client";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import styles from "./pieChart.module.css";

export const description = "A pie chart with a custom label";

export default function AnalyticsPieChart({month, year, categoriesSums}: {month: string, year: number, categoriesSums: number[]}) {

  const chartData = [
  { browser: "groceries", amount: categoriesSums[0], fill: "var(--color-groceries)" },
  { browser: "transport", amount: categoriesSums[1], fill: "var(--color-transport)" },
  { browser: "takeoutAndDining", amount: categoriesSums[2], fill: "var(--color-takeoutAndDining)" },
  { browser: "shopping", amount: categoriesSums[3], fill: "var(--color-shopping)" },
  { browser: "entertainmentAndFun", amount: categoriesSums[4], fill: "var(--color-entertainmentAndFun)" },
  { browser: "rentAndUtilities", amount: categoriesSums[5], fill: "var(--color-rentAndUtilities)" },
  { browser: "other", amount: categoriesSums[6], fill: "var(--color-other)" },
  { browser: "savings", amount: categoriesSums[7], fill: "var(--color-savings)" },
];

const chartConfig = {
  amount: { label: "category" },
  groceries: { label: "Groceries", color: "var(--color-main-200)" },
  transport: { label: "Transport", color: "var(--color-main-300)" },
  takeoutAndDining: { label: "Takeout & Dining", color: "var(--color-main-400)" },
  shopping: { label: "Shopping", color: "var(--color-main-500)"},
  entertainmentAndFun: { label: "Entertainment & Fun", color: "var(--color-main-600)" },
  rentAndUtilities: { label: "Rent & Utilities", color: "var(--color-main-700)"},
  other: { label: "Other", color: "var(--color-main-800)" },
  savings: { label: "Savings", color: "var(--color-main-900)" },
} satisfies ChartConfig;

  return (
    <Card className={styles.mainContainer}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Custom Label</CardTitle>
        <CardDescription>{month} - {year}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full max-w-[520px] px-0 overflow-visible"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="amount"
              outerRadius="70%"
              labelLine={false}
              label={({ payload, ...props }) => {
                // Show category name instead of amount
                const key = payload.browser as keyof typeof chartConfig;
                const text = chartConfig[key]?.label ?? payload.browser;
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="hsla(var(--foreground))"
                    fontSize={12}
                  >
                    {text}
                  </text>
                );
              }}
              nameKey="browser"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total amount spent per category for {month}
        </div>
      </CardFooter>
    </Card>
  );
}
