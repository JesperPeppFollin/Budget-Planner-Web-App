import { Ban, CircleCheck, CircleAlert } from "lucide-react";
import { BaseSummaryCard } from "./base-summary-card";

function getBudgetStyle(amount: number, budget: number) {
  if (amount >= budget) {
    return {
      icon: Ban,
      color: "text-destructive",
      title: "Budget",
      bgClass:
        "border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10",
        footer: "over the budget for this month",
    };
  } else if (amount / budget > 0.8) {
    return {
      icon: CircleAlert,
      color: "text-warning",
      title: "Budget",
      bgClass:
        "border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10",
        footer: "left to spend this month, over 80% used",
    };
  } else {
    return {
      icon: CircleCheck,
      color: "text-success",
      title: "Budget",
      bgClass:
        "border-success/20 bg-gradient-to-br from-success/5 to-success/10",
        footer: "left to spend this month",
    };
  }
}

export default function BudgetCard({
  amount,
  budget,
}: {
  amount: number;
  budget: number;
}) {
  const { icon, color, title, bgClass, footer } = getBudgetStyle(amount, budget);

  return (
    <BaseSummaryCard
      title={title}
      amount={Math.abs(budget - amount)}
      icon={icon}
      iconColor={color}
      bgClass={bgClass}
      footer={footer}
    />
  );
}
