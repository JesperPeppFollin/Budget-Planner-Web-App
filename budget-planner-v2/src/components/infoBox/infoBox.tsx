import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../ui/card/card";
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
        <CardTitle>{title}</CardTitle>
        <CardDescription>for this month</CardDescription>
      </CardHeader>
      <CardContent>{value}</CardContent>
    </Card>
  );
}
