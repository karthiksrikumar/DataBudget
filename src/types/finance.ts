export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
  isRecurring?: boolean;
  recurringInterval?: 'weekly' | 'monthly' | 'yearly';
  paymentMethod?: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
}

export interface Budget {
  category: string;
  limit: number;
  spent: number;
}

export interface SpendingLimit {
  category: string;
  limit: number;
}

export interface FinancialData {
  transactions: Transaction[];
  savingsGoals: SavingsGoal[];
  budgets: Budget[];
  spendingLimits: SpendingLimit[];
}

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance Earnings',
  'Investments',
  'Passive Income',
  'Bonuses & Gifts',
] as const;

export const EXPENSE_CATEGORIES = [
  'Rent/Mortgage',
  'Groceries',
  'Entertainment',
  'Transportation',
  'Debt Repayment',
] as const;

export const PAYMENT_METHODS = [
  'Cash',
  'Credit Card',
  'Debit Card',
  'Bank Transfer',
  'Digital Wallet',
] as const;