import type { TransactionDataType } from "../backend/data-handler";
import useTransactionData from "../backend/data-handler";
import AddTransactionForm from "../components/add-transaction-form";

export default function AddTransactionsTab({
  transactionData,
  className
}: { 
  transactionData: TransactionDataType; 
  className?: string; 
}) {
  return (
      <AddTransactionForm
        transactionData={transactionData}
        className={className}
      />
  );
}
