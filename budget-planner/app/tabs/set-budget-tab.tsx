import { useState } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { categories_expenses } from "../backend/categories";

const handleBudgetChange = (categoryId: number, value: string) => {
  // Handle budget change logic here
  console.log(`Category ID: ${categoryId}, New Budget: ${value}`);
};

// const totalBudget = categories_expenses.reduce(
//   (sum, cat) => sum + (budgets[cat.id] || 0),
//   0
// );

export default function SetBudgetTab() {
  return (
    <div className="w-[700px]">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-destructive" />
          Expense Budgets
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {categories_expenses.map((category) => (
            <div key={category.id} className="space-y-2">
              <Label
                htmlFor={`budget-${category.id}`}
                className="flex items-center gap-2"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                {category.name}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id={`budget-${category.id}`}
                  type="number"
                  min="0"
                  step="0.01"
                //   value={budgets[category.id] || 0}
                  onChange={(e) =>
                    handleBudgetChange(category.id, e.target.value)
                  }
                  className="pl-7"
                  placeholder="0.00"
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
