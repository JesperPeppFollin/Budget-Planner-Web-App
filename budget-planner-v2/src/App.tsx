import { useState, useEffect } from "react";
import type { Transaction, Budget } from "./types";
import { categories } from "./types";
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
import NavBar from "./components/navBar/navBar";

// TEST DATA
const month = new Date().toLocaleString("default", { month: "2-digit" });
const year = new Date().getFullYear();

const initalTransactions: Transaction[] = [
  {
    id: "1",
    created_at: "2024-06-01T10:00:00Z",
    name: "Grocery Store",
    amount: 50,
    transaction_date: "2025-11-05",
    category: "Groceries",
    is_expense: true,
  },
  {
    id: "2",
    created_at: "2024-06-02T11:30:00Z",
    name: "Salary",
    amount: 2000,
    transaction_date: "2025-11-01",
    category: null,
    is_expense: false,
  },
  {
    id: "3",
    created_at: "2024-06-03T12:00:00Z",
    name: "Electric Bill",
    amount: 100,
    transaction_date: "2025-11-03",
    category: "Rent & Utilities",
    is_expense: true,
  },
  {
    id: "4",
    created_at: "2024-06-04T09:00:00Z",
    name: "Freelance Work",
    amount: 500,
    transaction_date: "2025-11-04",
    category: null,
    is_expense: false,
  },
  {
    id: "5",
    created_at: "2024-06-05T08:00:00Z",
    name: "Water Bill",
    amount: 30,
    transaction_date: "2025-11-05",
    category: "Rent & Utilities",
    is_expense: true,
  },
  {
    id: "6",
    created_at: "2024-06-06T14:00:00Z",
    name: "Restaurant",
    amount: 80,
    transaction_date: "2025-11-06",
    category: "Dining & Takeout",
    is_expense: true,
  },
  {
    id: "7",
    created_at: "2024-06-07T15:30:00Z",
    name: "Internet Bill",
    amount: 60,
    transaction_date: "2025-11-07",
    category: "Rent & Utilities",
    is_expense: true,
  },
  {
    id: "8",
    created_at: "2024-06-08T16:00:00Z",
    name: "Gym Membership",
    amount: 50,
    transaction_date: "2025-11-08",
    category: "Entertainment & Fun",
    is_expense: true,
  },
  {
    id: "9",
    created_at: "2024-06-08T16:00:00Z",
    name: "Skånetrafiken",
    amount: 50,
    transaction_date: "2025-11-08",
    category: "Transport",
    is_expense: true,
  },
];

const initalBudgets: Budget[] = [
  { budget_label: "Groceries", amount: 300 },
  { budget_label: "Transport", amount: 100 },
  { budget_label: "Dining & Takeout", amount: 150 },
  { budget_label: "Shopping", amount: 200 },
  { budget_label: "Entertainment & Fun", amount: 100 },
  { budget_label: "Rent & Utilities", amount: 1200 },
  { budget_label: "Savings", amount: 150 },
  { budget_label: "Other", amount: 500 },
];

export default function App() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initalTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(initalBudgets);

  // useEffect(() => {
  //   const loadTransactions = async () => {
  //     const [data, error] = await fetchAllTransactions();
  //     if (error) {
  //       console.error("Error fetching transactions:", error);
  //       return;
  //     }
  //     setTransactions(data);
  //   };
  //   loadTransactions();
  // }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.infoBoxContainer}>
        <InfoBox
          title="Total Income"
          value={String(
            getTotalAmount(
              filter(transactions, String(year), month, undefined, false)
            )
          )}
          variant="success"
          footer="$ this month"
        />
        <InfoBox
          title="Total Expenses"
          value={String(
            getTotalAmount(
              filter(transactions, String(year), month, undefined, true)
            )
          )}
          variant="error"
          footer="$ this month"
        />
        <InfoBox
          title="Transactions"
          value={String(getLength(filter(transactions, String(year), month)))}
          variant="info"
          footer="this month"
        />
        <InfoBox
          title="Budget Used"
          value={String(
            Math.round(
              (getTotalAmount(
                filter(transactions, String(year), month, undefined, true)
              ) /
                budgets.reduce((acc, cat) => acc + cat.amount, 0)) *
                100
            )
          )}
          variant="warning"
          footer="% used this month"
        />
      </div>

      {/* Budget */}
      <div className={styles.budgetsContainer}>
        {categories.map((category, index) => (
          <BudgetTrackerBox
            key={category}
            category={category}
            amountSpent={getTotalAmount(
              filter(transactions, String(year), month, category, true)
            )}
            budgetAmount={budgets[index].amount}
            transactions={getLength(
              filter(transactions, String(year), month, category)
            )}
          />
        ))}
      </div>
      <div className={styles.navBarContainer}>
        <NavBar />
      </div>
    </div>
  );
}
