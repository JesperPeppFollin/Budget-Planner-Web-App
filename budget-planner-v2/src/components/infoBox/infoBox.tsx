import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../ui/card/card";
import { TrendingUp } from "lucide-react";
import styles from "./infoBox.module.css";

export default function InfoBox({
  title,
  value,
  variant,
}: {
  title: string;
  value: string;
  variant: "error" | "success" | "info" | "warning";
}) {
  return (
    <Card className={styles.mainContainer} variant={variant}>
      <CardHeader>
        <CardTitle className={styles.title}>{title} <TrendingUp /></CardTitle>
        <CardDescription className={styles.description}>for this month</CardDescription>
      </CardHeader>
      <CardContent className={styles.content}>{value}</CardContent>
    </Card>
  );
}
