import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import type { Transaction } from "../backend/transaction-manager";


export default function TransactionsTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div className="rounded-md border bg-background w-full">
      <div className="relative max-h-[500px] overflow-auto">
        <Table>
          {/* Header */}
          <TableHeader className="border-b">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          
          {/* Scrollable Body */}
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.transaction_date}</TableCell>
                <TableCell>{transaction.name}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell className="text-right">{transaction.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          
          {/* Footer */}
          <TableFooter className="border-t">
            <TableRow>
              <TableCell colSpan={3} className="font-semibold">Total</TableCell>
              <TableCell className="text-right font-semibold">
                $
                {transactions
                  .filter((transaction) => transaction.is_expense)
                  .reduce((acc, transaction) => acc + transaction.amount, 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      
      {/* Caption */}
      <div className="text-sm text-muted-foreground text-center py-2 bg-muted/30">
        A list of your expenses this month.
      </div>
    </div>
  );
}
