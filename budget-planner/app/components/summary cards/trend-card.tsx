import { TrendingUp, TrendingDown } from "lucide-react";
import { BaseSummaryCard } from "./base-summary-card";

const isTrendingUp = (trend: "up" | "down") => {
  if (trend === "up") {
    return true;
  }
  return false;
};

export default function TrendCard({title, amount, trend}: {title: string; amount: number; trend: "up" | "down";}) {
  return (
    <BaseSummaryCard
      title={title}
      amount={Math.abs(amount) + " kr"}
      icon={isTrendingUp(trend) ? TrendingUp : TrendingDown}
      iconColor={isTrendingUp(trend) ? "text-success" : "text-destructive"}
      bgClass={
        isTrendingUp(trend)
          ? "border-success/20 bg-gradient-to-br from-success/5 to-success/10"
          : "border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10"
      }
      footer="this month"
    />
  );
}
