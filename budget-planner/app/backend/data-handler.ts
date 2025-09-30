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

export function useTransactionData() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTransactionList();
  }, []);

  const fetchTransactionList = async () => {
    const { data, error } = await supabase.from("transactions").select("*");
    if (error) {
      console.log("Error fetching transactions");
    } else {
      setTransactions(data);
    }
  };

  const addTransaction = async (transaction: Transaction) => {
    const { data, error } = await supabase.from("transactions").insert(transaction).select();
    if (error || !data) {
      console.log("Error adding transaction", "error", error, "data", data);
    } else {
      setTransactions((prev) => [...prev, ...data]);
    }
  };

  return { transactions, addTransaction };

}
