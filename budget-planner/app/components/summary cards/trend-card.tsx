import { TrendingUp, TrendingDown } from "lucide-react";
import { BaseSummaryCard } from "./base-summary-card";

const isTrendingUp = (amount: number) => {
  if (amount > 0) {
    return true;
  }
  return false;
};

export default function TrendCard({title, amount}: {title: string; amount: number;}) {
  return (
    <BaseSummaryCard
      title={title}
      amount={Math.abs(amount)}
      icon={isTrendingUp(amount) ? TrendingUp : TrendingDown}
      iconColor={isTrendingUp(amount) ? "text-success" : "text-destructive"}
      bgClass={
        isTrendingUp(amount)
          ? "border-success/20 bg-gradient-to-br from-success/5 to-success/10"
          : "border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10"
      }
      footer="this month"
    />
  );
}
