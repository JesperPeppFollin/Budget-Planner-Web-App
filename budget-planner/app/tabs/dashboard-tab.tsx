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

  const onYearChange = (value: string) => {
    setYear(parseInt(value));
  };

  // Use the new class methods - much cleaner!
  const totalIncome = transactions.filterByMonth(month, year).getTotalIncome();
  const totalExpenses = transactions.filterByMonth(month, year).getTotalExpenses();
  const monthlyTransactionCount = transactions.filterByMonth(month, year).count();

  // Generate year options (current year and a few years back/forward)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 7 }, (_, i) => currentYear - 3 + i);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[1500px] flex flex-row justify-start items-start gap-4 mb-8">
        <div className="bg-card p-6 rounded-xl border shadow-sm min-w-[200px] min-h-[150px]">
          {/* Header with icon */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6">
              <Calendar className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Time frame</h3>
            </div>
          </div>
          
          {/* Month Dropdown */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
              </div>
              <Label className="text-base font-medium text-foreground">Select Month</Label>
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
            
            {/* Year Dropdown */}
            {/* <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <CalendarClock className="w-4 h-4 text-muted-foreground" />
              </div>
              <Label className="text-base font-medium text-foreground">Select Year</Label>
              <div className="ml-auto">
                <Select value={year.toString()} onValueChange={onYearChange}>
                  <SelectTrigger className="w-[120px] border-input bg-background">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {yearOptions.map((yearOption) => (
                        <SelectItem key={yearOption} value={yearOption.toString()}>
                          {yearOption}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div> */}
          </div>
        </div>
        <TrendCard title="total income" amount={totalIncome} trend={"up"} />
        <TrendCard title="total expense" amount={totalExpenses}trend={"down"}/>
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
        <TransactionsTable transactions={transactions.filterByMonth(month, year).getAllTransactions()} />
        </div>
      </div>
      <div className="flex flex-wrap w-[1500px] gap-4 mt-8">
        {categories_expenses.map((category) => (
          <BudgetProgressInfo />
        ))}
      </div>
    </div>
  );
}
