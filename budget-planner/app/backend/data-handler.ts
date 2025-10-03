import { useState, useEffect } from "react";
import supabase from "./supabase-client";
import type { get } from "http";

export interface Transaction {
  id: string;
  created_at: string;
  name: string;
  amount: number;
  transaction_date: string;
  category: string;
  is_expense?: boolean;
}

export type TransactionDataType = ReturnType<typeof useTransactionData>;

export default function useTransactionData() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    fetchTransactionList();
    fetchBudgets();
  }, []);

  const fetchTransactionList = async () => {
    const { data, error } = await supabase.from("transactions").select("*");
    if (error) {
      console.log("Error fetching transactions");
    } else {
      setTransactions(data);
      console.log("Fetched transactions:", data.length, "Sample:", data[0]);
      console.log("Transaction categories:", [
        ...new Set(data.map((t) => t.category)),
      ]);
      console.log(
        "Expense transactions:",
        data.filter((t) => t.is_expense).length
      );
    }
  };

  const addTransaction = async (transaction: Transaction) => {
    const { data, error } = await supabase
      .from("transactions")
      .insert(transaction)
      .select();
    if (error || !data) {
      console.log("Error adding transaction", "error", error, "data", data);
    } else {
      setTransactions((prev) => [...prev, ...data]);
    }
  };

  const totalExpenses = transactions
    .filter((t) => t.is_expense)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = transactions
    .filter((t) => !t.is_expense)
    .reduce((sum, t) => sum + t.amount, 0);

  const expensesByCategory = (category: string) => {
    // Convert display category name to database category name
    const expenseTransactions = transactions.filter((t) => t.is_expense && t.category === category);
    const sum = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
    return sum;
  };

  const fetchBudgets = async () => {
    const { data, error } = await supabase.from("budget").select("*");
    if (error) {
      console.log("Error fetching budgets", error);
    } else {
      // Transform array to object format { budget_id: amount }
      const budgetObject: { [key: number]: number } = {};
      data?.forEach((budget) => {
        budgetObject[budget.budget_id] = budget.amount;
      });
      setBudgets(budgetObject);
    }
  };

  const addBudgets = async (allBudgets: { [key: number]: number }) => {
    // Update all budgets in one loop using budget_id
    for (const [budget_id, amount] of Object.entries(allBudgets)) {
      await supabase
        .from("budget")
        .update({ amount: amount })
        .eq("budget_id", Number(budget_id));
    }
  };
  // no error handling, code and explode🙏🙏

  return {
    transactions,
    budgets,
    totalExpenses,
    totalIncome,
    expensesByCategory,
    addTransaction,
    addBudgets,
    fetchBudgets,
  };
}
