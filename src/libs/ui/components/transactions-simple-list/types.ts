export type TransactionsSimpleListProps = {
  id: string;
  type: "income" | "spent";
  category: string;
  amount: number;
  date: string;
};
