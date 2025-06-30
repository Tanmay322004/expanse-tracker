export interface Expense {
  _id: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
  notes?: string;
}
