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
  Ellipsis,
  ShoppingCart,
} from "lucide-react";

const icon = [
  <ShoppingCart />,
  <Utensils />,
  <Wine />,
  <House />,
  <Repeat />,
  <Car />,
  <Shirt />,
  <PiggyBank />,
  <Ellipsis />,
];

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
  return (
    <Card className="min-w-[350px] flex pl-4 pr-4 pt-2 pb-2">
      <div className="flex justify-between items-center">
        {icon[id]}
        <div>
          <p className="text-sm text-muted-foreground">Budget</p>
          <p>{budget_amount}</p>
        </div>
      </div>
      <h1 className="text-lg font-bold">{category_name}</h1>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">Spent</p>
          <p>{spent_amount}</p>
        </div>
        <Progress value={spent_percentage} />
        <div className="flex justify-end">
          <p className="text-xs text-muted-foreground">
            {spent_percentage}% used
          </p>
        </div>
      </div>
    </Card>
  );
}
