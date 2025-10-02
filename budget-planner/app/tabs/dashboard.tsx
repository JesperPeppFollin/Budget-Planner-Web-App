import BudgetCard from "../components/summary cards/budget-card";
import TrendCard from "../components/summary cards/trend-card";
import InfoCard from "../components/summary cards/info-card";
import TransactionsPieChart from "../components/transactions-pie-chart";
import TransactionTable from "../components/transactions-table";

export default function Dashboard({
  className,
  ...transactionData
}: {
  transactions: any[];
  className?: string;
}) {
  return (
    <div>
      <div className="w-full flex flex-row justify-center gap-4">
        <TrendCard title="income and expenses" amount={43} />
        <BudgetCard amount={90} budget={100} />
        <InfoCard title="Transactions" amount={50} />
      </div>
      <div className="flex flex-row justify-center items-center gap-8">
        <div>
          <TransactionsPieChart />
        </div>
        <div className="flex justify-center items-center my-10 min-w-[700px]">
          <TransactionTable transactions={transactionData.transactions} />
        </div>
      </div>
    </div>
  );
}
