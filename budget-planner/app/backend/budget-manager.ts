import supabase from "./supabase-client";

export interface Budget {
  budget_id: number;
  amount: number;
}

export class BudgetManager {
  budgets: { [key: number]: number } = {};

  constructor() {
    this.initialize();
  }

  // Initialize by fetching all budgets from database
  private async initialize() {
    await this.fetchBudgets();
  }

  // Fetch all budgets from Supabase
  private async fetchBudgets() {
    const { data, error } = await supabase.from("expense_budgets").select("*");
    if (error) {
      console.log("Error fetching budgets", error);
    } else {
      // Transform array to object format { budget_id: amount }
      const budgetObject: { [key: number]: number } = {};
      data?.forEach((budget) => {
        budgetObject[budget.budget_id] = budget.amount;
      });
      this.budgets = budgetObject;
    }
  }

  // Refresh data from database
  async refresh() {
    await this.fetchBudgets();
  }

  // Get all budgets
  getAllBudgets(): { [key: number]: number } {
    return this.budgets;
  }

  // Get budget for specific category/id
  getBudget(budgetId: number): number {
    return this.budgets[budgetId] || 0;
  }

  // Set budget for specific category/id
  setBudget(budgetId: number, amount: number): void {
    this.budgets[budgetId] = amount;
  }

  // Update all budgets in database
  async saveBudgets(): Promise<boolean> {
    try {
      // Update all budgets in one loop using budget_id
      for (const [budget_id, amount] of Object.entries(this.budgets)) {
        await supabase
          .from("expense_budgets")
          .update({ amount: amount })
          .eq("budget_id", Number(budget_id));
      }
      return true;
    } catch (error) {
      console.log("Error saving budgets", error);
      return false;
    }
  }

  // Update specific budget in database
  async saveBudget(budgetId: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("expense_budgets")
        .update({ amount: this.budgets[budgetId] })
        .eq("budget_id", budgetId);
      
      return !error;
    } catch (error) {
      console.log("Error saving budget", error);
      return false;
    }
  }

  // Get total of all budgets
  getTotalBudget(): number {
    return Object.values(this.budgets).reduce((sum, amount) => sum + amount, 0);
  }

  // Check if spending is within budget
  isWithinBudget(budgetId: number, actualSpending: number): boolean {
    const budget = this.getBudget(budgetId);
    return actualSpending <= budget;
  }

  // Get budget utilization percentage
  getBudgetUtilization(budgetId: number, actualSpending: number): number {
    const budget = this.getBudget(budgetId);
    if (budget === 0) return 0;
    return (actualSpending / budget) * 100;
  }

  // Get remaining budget
  getRemainingBudget(budgetId: number, actualSpending: number): number {
    const budget = this.getBudget(budgetId);
    return Math.max(0, budget - actualSpending);
  }
}