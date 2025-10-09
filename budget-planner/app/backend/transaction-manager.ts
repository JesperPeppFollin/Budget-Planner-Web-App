import { category_expenses_identifiers } from "./categories";
import supabase from "./supabase-client";
import Papa from "papaparse";
import { toast } from "sonner";

export interface Transaction {
  id: string;
  created_at: string;
  name: string;
  amount: number;
  transaction_date: string;
  category: string;
  is_expense?: boolean;
}

export class TransactionManager {
  private transactions: Transaction[] = [];

  constructor() {
    this.initialize();
  }

  // Initialize by fetching all transactions from database
  private async initialize() {
    await this.fetchTransactions();
  }

  // Fetch all transactions from Supabase
  private async fetchTransactions() {
    const { data, error } = await supabase.from("transactions").select("*");
    if (error) {
      console.log("Error fetching transactions", error);
    } else {
      this.transactions = data || [];
    }
  }

  // Refresh data from database
  async refresh() {
    await this.fetchTransactions();
  }

  // Get all transactions
  getAllTransactions(): Transaction[] {
    return this.transactions;
  }

  // Filter transactions by month (accepts month name or number)
  filterByMonth(month: string | number, year: number = new Date().getFullYear()): TransactionManager {
    const monthNumber = typeof month === 'string' ? this.getMonthNumber(month) : month;
    const monthStr = monthNumber.toString().padStart(2, "0");
    const yearStr = year.toString();

    const filteredTransactions = this.transactions.filter((transaction) => {
      return transaction.transaction_date.startsWith(`${yearStr}-${monthStr}`);
    });

    // Return a new instance with filtered transactions for method chaining
    const filtered = new TransactionManager();
    filtered.transactions = filteredTransactions;
    return filtered;
  }

  // Filter only expenses
  filterExpenses(): TransactionManager {
    const filteredTransactions = this.transactions.filter(t => t.is_expense);
    const filtered = new TransactionManager();
    filtered.transactions = filteredTransactions;
    return filtered;
  }

  // Filter only income
  filterIncome(): TransactionManager {
    const filteredTransactions = this.transactions.filter(t => !t.is_expense);
    const filtered = new TransactionManager();
    filtered.transactions = filteredTransactions;
    return filtered;
  }

  // Filter by category
  filterByCategory(category: string): TransactionManager {
    const filteredTransactions = this.transactions.filter(t => t.category === category);
    const filtered = new TransactionManager();
    filtered.transactions = filteredTransactions;
    return filtered;
  }

  // Get sum of all transactions in current filter
  sumTransactions(): number {
    return this.transactions.reduce((sum, t) => sum + t.amount, 0);
  }

  // Get count of transactions
  count(): number {
    return this.transactions.length;
  }

  // Get sum by category (for the current filtered transactions)
  sumByCategory(category: string): number {
    return this.transactions
      .filter(t => t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // Add a new transaction
  async addTransaction(transaction: Transaction): Promise<boolean> {
    const { data, error } = await supabase
      .from("transactions")
      .insert(transaction)
      .select();
    
    if (error || !data) {
      toast.error("Error adding transaction");
      return false;
    } else {
      this.transactions.push(...data);
      return true;
    }
  }

  // Handle CSV import (same logic as before)
  async handleCSV(file: File): Promise<boolean> {
    try {
      // Parse CSV in the browser
      const text = await file.text();
      const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });

      // Extract and map columns with all required fields
      const mappedValues = parsed.data
        .filter((row: any) => parseFloat(row.Belopp) < 0) // Only include negative amounts (expenses)
        .map((row: any) => {
          const mappedRow = {
            id: crypto.randomUUID(), // Generate unique ID
            created_at: new Date().toISOString(), // Current timestamp
            name: row.Text || "Imported transaction", // Use Text column or default
            amount: Math.round(Math.abs(parseFloat(row.Belopp))) || 0, // Convert to positive number
            transaction_date: row.Valutadatum, // Use Valutadatum for date
            category: "Other", // Default category
            is_expense: true, // All imported transactions are expenses now
          };
          return mappedRow;
        })
        .filter((row) => row.transaction_date && !isNaN(row.amount)); // Filter out invalid rows

      // Remove duplicates: check if a transaction with all the same data already exists
      const existing = this.getAllTransactions();
      const uniqueValues = mappedValues.filter(newTx => {
        return !existing.some(existingTx =>
          existingTx.name === newTx.name &&
          existingTx.amount === newTx.amount &&
          existingTx.transaction_date === newTx.transaction_date &&
          existingTx.category === newTx.category &&
          existingTx.is_expense === newTx.is_expense
        );
      });

      if (uniqueValues.length === 0) {
        // No new transactions to add
        return true;
      }

      // Insert only unique transactions into Supabase
      const { data, error } = await supabase
        .from("transactions")
        .insert(uniqueValues)
        .select();

      if (data && !error) {
        // Update local state with the inserted transactions
        this.transactions.push(...data);
        toast.success(`Imported ${data.length} new transactions`);
        return true;
      }
      return false;
    } catch (error) {
      toast.error("Error importing CSV");
      return false;
    }
  }

