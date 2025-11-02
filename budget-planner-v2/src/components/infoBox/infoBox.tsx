import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../ui/card/card";
import { ArrowBigDown, ArrowBigUp, HandCoins, Tally5 } from "lucide-react";
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
  variant: "error" | "success" | "info" | "warning";
}) {
  return (
    <Card className={styles.mainContainer} variant={variant}>
      <CardHeader>
        <CardTitle className={styles.title}>{title}</CardTitle>
      </CardHeader>
      <CardContent className={styles.content}>
        <h4 className={styles[`${variant}Text`]}>{value}</h4>
      </CardContent>
      <CardFooter className={styles.footer}>
        <p>{footer}</p>
      </CardFooter>
    </Card>
  );
}

// function InfoBoxIcon({
//   variant,
// }: {
//   variant: "error" | "success" | "info" | "warning";
// }) {
//   const iconMap = {
//     error: (
//       <div className={styles.iconContainerError}>
//         <ArrowBigDown className={styles.iconFillError} />
//         <ArrowBigDown className={styles.iconStrokeError} />
//       </div>
//     ),
//     success: (
//       <div className={styles.iconContainerSuccess}>
//         <ArrowBigUp className={styles.iconFillSuccess} />
//         <ArrowBigUp className={styles.iconStrokeSuccess} />
//       </div>
//     ),
//     info: (
//       <div className={styles.iconContainerInfo}>
//         <Tally5 className={styles.iconFillInfo} />
//         <Tally5 className={styles.iconStrokeInfo} />
//       </div>
//     ),
//     warning: (
//       <div className={styles.iconContainerWarning}>
//         <HandCoins className={styles.iconFillWarning} />
//         <HandCoins className={styles.iconStrokeWarning} />
//       </div>
//     ),
//   };

//   return <>{iconMap[variant]}</>;
// }
