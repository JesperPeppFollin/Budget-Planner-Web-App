import OpenAI from "openai";
import supabase from "./supabase-client";

// STEP 1: FETCH TRANSACTIONS
async function fetchTransactions() {
  const { data, error } = await supabase
    .from("transactions")
    .select("id, name, amount, transaction_date") // Fixed column names
    .eq("category", "Other"); // Fixed filter condition

  if (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }

  return data || []; // Ensure we always return an array
}

// STEP 2: CATEGORISE TRANSACTIONS
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function categorizeTransactions(transactions: any[]) {
  // Add validation to ensure transactions is an array
  if (!Array.isArray(transactions)) {
    console.error("categorizeTransactions expects an array, got:", typeof transactions);
    return [];
  }

  if (transactions.length === 0) {
    console.log("No transactions to categorize");
    return [];
  }

  // Convert transactions to JSON-like string for GPT prompt
  const transactionText = transactions
    .map((tx) => {
      const desc = tx.name.replace(/"/g, '\\"'); // Use 'name' instead of 'description'
      return `{"id": ${tx.id}, "description": "${desc}", "amount": ${tx.amount}, "date": "${tx.transaction_date}"}`;
    })
    .join(",\n");

  const prompt = `
Here are some transactions. Please categorize each into one of these categories:
"Food (groceries)", "Dining out / Takeout", "Alcohol", "Rent and Utilities", "Transportation", "Entertainment", "Shopping", "Savings", "Other"

Transactions:
[
${transactionText}
]
`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // Fixed model name (lowercase)
      messages: [{ role: "user", content: prompt }],
      functions: [
        {
          name: "categorize_transactions",
          description: "Categorize bank transactions by id",
          parameters: {
            type: "object",
            properties: {
              transactions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" }, // Changed to string since your IDs might be UUIDs
                    category: {
                      type: "string",
                      enum: [
                        "Food (groceries)",
                        "Dining out / Takeout",
                        "Alcohol", 
                        "Rent and Utilities",
                        "Transportation",
                        "Entertainment",
                        "Shopping",
                        "Savings",
                        "Other"
                      ],
                    },
                  },
                  required: ["id", "category"],
                },
              },
            },
            required: ["transactions"],
          },
        },
      ],
      function_call: { name: "categorize_transactions" },
    });

    // Uncomment and fix the return statement
    const functionCall = response.choices[0].message.function_call;
    const categorized = JSON.parse(functionCall?.arguments || '{"transactions": []}');
    return categorized.transactions || []; // array of {id, category}
  } catch (error) {
    console.error("Error in categorizeTransactions:", error);
    return [];
  }
}

export { fetchTransactions, categorizeTransactions };