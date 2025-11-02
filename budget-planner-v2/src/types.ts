export type Transaction = {
  id: string;
  created_at: string;
  name: string;
  amount: number;
  transaction_date: string;
  category: string | null; // null if income
  is_expense: boolean;
};

export const categories = [
  "Groceries",
  "Transport",
  "Dining & Takeout",
  "Shopping",
  "Entertainment & Fun",
  "Rent & Utilities",
  "Savings",
  "Other",
];

export type Budget = {
  budget_label: string;
  amount: number;
};