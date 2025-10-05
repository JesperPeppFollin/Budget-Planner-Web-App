import BudgetCard from "../components/summary cards/budget-card";
import TrendCard from "../components/summary cards/trend-card";
import InfoCard from "../components/summary cards/info-card";
import TransactionsPieChart from "../components/transactions-pie-chart";
import type { TransactionDataType } from "../backend/data-handler";

export default function DashboardTab({
  transactionData
}: {
  transactionData: TransactionDataType;
}) {

  const {budgets, totalExpenses, totalIncome, } = transactionData;

  return (

    
    <div>
      <div className="w-full flex flex-row justify-center gap-4">
        <TrendCard title="total income" amount={totalIncome} trend={"up"} />
        <TrendCard title="total expense" amount={totalExpenses} trend={"down"} />
        <BudgetCard amount={totalExpenses} budget={budgets[10]} />
        <InfoCard title="Transactions" amount={transactionData.nbrTransactionsForMonth(9, 2025)} />
      </div>
      <div className="flex flex-row justify-center items-center gap-8">
        <div>
          <TransactionsPieChart transactionData={transactionData} />
        </div>
      </div>
    </div>
  );
}
