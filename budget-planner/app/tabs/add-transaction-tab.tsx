import { TransactionManager } from "../backend/transaction-manager";
import { BudgetManager } from "../backend/budget-manager";
import AddTransactionForm from "../components/add-transaction-form";

export default function AddTransactionsTab({
  transactions,
  budgets,
  className
}: { 
  transactions: TransactionManager;
  budgets: BudgetManager; 
  className?: string; 
}) {
  return (
      <AddTransactionForm
        transactions={transactions}
        budgets={budgets}
        className={className}
      />
  );
}
