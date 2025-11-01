import styles from "./transactionsTable.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV008",
    paymentStatus: "Paid",
    totalAmount: "$350.00",
    paymentMethod: "Debit Card",
  },
  {
    invoice: "INV009",
    paymentStatus: "Pending",
    totalAmount: "$969.00",
    paymentMethod: "Google Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV008",
    paymentStatus: "Paid",
    totalAmount: "$350.00",
    paymentMethod: "Debit Card",
  },
  {
    invoice: "INV009",
    paymentStatus: "Pending",
    totalAmount: "$969.00",
    paymentMethod: "Google Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV008",
    paymentStatus: "Paid",
    totalAmount: "$350.00",
    paymentMethod: "Debit Card",
  },
  {
    invoice: "INV009",
    paymentStatus: "Pending",
    totalAmount: "$969.00",
    paymentMethod: "Google Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV008",
    paymentStatus: "Paid",
    totalAmount: "$350.00",
    paymentMethod: "Debit Card",
  },
  {
    invoice: "INV009",
    paymentStatus: "Pending",
    totalAmount: "$969.00",
    paymentMethod: "Google Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$815.00",
    paymentMethod: "Apple Pay",
  },
];

export default function TransactionsTable() {
  return (
    <div className={styles.mainContainer}>
      <div
        className={styles.tableContainer}
      >
        <Table className={styles.table}>
          <TableHeader className={styles.tableHeader}>
            <TableRow>
              <TableHead className="w-25">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={styles.tableBody}>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice} className={styles.tableRow}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      {/* <p className={styles.caption}>
        Transactions
      </p> */}
    </div>
  );
}
