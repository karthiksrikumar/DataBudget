import React, { useState } from 'react';
import { FinancialOverview } from './components/Dashboard/FinancialOverview';
import { RecentTransactions } from './components/Dashboard/RecentTransactions';
import { SpendingTrends } from './components/Dashboard/SpendingTrends';
import { CategoryBreakdown } from './components/Dashboard/CategoryBreakdown';
import { TransactionForm } from './components/TransactionForm';
import { SpendingLimits } from './components/SpendingLimits';
import { TransactionFilters } from './components/TransactionFilters';
import type { Transaction } from './types/finance';

// Sample data - In a real app, this would come from a database
const sampleTransactions: Transaction[] = [
  {
    id: '1',
    amount: 3000,
    category: 'Salary',
    description: 'Monthly Salary',
    date: '2024-03-01',
    type: 'income',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: '2',
    amount: 800,
    category: 'Rent/Mortgage',
    description: 'Monthly Rent',
    date: '2024-03-02',
    type: 'expense',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: '3',
    amount: 200,
    category: 'Groceries',
    description: 'Weekly Groceries',
    date: '2024-03-03',
    type: 'expense',
    paymentMethod: 'Credit Card',
  },
  {
    id: '4',
    amount: 500,
    category: 'Freelance Earnings',
    description: 'Web Development Project',
    date: '2024-03-04',
    type: 'income',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: '5',
    amount: 150,
    category: 'Entertainment',
    description: 'Movie Night',
    date: '2024-03-05',
    type: 'expense',
    paymentMethod: 'Credit Card',
  },
];

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [spendingLimits, setSpendingLimits] = useState<{ category: string; limit: number }[]>([
    { category: 'Rent/Mortgage', limit: 1000 },
    { category: 'Groceries', limit: 400 },
    { category: 'Entertainment', limit: 200 },
    { category: 'Transportation', limit: 300 },
    { category: 'Debt Repayment', limit: 500 },
  ]);
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    paymentMethod: '',
    dateRange: '',
  });

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions([...transactions, transaction]);
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filters.type && transaction.type !== filters.type) return false;
    if (filters.category && transaction.category !== filters.category) return false;
    if (filters.paymentMethod && transaction.paymentMethod !== filters.paymentMethod) return false;
    
    if (filters.dateRange) {
      const transactionDate = new Date(transaction.date);
      const today = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          if (transactionDate.toDateString() !== today.toDateString()) return false;
          break;
        case 'week':
          const weekAgo = new Date(today.setDate(today.getDate() - 7));
          if (transactionDate < weekAgo) return false;
          break;
        case 'month':
          if (
            transactionDate.getMonth() !== today.getMonth() ||
            transactionDate.getFullYear() !== today.getFullYear()
          ) return false;
          break;
        case 'year':
          if (transactionDate.getFullYear() !== today.getFullYear()) return false;
          break;
      }
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Personal Finance Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FinancialOverview 
          transactions={filteredTransactions} 
          spendingLimits={spendingLimits}
        />
        
        <TransactionFilters
          filters={filters}
          onFilterChange={setFilters}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SpendingTrends transactions={filteredTransactions} />
          <CategoryBreakdown transactions={filteredTransactions} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TransactionForm
              onSubmit={handleAddTransaction}
              spendingLimits={spendingLimits}
            />
            <SpendingLimits
              limits={spendingLimits}
              onUpdateLimits={setSpendingLimits}
            />
          </div>
          <RecentTransactions transactions={filteredTransactions} />
        </div>
      </main>
    </div>
  );
}

export default App;