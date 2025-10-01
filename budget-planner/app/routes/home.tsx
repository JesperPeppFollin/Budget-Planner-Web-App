import type { Route } from "./+types/home";
import { useTransactionData } from "../backend/data-handler";
import TransactionForm from "../components/add-transaction-form";
import TransactionTable from "../components/transactions-table";
import { TransactionsPieChart } from "~/components/transactions-pie-chart";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Budget Planner" },
    { name: "description", content: "Budget Planner babyYYy!!" },
  ];
}

export default function Home() {
  const transactionData = useTransactionData();

  return (
    <div className="flex flex-col justify-center items-center">
      <TransactionForm
        transactions={transactionData.transactions}
        addTransaction={transactionData.addTransaction}
      />
      <div className="flex flex-row justify-center items-center gap-100">
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
