export const categories_expenses = [
  { id: 1, name: "Food (groceries)", color: "var(--chart-1)" },
  { id: 2, name: "Dining out / Takeout", color: "var(--chart-2)" },
  { id: 3, name: "Alcohol", color: "var(--chart-3)" },
  { id: 4, name: "Rent and Utilities", color: "var(--chart-4)" },
  { id: 5, name: "Entertainment", color: "var(--chart-5)" },
  { id: 6, name: "Subscriptions", color: "var(--chart-6)" },
  { id: 7, name: "Transportation", color: "var(--chart-7)" },
  { id: 8, name: "Shopping", color: "var(--chart-8)" },
  { id: 9, name: "Other", color: "var(--chart-9)" },
];

export const categories_income = [
  { id: 1, name: "CSN", color: "var(--chart-1)" },
  { id: 2, name: "Salary", color: "var(--chart-2)" },
  { id: 3, name: "Other", color: "var(--chart-3)" },
];


export const category_expenses_identifiers = {
  "Food (groceries)": ["ICA", "COOP", "WILLYS"],
  "Dining out / Takeout": ["FOODORA", "GRONT O GOTT", "NOVA WOK I L", "PIZZERIA", "PRESSBYRAN", "RESTAURANG", "ZETTLE E-SE", "ZETTLE MASK"],
  "Alcohol": ["MORISKA", "SYSTEMBOLA", "MALMA  BREWI"],
  "Entertainment": ["BIO", "TEATER", "KONST", "MUSIK"], // placeholders, byt dessa
  "Rent and Utilities": ["46729620942", "ENKLA VARDAG", "FOLKTANDVÅRD"], // första numret är swish för hyra
  "Subscriptions": ["SPOTIFY", "HALLON", "SOUNDCLOUD"],
  "Transportation": ["UBER", "REGION SKÅNE", "BOLT", "VOI"],
  "Shopping": [],
}

export const category_income_identifiers = {
  "CSN": [""],
  "Salary": ["", "", "", "46707225570"],
  "Other": [],
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];