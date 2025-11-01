import { useState, useEffect } from "react";
import type { Transaction, Category } from "./types";
import styles from "./App.module.css";
import {
  fetchAllTransactions,
  addTransactions,
  deleteTransaction,
} from "./fetchData";
import {filter} from "./dataHandler";
import AnalyticsPieChart from "./components/pieChart/pieChart";
import BudgetTrackerBox from "./components/budgetTrackerBox/budgetTrackerBox";
import InfoBox from "./components/infoBox/infoBox";
import TransactionsTable from "./components/transactionsTable/transactionsTable";

// TEST DATA
const month = new Date().toLocaleString("default", { month: "long" });
const year = new Date().getFullYear();
// lägga till color?
const categories: Category[] = [
{ label: "Groceries", spent: 400, budget: 600 },
{ label: "Transport", spent: 150, budget: 300 },
{ label: "Takeout & Dining", spent: 200, budget: 400 },
{ label: "Shopping", spent: 200, budget: 400 },
{ label: "Entertainment & Fun", spent: 200, budget: 400 },
{ label: "Rent & Utilities", spent: 200, budget: 400 },
{ label: "Other", spent: 200, budget: 400 },
{ label: "Savings", spent: 200, budget: 400 },
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
        <InfoBox title="Total Expense" value="1200" variant="error" />
        <InfoBox title="Total Income" value="3000" variant="success" />
        <InfoBox title="Total Transactions" value="52" variant="info" />
        <InfoBox title="Budget Used" value="85% spent" variant="warning" />
      </div>

      {/* ANALYTICS */}
      <div className={styles.analyticsContainer}>
        <div>
          <AnalyticsPieChart
            month={month}
            year={year}
            categoriesSums={categories.map(( cat) => cat.spent)}
          />
        </div>
        <div>
          <AnalyticsPieChart
            month={month}
            year={year}
            categoriesSums={[400, 150, 200, 200, 200, 200, 200, 200]}
          />
        </div>
        <div>
          <TransactionsTable />
        </div>
      </div>

      {/* CATEGORIES TRACKING */}
      <div className={styles.budgetsContainer}>
        {categories.map(category => (
          <div key={category.label}>
            <BudgetTrackerBox
              category={category.label}
              amountSpent={category.spent}
              budgetAmount={category.budget}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
