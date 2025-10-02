
import TransactionsTable from "../components/transactions-table";

export default function TransactionsTab({className, ...transactionData}: {
transactions: any[];className?: string;}) {
  return (
    <div className="w-[700px]">
        <TransactionsTable transactions={transactionData.transactions} />
    </div>
  );
}
