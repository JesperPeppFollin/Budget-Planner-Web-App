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
  transactionData,
}: {
  transactionData: TransactionDataType;
}) {

  const current_month = new Date().getMonth() + 1; // getMonth() returns 0-11
  const current_month_string = new Date().toLocaleString('default', { month: 'long' });
  const current_year = new Date().getFullYear();
  const transactionDataThisMonth = transactionData.expensesByMonth(current_month, current_year);

  const chartData = useMemo(() => {
    return categories_expenses.map((category, index) => ({
      category: category.name,
      amount: transactionData.expensesSumByCategory(transactionDataThisMonth, category.name),
      fill: `var(--chart-${index + 1})`,
    }));
  }, [transactionData.transactions]);

  const chartConfig = useMemo(
    () => ({
      categories: {
        label: "Categories",
      },
      ...categories_expenses.reduce(
        (acc, category, index) => {
          acc[category.name] = {
            label: category.name,
            color: `var(--chart-${index + 1})`,
          };
          return acc;
        },
        {} as Record<string, { label: string; color: string }>
      ),
    }),
    []
  ) satisfies ChartConfig;

  return (
    <Card className="flex flex-col min-w-[400px]">
      {/* ändra denna för storleken på hela */}
      <CardHeader className="items-center pb-0">
        <CardTitle>Expenses per category</CardTitle>
        <CardDescription>{current_month_string} {current_year}</CardDescription>
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
          Keep spending baby <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total expenses for {current_month_string} {current_year}
        </div>
      </CardFooter>
    </Card>
  );
}
