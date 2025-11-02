import { useState, useEffect } from "react";
import type { Transaction, Category } from "./types";
import styles from "./App.module.css";
import {
  fetchAllTransactions,
  addTransactions,
  deleteTransaction,
} from "./fetchData";
import { filter, getTotalAmount, getLength } from "./dataHandler";
import AnalyticsPieChart from "./components/pieChart/pieChart";
import BudgetTrackerBox from "./components/budgetTrackerBox/budgetTrackerBox";
import InfoBox from "./components/infoBox/infoBox";
import TransactionsTable from "./components/transactionsTable/transactionsTable";
import CategoryIcon from "./components/ui/categoryIcon/categoryIcon";

// TEST DATA
const month = new Date().toLocaleString("default", { month: "long" });
const year = new Date().getFullYear();
// lägga till color? icon?
const categories: Category[] = [
  { label: "Groceries", transactions: 30, spent: 400, budget: 600 },
  { label: "Transport", transactions: 20, spent: 150, budget: 400 },
  { label: "Takeout & Dining", transactions: 25, spent: 380, budget: 400 },
  { label: "Shopping", transactions: 15, spent: 50, budget: 400 },
  { label: "Entertainment & Fun", transactions: 10, spent: 390, budget: 400 },
  { label: "Rent & Utilities", transactions: 5, spent: 200, budget: 800 },
  { label: "Other", transactions: 0, spent: 200, budget: 300 },
  { label: "Savings", transactions: 0, spent: 210, budget: 200 },
];

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<number[]>([]);

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

  return (
    <div className={styles.mainContainer}>
      {/* BASIC INFORMATION */}
      <div className={styles.infoBoxesContainer}>
        <InfoBox
          title="Total Expense"
          value="1200"
          variant="error"
          footer="$ spent this month"
        />
        <InfoBox
          title="Total Income"
          value="3000"
          variant="success"
          footer="$ earned this month"
        />
        <InfoBox
          title="Total Transactions"
          value="52"
          variant="info"
          footer="transactions this month"
        />
        <InfoBox
          title="Budget Used"
          value="85"
          variant="warning"
          footer="% of budget used this month"
        />
      </div>

      {/* ANALYTICS */}
      <div className={styles.analyticsContainer}>
        <div>
          <AnalyticsPieChart
            month={month}
            year={year}
            categoriesSums={categories.map((cat) => cat.spent)}
          />
        </div>
        <div>
          <AnalyticsPieChart
            month={month}
            year={year}
            categoriesSums={categories.map((cat) => cat.spent)}
          />
        </div>
        <div>
          <TransactionsTable />
        </div>
      </div>

      {/* CATEGORIES TRACKING */}
      <div className={styles.budgetsContainer}>
        {categories.map((category) => (
          <div key={category.label}>
            <BudgetTrackerBox
              category={category.label}
              amountSpent={category.spent}
              budgetAmount={category.budget}
              transactions={category.transactions}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
