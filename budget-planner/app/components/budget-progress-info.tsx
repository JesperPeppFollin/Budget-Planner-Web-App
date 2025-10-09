import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import {
  Utensils,
  Car,
  Wine,
  House,
  Repeat,
  Shirt,
  PiggyBank,
  Clapperboard,
  Ellipsis,
  ShoppingCart,
} from "lucide-react";

export default function BudgetProgressInfo({
  id,
  budget_amount,
  spent_amount,
  spent_percentage,
  category_name,
}: {
  id: number;
  budget_amount: number;
  spent_amount: number;
  spent_percentage: number;
  category_name: string;
}) {
  const icon = [
    <ShoppingCart style={{ color: `var(--chart-${id})` }} />,
    <Utensils style={{ color: `var(--chart-${id})` }} />,
    <Wine style={{ color: `var(--chart-${id})` }} />,
    <House style={{ color: `var(--chart-${id})` }} />,
    <Clapperboard style={{ color: `var(--chart-${id})` }} />,
    <Repeat style={{ color: `var(--chart-${id})` }} />,
    <Car style={{ color: `var(--chart-${id})` }} />,
    <Shirt style={{ color: `var(--chart-${id})` }} />,
    <Ellipsis style={{ color: `var(--chart-${id})` }} />,
  ];

  // Determine progress bar color
  let progressColor = "[&>div]:bg-success";
  if (spent_percentage >= 100) {
    progressColor = "[&>div]:bg-destructive";
  } else if (spent_percentage >= 80) {
    progressColor = "[&>div]:bg-warning";
  }

  return (
    <Card className="min-w-[350px] flex pl-4 pr-4 pt-2 pb-2">
      <div className="flex justify-between items-center">
        {icon[id - 1]}
        <div className="flex flex-col items-end">
          <p className="text-xs text-muted-foreground">Budget</p>
          <p>{budget_amount} kr</p>
        </div>
      </div>
      <h1 className="text-lg font-bold">{category_name}</h1>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">Spent</p>
          <p>{spent_amount} kr</p>
        </div>
        <Progress value={spent_percentage} className={progressColor} />
        <div className="flex justify-end">
          {spent_percentage >= 100 ? (
            <p className="text-destructive font-bold text-xs">
              OVER BUDGET
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              {spent_percentage}% used
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
