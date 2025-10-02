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
import type { TransactionDataType } from "~/backend/data-handler";

export default function AddTransactionForm({ 
  transactionData, 
  className 
}: { 
  transactionData: TransactionDataType; 
  className?: string; 
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Add the new transaction to supabase
    transactionData.addTransaction({
      id: uuidv4(),
      name: name,
      amount: Number(amount),
      created_at: new Date().toISOString(),
      transaction_date: transactionDate,
      category: String(category),
      is_expense: true,
    });

    // Clear the form fields
    setName("");
    setAmount("");
    setTransactionDate("");
    setCategory("");
  };

  return (
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
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
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
  );
}
