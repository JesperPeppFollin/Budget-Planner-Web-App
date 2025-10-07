import { TransactionManager } from "../backend/transaction-manager";
import TransactionsTable from "../components/transactions-table";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed in JS

export default function TransactionsTab({transactions,}: {transactions: TransactionManager;}) {
  
  return (
    <div className="w-[700px]">
      <TransactionsTable
        transactions={transactions
          .filterByMonth(currentMonth, currentYear)
          .getAllTransactions()}
      />
    </div>
  );
}
