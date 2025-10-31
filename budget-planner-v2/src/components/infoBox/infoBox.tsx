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
  footer,
  variant,
}: {
  title: string;
  value: string;
  footer: string;
  variant: "error" | "success" | "info";
}) {
  return (
    <Card className={styles.mainContainer} variant={variant}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{footer}</CardDescription>
      </CardHeader>
      <CardContent>{value}</CardContent>
    </Card>
  );
}
