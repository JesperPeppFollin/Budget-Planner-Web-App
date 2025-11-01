import styles from './budgetTrackerBox.module.css';

export default function BudgetTrackerBox({ category, amountSpent, budgetAmount }: { category: string; amountSpent: number; budgetAmount: number; }) {

    return (
        <div className={styles.mainContainer}>
            <h3>{category}</h3>
            <p>Amount Spent: ${amountSpent}</p>
            <p>Budget Amount: ${budgetAmount}</p>
        </div>
    );
}