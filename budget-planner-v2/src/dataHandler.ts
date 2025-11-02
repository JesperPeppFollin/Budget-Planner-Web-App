import type { Transaction } from "./types";

export function filter(
  transactions: Transaction[],
  year?: string,
  month?: string,
  category?: string,
  isExpense?: boolean
): Transaction[] {
  
  if (year !== undefined) {
    transactions = filterByYear(transactions, year);
  }
  if (month !== undefined) {
    transactions = filterByMonth(transactions, month);
  }
  if (category !== undefined) {
    transactions = filterByCategory(transactions, category);
  }
  if (isExpense !== undefined) {
    transactions = filterByIsExpense(transactions, isExpense);
  }
  return transactions;
}

// filtering functions, returns new array based on filtering criteria
function filterByYear(
  transactions: Transaction[],
  year: string
): Transaction[] {
  return transactions.filter((t) => t.transaction_date.startsWith(year));
}

function filterByMonth(
  transactions: Transaction[],
  month: string
): Transaction[] {
  return transactions.filter(
    (t) => t.transaction_date.substring(5, 7) === month
  );
}

function filterByCategory(
  transactions: Transaction[],
  category: string
): Transaction[] {
  return transactions.filter((t) => t.category === category);
}

function filterByIsExpense(
  transactions: Transaction[],
  isExpense: boolean
): Transaction[] {
  return transactions.filter((t) => t.is_expense === isExpense);
}

// get functions, accumulator functions that return a single value
export function getTotalAmount(transactions: Transaction[]): number {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}

export function getLength(transactions: Transaction[]): number {
  return transactions.length;
}
