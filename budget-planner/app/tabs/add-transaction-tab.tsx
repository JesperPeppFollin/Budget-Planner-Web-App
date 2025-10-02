import type { TransactionDataType } from "../backend/data-handler";
import AddTransactionForm from "../components/add-transaction-form";

export default function AddTransactionsTab({
  className,
  ...transactionData
}: TransactionDataType & { className?: string }) {
  return (
      <AddTransactionForm
        transactions={transactionData.transactions}
        addTransaction={transactionData.addTransaction}
      />
  );
}