  // Categorize bank transactions (same logic as before)
  async categorizeBankTransactions(): Promise<void> {
    // Get all transactions that need categorizing (currently "Other" category)
    const uncategorizedTransactions = this.transactions.filter(
      (t) => t.category === "Other"
    );

    // Process each transaction
    for (const transaction of uncategorizedTransactions) {
      let newCategory = "Other"; // Default fallback
      const transactionText = transaction.name.toLowerCase();

      // Check each category's keywords using your category_expenses_identifiers
      for (const [categoryName, keywords] of Object.entries(
        category_expenses_identifiers
      )) {
        // Check if any keyword matches
        const hasMatch = keywords.some((keyword) =>
          transactionText.includes(keyword.toLowerCase())
        );

        if (hasMatch) {
          newCategory = categoryName; // Use the category name directly
          break; // Stop at first match
        }
      }

      // Update transaction in database if category changed
      if (newCategory !== "Other") {
        const { error } = await supabase
          .from("transactions")
          .update({ category: newCategory })
          .eq("id", transaction.id);

        if (!error) {
          // Update local state
          const transactionIndex = this.transactions.findIndex(t => t.id === transaction.id);
          if (transactionIndex !== -1) {
            this.transactions[transactionIndex].category = newCategory;
          }
        }
      }
    }
  }

  // Helper method to convert month names to numbers
  private getMonthNumber(monthName: string): number {
    const months = {
      'january': 1, 'february': 2, 'march': 3, 'april': 4,
      'may': 5, 'june': 6, 'july': 7, 'august': 8,
      'september': 9, 'october': 10, 'november': 11, 'december': 12
    };
    return months[monthName.toLowerCase() as keyof typeof months] || 1;
  }

  // Convenience methods for common operations
  getTotalExpenses(): number {
    return this.filterExpenses().sumTransactions();
  }

  getTotalIncome(): number {
    return this.filterIncome().sumTransactions();
  }

  getExpensesForMonth(month: string | number, year?: number): number {
    return this.filterByMonth(month, year).filterExpenses().sumTransactions();
  }

  getTransactionCountForMonth(month: string | number, year?: number): number {
    return this.filterByMonth(month, year).filterExpenses().count();
  }

  // Get all transactions for a specific month (useful for pie charts)
  getTransactionsForMonth(month: string | number, year?: number): Transaction[] {
    return this.filterByMonth(month, year).filterExpenses().getAllTransactions();
  }

  // Get array of category sums for a specific month
  getCategorySumsForMonth(month: string | number, year?: number): number[] {
    const monthlyTransactions = this.filterByMonth(month, year).filterExpenses();
    
    // Get all unique categories from the transactions
    const categories = Array.from(new Set(monthlyTransactions.getAllTransactions().map(t => t.category)));
    
    // Calculate sum for each category
    return categories.map(category => 
      monthlyTransactions.sumByCategory(category)
    );
  }

  // Get array of category sums with category names for a specific month
  getCategorySumsWithNamesForMonth(month: string | number, year?: number): { category: string, amount: number }[] {
    const monthlyTransactions = this.filterByMonth(month, year).filterExpenses();
    
    // Get all unique categories from the transactions
    const categories = Array.from(new Set(monthlyTransactions.getAllTransactions().map(t => t.category)));
    
    // Calculate sum for each category with names
    return categories.map(category => ({
      category,
      amount: monthlyTransactions.sumByCategory(category)
    }));
  }
}