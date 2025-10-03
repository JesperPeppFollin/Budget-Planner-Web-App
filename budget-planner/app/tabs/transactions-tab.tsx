import type { TransactionDataType } from "~/backend/data-handler";
import TransactionsTable from "../components/transactions-table";

export default function TransactionsTab({
  className,
  transactionData
}: {
  transactionData: TransactionDataType;
  className?: string;
}) {
  return (
    <div className="w-[700px]">
      <TransactionsTable transactions={transactionData.transactions} />
    </div>
  );
}
