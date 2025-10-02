import type { Route } from "./+types/home";
import { useTransactionData } from "../backend/data-handler";
import AddTransaction from "../tabs/add-transaction";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import Dashboard from "../tabs/dashboard";

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
        <TabsTrigger value="add transaction">Add transaction</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <Dashboard transactions={transactionData.transactions} />
      </TabsContent>
      <TabsContent value="add transaction">
        <div className="flex justify-center">
          <AddTransaction
            transactions={transactionData.transactions}
            addTransaction={transactionData.addTransaction}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
