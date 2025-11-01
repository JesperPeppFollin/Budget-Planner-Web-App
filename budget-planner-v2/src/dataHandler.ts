import type { Transaction } from "./types";

export function filter(transactions: Transaction[],year?: number,month?: number,category?: string,isExpense?: boolean): Transaction[] {

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
function filterByYear(transactions: Transaction[], year: number): Transaction[] {
  return transactions.filter(t => (parseInt(t.transaction_date.substring(0, 4)) === year));
}

function filterByMonth(transactions: Transaction[], month: number): Transaction[] {
  return transactions.filter(t => (parseInt(t.transaction_date.substring(5, 7)) === month));
}

function filterByCategory(transactions: Transaction[],category: string): Transaction[] {
  return transactions.filter(t => (t.category === category));
}

function filterByIsExpense(transactions: Transaction[],isExpense: boolean): Transaction[] {
  return transactions.filter(t => (t.is_expense === isExpense));
}

// get functions, accumulator functions that return a single value
function getTotalAmount(transactions: Transaction[]): number {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}

function getLength(transactions: Transaction[]): number {
  return transactions.length;
}
