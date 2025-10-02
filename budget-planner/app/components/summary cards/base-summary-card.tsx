import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DollarSign } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface BaseSummaryCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  iconColor: string;
  bgClass: string;
  footer?: string;
  children?: React.ReactNode;
}

export function BaseSummaryCard({
  title,
  amount,
  icon: Icon,
  iconColor,
  bgClass,
  footer,
  children,
}: BaseSummaryCardProps) {
  return (
    <Card className={`min-w-[350px] overflow-hidden flex flex-col ${bgClass}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
        <div className={`flex flex-row items-center justify-start text-2xl font-bold ${iconColor}`}>
          <DollarSign strokeWidth={3} className={` h-5 w-5 ${iconColor}`} />
          {amount}
        </div>
        <p className="text-xs text-muted-foreground">{footer}</p>
        {children}
      </CardContent>
    </Card>
  );
}
