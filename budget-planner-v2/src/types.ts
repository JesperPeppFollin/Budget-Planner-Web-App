export type Transaction = {
  id: string;
  created_at: string;
  name: string;
  amount: number;
  transaction_date: string;
  category: string;
  is_expense: boolean;
};

export interface Category { // kan detta va en type istället?
  label: string;
  spent: number;
  budget: number;
}

// type CategoryKey =
//   | "groceries"
//   | "transport"
//   | "takeoutAndDining"
//   | "shopping"
//   | "entertainmentAndFun"
//   | "rentAndUtilities"
//   | "other"
//   | "savings";

