import { Calendar } from "lucide-react";
import { BaseSummaryCard } from "./base-summary-card";

export default function InfoCard({ title, amount }: { title: string; amount: number }) {
  return (
    <BaseSummaryCard
      title={title}
      amount={amount}
      icon={Calendar}
      iconColor="text-info"
      bgClass="border-info/20 bg-gradient-to-br from-info/5 to-info/10"
      footer="this month"
    />
  );
}
