import type { Route } from "./+types/home";
import useTransactionData from "../backend/data-handler";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import AddTransactionTab from "../tabs/add-transaction-tab";
import TransactionsTab from "../tabs/transactions-tab";
import DashboardTab from "../tabs/dashboard-tab";
import SetBudgetTab from "../tabs/set-budget-tab";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Budget Planner" },
    { name: "description", content: "Budget Planner babyYYy!!" },
  ];
}

export default function Home() {
  const transactionData = useTransactionData();

  return (
    <Tabs defaultValue="dashboard">
      <TabsList>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        <TabsTrigger value="add transaction">Add transaction</TabsTrigger>
        <TabsTrigger value="setBudget">Set Budget</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <DashboardTab transactionData={transactionData} />
      </TabsContent>
      <TabsContent value="add transaction">
        <div className="flex justify-center">
          <AddTransactionTab
            transactionData={transactionData}
          />
        </div>
      </TabsContent>
      <TabsContent value="transactions">
        <div className="flex justify-center">
          <TransactionsTab transactionData={transactionData} />
        </div>
      </TabsContent>
      <TabsContent value="setBudget">
        <div className="flex justify-center">
          <SetBudgetTab transactionData={transactionData} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
