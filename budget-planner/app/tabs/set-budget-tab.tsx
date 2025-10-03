import { useEffect, useRef, useState } from "react";
import { Card, CardFooter } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { categories_expenses } from "../backend/categories";
import { Button } from "~/components/ui/button";
import type { TransactionDataType } from "~/backend/data-handler";

export default function SetBudgetTab({
  transactionData,
}: {
  transactionData: TransactionDataType;
}) {
  const [budgets, setBudgets] = useState<{ [key: number]: number }>({});
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleBudgetChange = (categoryId: number, value: string) => {
    setBudgets((prev) => ({
      ...prev,
      [categoryId]: Number(value),
    }));
  };

  const handleSubmitBudget = () => {
    const totalBudget = Object.values(budgets).reduce((a, b) => a + b, 0);

    // Combine individual budgets with total budget (budget_id: 10)
    const allBudgets = {
      ...budgets,
      10: totalBudget, // Add total as budget_id 10
    };

    transactionData.addBudgets(allBudgets);
  };

  const goToNextField = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" && inputRefs.current[idx + 1]) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const totalBudget = Object.values(budgets).reduce((a, b) => a + b, 0);

  return (
    <div className="w-[700px]">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-destructive" />
          Expense Budgets
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {categories_expenses.map((category, idx) => (
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
                  step="1"
                  defaultValue={budgets[category.id] || ""}
                  onBlur={(e) =>
                    handleBudgetChange(category.id, e.target.value)
                  }
                  onKeyDown={(e) => goToNextField(e, idx)}
                  className="pl-7"
                  placeholder="0.00"
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <CardFooter className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Wallet className="h-4 w-4" />
            Total Monthly Budget: ${totalBudget}
          </div>
          <Button variant="default" onClick={handleSubmitBudget}>
            Save Budgets
          </Button>
        </CardFooter>
      </Card>
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 border-t border-muted"></div>
        <span className="text-sm text-muted-foreground font-medium">OR</span>
        <div className="flex-1 border-t border-muted"></div>
      </div>

      <Card className="p-6 border-solid border-2 border-muted-foreground/25">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h4 className="text-lg font-semibold">Import from CSV</h4>
            <p className="text-sm text-muted-foreground max-w-sm">
              Upload a CSV file with your budget data to quickly set up all
              categories at once
            </p>
          </div>
          <div className="relative">
            <label
              htmlFor="csv-upload"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-dashed border-muted-foreground/50 bg-background hover:bg-accent hover:text-accent-foreground hover:border-solid h-10 px-4 py-2 cursor-pointer"
            >
              Choose CSV File
            </label>
            <Input
              id="csv-upload"
              type="file"
              accept=".csv"
              className="sr-only"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
