import { useState, useEffect } from "react";
import supabase from "./supabase-client";

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
    }
  };

  const fetchBudgets = async () => {
    const { data, error } = await supabase.from("expense_budgets").select("*");
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

  const addTransaction = async (transaction: Transaction) => {
    const { data, error } = await supabase
      .from("transactions")
      .insert(transaction)
      .select();
    if (error || !data) {
      console.log("Error adding transaction", "error", error, "data", data);
      return false;
    } else {
      setTransactions((prev) => [...prev, ...data]);
      return true;
    }
  };

  const addBudgets = async (allBudgets: { [key: number]: number }) => {
    // Update all budgets in one loop using budget_id
    for (const [budget_id, amount] of Object.entries(allBudgets)) {
      await supabase
        .from("expense_budgets")
        .update({ amount: amount })
        .eq("budget_id", Number(budget_id));
    }
  };

  const expensesSumByCategory = (input_transactions: Transaction[], category: string) => {
    const expenseTransactions = input_transactions.filter(
      (t) => t.is_expense && t.category === category
    );
    const sum = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
    return sum;
  };

  const expensesByMonth = (month: number, year: number): Transaction[] => {
    const monthStr = month.toString().padStart(2, "0"); // Convert 9 to "09"
    const yearStr = year.toString();

    return transactions.filter((transaction) => {
      return transaction.transaction_date.startsWith(`${yearStr}-${monthStr}`) && transaction.is_expense;
    });
  };

  const nbrTransactionsThisMonth = () => {
    const current_month = new Date().getMonth() + 1;
    const current_year = new Date().getFullYear();
    return expensesByMonth(current_month, current_year).length;
  };

  const totalExpenses = transactions
    .filter((t) => t.is_expense)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = transactions
    .filter((t) => !t.is_expense)
    .reduce((sum, t) => sum + t.amount, 0);

  // no error handling, code and explode🙏🙏

  return {
    transactions,
    budgets,
    addTransaction,
    addBudgets,
    expensesSumByCategory,
    expensesByMonth,
    nbrTransactionsThisMonth,
    totalExpenses,
    totalIncome,
  };
}
