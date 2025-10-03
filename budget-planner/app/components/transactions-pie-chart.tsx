"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";
import { useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";
import { categories_expenses } from "../backend/categories";
import type { TransactionDataType } from "~/backend/data-handler";

export const description = "A pie chart with a custom label";

export default function TransactionsPieChart({
  className,
  transactionData
}: {
  transactionData: TransactionDataType;
  className?: string;
}) {

  const chartData = useMemo(() => {
    console.log("Creating chartData, transactions:", transactionData.transactions.length);
    return categories_expenses.map((category, index) => ({
      category: category.name,
      amount: transactionData.expensesByCategory(category.name),
      fill: `var(--color-chart-${index + 1})`,
    }));
  }, [transactionData.transactions]);

  const chartConfig = useMemo(() => ({
    categories: {
      label: "Categories",
    },
    [categories_expenses[0].name]: {
      label: categories_expenses[0].name,
      color: "var(--chart-1)",
    },
    [categories_expenses[1].name]: {
      label: categories_expenses[1].name,
      color: "var(--chart-2)",
    },
    [categories_expenses[2].name]: {
      label: categories_expenses[2].name,
      color: "var(--chart-3)",
    },
    [categories_expenses[3].name]: {
      label: categories_expenses[3].name,
      color: "var(--chart-4)",
    },
    [categories_expenses[4].name]: {
      label: categories_expenses[4].name,
      color: "var(--chart-5)",
    },
    [categories_expenses[5].name]: {
      label: categories_expenses[5].name,
      color: "var(--chart-6)",
    },
    [categories_expenses[6].name]: {
      label: categories_expenses[6].name,
      color: "var(--chart-7)",
    },
    [categories_expenses[7].name]: {
      label: categories_expenses[7].name,
      color: "var(--chart-8)",
    },
    [categories_expenses[8].name]: {
      label: categories_expenses[8].name,
      color: "var(--chart-9)",
    },
  }), []) satisfies ChartConfig;

  return (
    <Card className="flex flex-col min-w-[400px]">
      {/* ändra denna för storleken på hela */}
      <CardHeader className="items-center pb-0">
        <CardTitle>Expenses per category</CardTitle>
        <CardDescription>October 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square px-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              labelLine={false}
              label={({ payload, ...props }) => (
                <text
                  cx={props.cx}
                  cy={props.cy}
                  x={props.x}
                  y={props.y}
                  textAnchor={props.textAnchor}
                  dominantBaseline={props.dominantBaseline}
                  fill="hsla(var(--foreground))"
                >
                  {payload.amount}
                </text>
              )}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
