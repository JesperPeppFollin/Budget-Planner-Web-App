import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  CardHeader,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Star } from "lucide-react";

export default function BudgetProgressInfo() {
  return (
    <Card className="min-w-[350px] flex justify-center pl-4 pr-4">
      <div className="flex flex-row justify-between items-center gap-2">
        <CardTitle>Subscriptions</CardTitle>
        <Star />
      </div>
      <CardDescription className="w-[80%]">
        <Progress value={50} />
      </CardDescription>
      <CardFooter>left this month</CardFooter>
    </Card>
  );
}
