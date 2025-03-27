import React from 'react';
import { BarChart3, PiggyBank, Wallet, AlertTriangle } from 'lucide-react';
import { Transaction } from '../../types/finance';

interface FinancialOverviewProps {
  transactions: Transaction[];
  spendingLimits: { category: string; limit: number }[];
}

export function FinancialOverview({ transactions, spendingLimits }: FinancialOverviewProps) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Calculate spending by category
  const categorySpending = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  // Check for categories that exceeded their limits
  const exceededLimits = spendingLimits
    .filter(limit => (categorySpending[limit.category] || 0) > limit.limit)
    .map(limit => ({
      category: limit.category,
      spent: categorySpending[limit.category] || 0,
      limit: limit.limit,
    }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Income</p>
              <p className="text-2xl font-semibold text-green-600">${totalIncome.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-semibold text-red-600">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <PiggyBank className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Balance</p>
              <p className="text-2xl font-semibold text-blue-600">${balance.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {exceededLimits.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 mr-3" />
            <div>
              <h3 className="text-amber-800 font-medium">Spending Limits Exceeded</h3>
              <div className="mt-2 space-y-1">
                {exceededLimits.map(({ category, spent, limit }) => (
                  <p key={category} className="text-amber-700">
                    {category}: Spent ${spent.toFixed(2)} of ${limit.toFixed(2)} limit
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}