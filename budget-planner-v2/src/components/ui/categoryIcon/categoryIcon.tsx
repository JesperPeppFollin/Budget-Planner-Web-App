// 200, 300, 400, 800

import {
  CircleQuestionMark,
  Car,
  CookingPot,
  Clapperboard,
  ShoppingBasket,
  ShoppingCart,
  House,
  PiggyBank,
  ArrowBigDown,
  ArrowBigUp,
  HandCoins,
  Tally5,
} from "lucide-react";
import styles from "./categoryIcon.module.css";

export default function CategoryIcon({ category }: { category: string }) {
  function categoryToIcon(category: string) {
    let IconComponent;

    switch (category) {
      case "Groceries":
        IconComponent = ShoppingBasket;
        break;
      case "Transport":
        IconComponent = Car;
        break;
      case "Takeout & Dining":
        IconComponent = CookingPot;
        break;
      case "Shopping":
        IconComponent = ShoppingCart;
        break;
      case "Entertainment & Fun":
        IconComponent = Clapperboard;
        break;
      case "Rent & Utilities":
        IconComponent = House;
        break;
      case "Other":
        IconComponent = CircleQuestionMark;
        break;
      case "Savings":
        IconComponent = PiggyBank;
        break;
      default:
        IconComponent = CircleQuestionMark;
    }

    return (
      <>
        {/* Fill layer (underneath) */}
        <IconComponent className={styles.iconFill} />
        {/* Stroke layer (on top) */}
        <IconComponent className={styles.iconStroke} />
      </>
    );
  }

  return <div className={styles.mainContainer}>{categoryToIcon(category)}</div>;
}
