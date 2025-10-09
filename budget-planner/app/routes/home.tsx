import type { Route } from "./+types/home";
import { TransactionManager } from "../backend/transaction-manager";
import { BudgetManager } from "../backend/budget-manager";
import { useState, useEffect, useRef } from "react";
import {Tabs,TabsContent,TabsList,TabsTrigger} from "../components/ui/tabs";
import AddTransactionTab from "../tabs/add-transaction-tab";
import DashboardTab from "../tabs/dashboard-tab";
import SetBudgetTab from "../tabs/set-budget-tab";
import { Spinner } from "~/components/ui/spinner";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Budget Planner" },
    { name: "description", content: "Budget Planner babyYYy!!" },
  ];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Use useRef to store the class instances - they won't cause re-renders but are persistent
  const transactionsRef = useRef<TransactionManager | null>(null);
  const budgetsRef = useRef<BudgetManager | null>(null);

  useEffect(() => {
    const initializeManagers = async () => {
      transactionsRef.current = new TransactionManager();
      budgetsRef.current = new BudgetManager();
      
      // Wait a moment for initialization
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsLoading(false);
    };

    initializeManagers();
  }, []);

  if (isLoading || !transactionsRef.current || !budgetsRef.current) {
    return <div className="flex justify-center items-center h-64"><Spinner/>Loading...</div>;
  }

  // Get the instances for easier access
  const transactions = transactionsRef.current;
  const budgets = budgetsRef.current;

  return (
    <Tabs defaultValue="dashboard">
      <TabsList>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        {/* <TabsTrigger value="transactions">Transactions</TabsTrigger> */}
        <TabsTrigger value="add transaction">Add transaction</TabsTrigger>
        <TabsTrigger value="setBudget">Set Budget</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <DashboardTab transactions={transactions} budgets={budgets} />
      </TabsContent>
      <TabsContent value="add transaction">
        <div className="flex justify-center">
          <AddTransactionTab
            transactions={transactions}
            budgets={budgets}
          />
        </div>
      </TabsContent>
      {/* <TabsContent value="transactions">
        <div className="flex justify-center">
          <TransactionsTab transactions={transactions} />
        </div>
      </TabsContent> */}
      <TabsContent value="setBudget">
        <div className="flex justify-center">
          <SetBudgetTab transactions={transactions} budgets={budgets} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
