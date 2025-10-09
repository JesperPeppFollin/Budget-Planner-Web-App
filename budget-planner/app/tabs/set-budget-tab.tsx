import { useEffect, useRef, useState } from "react";
import { Card, CardFooter } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { categories_expenses, categories_income } from "../backend/categories";
import { Button } from "~/components/ui/button";
import { TransactionManager } from "../backend/transaction-manager";
import { BudgetManager } from "../backend/budget-manager";

export default function SetBudgetTab({
  transactions,
  budgets,
}: {
  transactions: TransactionManager;
  budgets: BudgetManager;
}) {
  // --- CONSTS AND FUNCTIONS ---
  const [localBudgets, setLocalBudgets] = useState<{ [key: number]: number }>({});
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [categoryChoice, setCategoryChoice] = useState("Expense");

  const handleBudgetChange = (categoryId: number, value: string) => {
    setLocalBudgets((prev) => ({
      ...prev,
      [categoryId]: Number(value),
    }));
  };

  const handleSubmitBudget = async () => {
    const totalBudget = Object.values(localBudgets).reduce((a, b) => a + b, 0);
    // Set individual budgets
    Object.entries(localBudgets).forEach(([budgetId, amount]) => {
      budgets.setBudget(Number(budgetId), amount);
    });

    // Set total budget (budget_id: 10)
    budgets.setBudget(10, totalBudget);

    // Save all budgets to database
    await budgets.saveBudgets();
  };

  const goToNextField = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" && inputRefs.current[idx + 1]) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const totalBudget = Object.values(localBudgets).reduce((a, b) => a + b, 0);

  // --- MAIN COMPONENT ---
  return (
    <div className="w-[700px]">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          {categoryChoice === "Expense" ? (
            <>
              <TrendingDown className="h-5 w-5 text-destructive" />
              Expense budgets
            </>
          ) : (
            <>
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Income budgets
            </>
          )}
        </h3>

        {/* --- INCOME / EXPENSE TOGGLE --- */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              name="categories"
              value="Expense"
              id="expense"
              defaultChecked={categoryChoice === "Expense"}
              onChange={(e) => setCategoryChoice(e.target.value)}
            />
            <Label htmlFor="expense">Expense</Label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="categories"
              value="Income"
              id="income"
              onChange={(e) => setCategoryChoice(e.target.value)}
            />
            <Label htmlFor="income">Income</Label>
          </div>
        </div>

        {/* --- EXPENSES CATEGORIES --- */}
        {categoryChoice === "Expense" ? (
          <ExpenseCategoriesSection
            handleBudgetChange={handleBudgetChange}
            budgets={localBudgets}
            inputRefs={inputRefs}
            goToNextField={goToNextField}
          />
        ) : (
          <IncomeCategoriesSection
            handleBudgetChange={handleBudgetChange}
            budgets={localBudgets}
            inputRefs={inputRefs}
            goToNextField={goToNextField}
          />
        )}

        <CardFooter className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Wallet className="h-4 w-4" />
            Total Monthly {categoryChoice} Budget: ${totalBudget}
          </div>
          <Button variant="default" onClick={handleSubmitBudget}>
            Save {categoryChoice} Budgets
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// --- HELPER COMPONENTS ---

// --- EXPENSE CATEGORIES SECTION HELPER COMPONENT ---
function ExpenseCategoriesSection({
  handleBudgetChange,
  budgets,
  inputRefs,
  goToNextField,
}: {
  handleBudgetChange: (categoryId: number, value: string) => void;
  budgets: { [key: number]: number };
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  goToNextField: (e: React.KeyboardEvent, idx: number) => void;
}) {
  return (
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
              onBlur={(e) => handleBudgetChange(category.id, e.target.value)}
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
  );
}

// --- INCOME CATEGORIES SECTION HELPER COMPONENT ---
// --- KAN SLÅS IHOP MED EXPENSES
function IncomeCategoriesSection({
  handleBudgetChange,
  budgets,
  inputRefs,
  goToNextField,
}: {
  handleBudgetChange: (categoryId: number, value: string) => void;
  budgets: { [key: number]: number };
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  goToNextField: (e: React.KeyboardEvent, idx: number) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {categories_income.map((category, idx) => (
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
              onBlur={(e) => handleBudgetChange(category.id, e.target.value)}
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
  );
}