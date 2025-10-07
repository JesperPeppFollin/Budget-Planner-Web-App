// import { useState, useEffect } from "react";
// import { category_expenses_identifiers } from "./categories";
// import supabase from "./supabase-client";
// import Papa from "papaparse";

// export interface Transaction {
//   id: string;
//   created_at: string;
//   name: string;
//   amount: number;
//   transaction_date: string;
//   category: string;
//   is_expense?: boolean;
// }

// export type TransactionDataType = ReturnType<typeof useTransactionData>;

// export default function useTransactionData() {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [budgets, setBudgets] = useState<{ [key: number]: number }>({});

//   useEffect(() => {
//     fetchTransactionList();
//     fetchBudgets();
//   }, []);

//   const fetchTransactionList = async () => {
//     const { data, error } = await supabase.from("transactions").select("*");
//     if (error) {
//       console.log("Error fetching transactions");
//     } else {
//       setTransactions(data);
//     }
//   };

//   const fetchBudgets = async () => {
//     const { data, error } = await supabase.from("expense_budgets").select("*");
//     if (error) {
//       console.log("Error fetching budgets", error);
//     } else {
//       // Transform array to object format { budget_id: amount }
//       const budgetObject: { [key: number]: number } = {};
//       data?.forEach((budget) => {
//         budgetObject[budget.budget_id] = budget.amount;
//       });
//       setBudgets(budgetObject);
//     }
//   };

//   const addTransaction = async (transaction: Transaction) => {
//     const { data, error } = await supabase
//       .from("transactions")
//       .insert(transaction)
//       .select();
//     if (error || !data) {
//       console.log("Error adding transaction", "error", error, "data", data);
//       return false;
//     } else {
//       setTransactions((prev) => [...prev, ...data]);
//       return true;
//     }
//   };

//   const addBudgets = async (allBudgets: { [key: number]: number }) => {
//     // Update all budgets in one loop using budget_id
//     for (const [budget_id, amount] of Object.entries(allBudgets)) {
//       await supabase
//         .from("expense_budgets")
//         .update({ amount: amount })
//         .eq("budget_id", Number(budget_id));
//     }
//   };

//   const expensesSumByCategory = (
//     input_transactions: Transaction[],
//     category: string
//   ) => {
//     const expenseTransactions = input_transactions.filter(
//       (t) => t.is_expense && t.category === category
//     );
//     const sum = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
//     return sum;
//   };

//   const expensesByMonth = (month: number, year: number): Transaction[] => {
//     const monthStr = month.toString().padStart(2, "0"); // Convert 9 to "09"
//     const yearStr = year.toString();

//     return transactions.filter((transaction) => {
//       return (
//         transaction.transaction_date.startsWith(`${yearStr}-${monthStr}`) &&
//         transaction.is_expense
//       );
//     });
//   };

//   const nbrTransactionsForMonth = (month: number, year: number) => {
//     return expensesByMonth(month, year).length;
//   };

//   const totalExpenses = transactions
//     .filter((t) => t.is_expense)
//     .reduce((sum, t) => sum + t.amount, 0);

//   const totalIncome = transactions
//     .filter((t) => !t.is_expense)
//     .reduce((sum, t) => sum + t.amount, 0);

//   // no error handling, code and explode🙏🙏

//   const handleCSV = async (file: File) => {
//     // Parse CSV in the browser
//     const text = await file.text();
//     const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });

//     // Extract and map columns with all required fields
//     const mappedValues = parsed.data
//       .filter((row: any) => parseFloat(row.Belopp) < 0) // Only include negative amounts (expenses)
//       .map((row: any) => {
//         const mappedRow = {
//           id: crypto.randomUUID(), // Generate unique ID
//           created_at: new Date().toISOString(), // Current timestamp
//           name: row.Text || "Imported transaction", // Use Text column or default
//           amount: Math.round(Math.abs(parseFloat(row.Belopp))) || 0, // Convert to positive number
//           transaction_date: row.Valutadatum, // Use Valutadatum for date
//           category: "Other", // Default category
//           is_expense: true, // All imported transactions are expenses now
//         };

//         return mappedRow;
//       })
//       .filter((row) => row.transaction_date && !isNaN(row.amount)); // Filter out invalid rows

//     // Insert into Supabase
//     const { data, error } = await supabase
//       .from("transactions")
//       .insert(mappedValues)
//       .select(); // Add .select() to return the inserted data

//     if (data && !error) {
//       // Update local state with the inserted transactions
//       setTransactions((prev) => [...prev, ...data]);

//       // // Now categorize the newly added transactions
//       // categorizeBankTransactions();
//     }
//   };

//   // no error handling here either, code and explode🙏🙏

//   const categorizeBankTransactions = async () => {
//     // Get all transactions that need categorizing (currently "Other" category)
//     const uncategorizedTransactions = transactions.filter(
//       (t) => t.category === "Other"
//     );

//     // Process each transaction
//     for (const transaction of uncategorizedTransactions) {
//       let newCategory = "Other"; // Default fallback
//       const transactionText = transaction.name.toLowerCase();

//       // Check each category's keywords using your category_expenses_identifiers
//       for (const [categoryName, keywords] of Object.entries(
//         category_expenses_identifiers
//       )) {
//         // Check if any keyword matches
//         const hasMatch = keywords.some((keyword) =>
//           transactionText.includes(keyword.toLowerCase())
//         );

//         if (hasMatch) {
//           newCategory = categoryName; // Use the category name directly
//           break; // Stop at first match
//         }
//       }

//       // Update transaction in database if category changed
//       if (newCategory !== "Other") {
//         const { error } = await supabase
//           .from("transactions")
//           .update({ category: newCategory })
//           .eq("id", transaction.id);

//         if (!error) {
//           // Update local state
//           setTransactions((prev) =>
//             prev.map((t) =>
//               t.id === transaction.id ? { ...t, category: newCategory } : t
//             )
//           );
//         }
//       }
//     }

//     console.log("Categorization complete!");
//   };

//   return {
//     transactions,
//     budgets,
//     addTransaction,
//     addBudgets,
//     expensesSumByCategory,
//     expensesByMonth,
//     nbrTransactionsForMonth,
//     totalExpenses,
//     totalIncome,
//     handleCSV,
//     categorizeBankTransactions,
//   };
// }
