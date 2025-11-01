import { useState, useEffect } from "react";
import type { Transaction } from "./types";
import styles from "./App.module.css";
import {
  fetchAllTransactions,
  addTransactions,
  deleteTransaction,
} from "./fetchData";
import AnalyticsPieChart from "./components/pieChart/pieChart";
import BudgetTrackerBox from "./components/budgetTrackerBox/budgetTrackerBox";
import InfoBox from "./components/infoBox/infoBox";
import TransactionsTable from "./components/transactionsTable/transactionsTable";

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

  const infoBoxData: {
    title: string;
    value: string;
    variant: "error" | "success" | "info" | "warning";
  }[] = [
    { title: "Total Expenses", value: "$1200", variant: "error" },
    { title: "Total Income", value: "$3000", variant: "success" },
    { title: "Total Transactions", value: "52", variant: "info" },
    { title: "Budget", value: "85% spent", variant: "warning" },
  ];

  const budgets = [
    { category: "Groceries", amountSpent: 400, budgetAmount: 600 },
    { category: "Transport", amountSpent: 150, budgetAmount: 300 },
    { category: "Takeout & Dining", amountSpent: 200, budgetAmount: 400 },
    { category: "Shopping", amountSpent: 200, budgetAmount: 400 },
    { category: "Entertainment & Fun", amountSpent: 200, budgetAmount: 400 },
    { category: "Rent & Utilities", amountSpent: 200, budgetAmount: 400 },
    { category: "Other", amountSpent: 200, budgetAmount: 400 },
    { category: "Saving", amountSpent: 200, budgetAmount: 400 },
  ];

  return (
    <div className={styles.mainContainer}>
      {/* BASIC INFORMATION */}
      <div className={styles.infoBoxesContainer}>
        {infoBoxData.map((data) => (
          <InfoBox
            key={data.title}
            title={data.title}
            value={data.value}
            footer="for this month"
            variant={data.variant}
          />
        ))}
      </div>

      {/* ANALYTICS */}
      <div className={styles.analyticsContainer}>
        <div>
          <AnalyticsPieChart />
        </div>
        <div>
          <AnalyticsPieChart />
        </div>
        <div>
          <TransactionsTable />
        </div>
      </div>

      {/* CATEGORIES TRACKING */}
      <div className={styles.budgetsContainer}>
        {budgets.map((budget) => (
          <div key={budget.category}>
            <BudgetTrackerBox
              category={budget.category}
              amountSpent={budget.amountSpent}
              budgetAmount={budget.budgetAmount}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
