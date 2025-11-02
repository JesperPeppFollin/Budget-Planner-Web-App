import { Bold } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import CategoryIcon from "../ui/categoryIcon/categoryIcon";
import { Progress } from "../ui/progress/progress";
import styles from "./budgetTrackerBox.module.css";

export default function BudgetTrackerBox({
  category,
  amountSpent,
  budgetAmount,
  transactions,
}: {
  category: string;
  amountSpent: number;
  budgetAmount: number;
  transactions: number;
}) {
  function getProgressVariant(
    spent: number,
    budget: number
  ): "warning" | "error" | "success" {
    const percentage = (spent / budget) * 100;
    if (percentage >= 100) {
      return "error";
    } else if (percentage >= 80) {
      return "warning";
    } else {
      return "success";
    }
  }

  return (
    <Card className={styles.mainContainer}>
      <CardHeader>
        <CardTitle className={styles.title}>
          {category}
          <CategoryIcon category={category} />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className={styles.progressContainer}>
          <h3>
            {budgetAmount - amountSpent > 0
              ? `$${budgetAmount - amountSpent}`
              : "Over Budget"}
          </h3>
          <p>
            {budgetAmount - amountSpent > 0
              ? "left of budget"
              : `by $${amountSpent - budgetAmount}`}
          </p>
          <Progress
            className={styles.progress}
            value={(amountSpent / budgetAmount) * 100}
            variant={getProgressVariant(amountSpent, budgetAmount)}
          />
        </div>
      </CardContent>

      <CardFooter className={styles.infoContainer}>
          <div className={styles.firstInfo}>
            Budget: <b>${budgetAmount}</b>
          </div>
          <div className={styles.info}>
            Spent: <b>${amountSpent}</b>
          </div>
          <div className={styles.lastInfo}>
            Transactions: <b>{transactions}</b>
          </div>
      </CardFooter>
    </Card>
  );
}
