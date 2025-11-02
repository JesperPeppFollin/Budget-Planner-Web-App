import { Button } from "../ui/button/button";
import { Plus, PiggyBank, ArrowRightLeft } from "lucide-react";
import styles from "./navBar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.mainContainer}>
      <Button className={styles.button}>
        <p className={styles.text}>Add Transactions</p>
        <Plus className={styles.icon} />
        <ArrowRightLeft className={styles.icon} />
      </Button>
      <Button className={styles.button}>
        <p className={styles.text}>Set Budgets</p>
        <Plus className={styles.icon} />
        <PiggyBank className={styles.icon} />
      </Button>
    </nav>
  );
}
