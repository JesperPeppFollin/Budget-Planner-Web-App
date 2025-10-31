import { useState, useEffect } from "react";
import type { Transaction } from "./types";
import {
  fetchAllTransactions,
  addTransactions,
  deleteTransaction,
} from "./fetchData";
import AnalyticsPieChart from "./components/pieChart/pieChart";
import ExpenseTable from "./components/expenseTable/expenseTable";
import BudgetTrackerBox from "./components/budgetTrackerBox/budgetTrackerBox";
import InfoBox from "./components/infoBox/infoBox";
import styles from "./App.module.css";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const loadTransactions = async () => {
      const [data, error] = await fetchAllTransactions();
      if (error) {
        console.error("Error fetching transactions:", error);
        return;
      }
      setTransactions(data);
    };
    loadTransactions();
  }, []);

  const infoBoxData: { title: string; value: string; variant: "error" | "success" | "info" }[] = [
    { title: "Total Expenses", value: "$1200", variant: "error" },
    { title: "Total Income", value: "$3000", variant: "success" },
    { title: "Total Transactions", value: "52", variant: "info" },
  ];

  const budgets = [
    { category: "Food", amountSpent: 400, budgetAmount: 600 },
    { category: "Transport", amountSpent: 150, budgetAmount: 300 },
    { category: "Entertainment", amountSpent: 200, budgetAmount: 400 },
  ];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.infoBoxesContainer}>
        {infoBoxData.map(data => (
          <InfoBox
            key={data.title}
            title={data.title}
            value={data.value}
            footer="for this month"
            variant={data.variant}
          />
        ))}
      </div>
      <div className={styles.analyticsContainer}>
        <AnalyticsPieChart />
      </div>
      <div className={styles.budgetsContainer}></div>
    </div>
  );
}
