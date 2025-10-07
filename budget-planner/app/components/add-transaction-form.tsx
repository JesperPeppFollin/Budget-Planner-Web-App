import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TransactionManager } from "../backend/transaction-manager";
import { BudgetManager } from "../backend/budget-manager";
import { categories_expenses } from "../backend/categories";
import { toast } from "sonner";
import { TrendingUp } from "lucide-react";

export default function AddTransactionForm({
  transactions,
  budgets,
  className,
}: {
  transactions: TransactionManager;
  budgets: BudgetManager;
  className?: string;
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Add the new transaction to supabase
    const success = await transactions.addTransaction({
      id: uuidv4(),
      name: name,
      amount: Number(amount),
      created_at: new Date().toISOString(),
      transaction_date: transactionDate,
      category: String(category),
      is_expense: true,
    });

    if (success) {
      toast.success("Transaction added successfully");
    }

    // Clear the form fields
    setName("");
    setAmount("");
    setTransactionDate("");
    setCategory("");
  };

  return (
    <div>
      <Card className={`w-xl bg-transparent backdrop-blur ${className ?? ""}`}>
        <CardHeader>
          <CardTitle>Add a new transaction</CardTitle>
          <CardDescription>
            Enter the details of the expense or income below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <Input
                name="name"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                name="amount"
                placeholder="amount"
                value={amount}
                required
                onChange={(e) => setAmount(e.target.value)}
              />
              <Input
                name="transactionDate"
                type="date"
                value={transactionDate}
                required
                onChange={(e) => setTransactionDate(e.target.value)}
              />
              <Select
                name="category"
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories_expenses.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full">
                Add Transaction
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 border-t border-muted"></div>
        <span className="text-sm text-muted-foreground font-medium">OR</span>
        <div className="flex-1 border-t border-muted"></div>
      </div>
      <CSVImportSection transactions={transactions} />
    </div>
  );
}

// ---CSV IMPORT HELPER COMPONENT ---
function CSVImportSection({
  transactions,
}: {
  transactions: TransactionManager;
}) {
  return (
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
            onChange={async (e) => {
              transactions.handleCSV(e.target.files![0]);
            }}
          />
        </div>
      </div>
    </Card>
  );
}
