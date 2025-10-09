import BudgetCard from "../components/summary cards/budget-card";
import TrendCard from "../components/summary cards/trend-card";
import InfoCard from "../components/summary cards/info-card";
import TransactionsPieChart from "../components/transactions-pie-chart";
import { TransactionManager } from "../backend/transaction-manager";
import { BudgetManager } from "../backend/budget-manager";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useState } from "react";
import { Label } from "../components/ui/label";
import TransactionsTable from "~/components/transactions-table";
import { Calendar, CalendarDays } from "lucide-react";
import BudgetProgressInfo from "~/components/budget-progress-info";
import { categories_expenses } from "~/backend/categories";

export default function DashboardTab({
  transactions,
  budgets,
}: {
  transactions: TransactionManager;
  budgets: BudgetManager;
}) {
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year

  const onMonthChange = (value: string) => {
    setMonth(parseInt(value));
  };

  // Use the new class methods - much cleaner!
  const totalIncome = transactions.filterByMonth(month, year).getTotalIncome();
  const totalExpenses = transactions
    .filterByMonth(month, year)
    .getTotalExpenses();
  const monthlyTransactionCount = transactions
    .filterByMonth(month, year)
    .count();

  // Generate year options (current year and a few years back/forward)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 7 }, (_, i) => currentYear - 3 + i);

  return (
    <div className="w-full flex flex-col items-center mb-8">
      <div className="w-[1500px] flex flex-row justify-start items-start gap-4 mb-8">
        <div className="bg-card p-6 rounded-xl border shadow-sm min-w-[200px] min-h-[150px]">
          {/* Header with icon */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6">
              <Calendar className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Time frame
              </h3>
            </div>
          </div>

          {/* Month Select */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
              </div>
              <Label className="text-base font-medium text-foreground">
                Select Month
              </Label>
              <div className="ml-auto">
                <Select value={month.toString()} onValueChange={onMonthChange}>
                  <SelectTrigger className="w-[120px] border-input bg-background">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">January</SelectItem>
                      <SelectItem value="2">February</SelectItem>
                      <SelectItem value="3">March</SelectItem>
                      <SelectItem value="4">April</SelectItem>
                      <SelectItem value="5">May</SelectItem>
                      <SelectItem value="6">June</SelectItem>
                      <SelectItem value="7">July</SelectItem>
                      <SelectItem value="8">August</SelectItem>
                      <SelectItem value="9">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics overall */}
        <TrendCard title="total income" amount={totalIncome} trend={"up"} />
        <TrendCard
          title="total expense"
          amount={totalExpenses}
          trend={"down"}
        />
        <BudgetCard amount={totalExpenses} budget={budgets.getBudget(10)} />
        <InfoCard title="Transactions" amount={monthlyTransactionCount} />
      </div>
      <div className="w-[1500px] flex flex-row justify-start items-start gap-8">
        <div className="w-500">
          <TransactionsPieChart
            transactionManager={transactions}
            month={month}
            year={year}
          />
        </div>
        <div className="w-1000">
          <TransactionsTable
            transactions={transactions
              .filterByMonth(month, year)
              .getAllTransactions()}
          />
        </div>
      </div>

      {/* Analytics per category */}
      <div className="flex flex-wrap w-[1500px] gap-4 mt-8">
        {categories_expenses.map((category) => {
          // Get the actual spending for this category in the selected month/year
          const categorySum = transactions
            .getCategorySumsWithNamesForMonth(month, year)
            .find((sum) => sum.category === category.name);
          
          const actualAmount = categorySum ? categorySum.amount : 0;
          const budget = budgets.getBudget(category.id);
          
          console.log("categoryID", category.id);
          console.log("budget", budget);
          console.log("actual amount", actualAmount);
          console.log("");

          const spentPercentage = budget
            ? Math.min(Math.round((actualAmount / budget) * 100), 100)
            : 0;

          return (
              <BudgetProgressInfo
                key={category.name}
                id={category.id}
                budget_amount={budget}
                spent_amount={actualAmount}
                spent_percentage={spentPercentage}
                category_name={category.name}
              />
            );
          })}
      </div>
    </div>
  );
}
