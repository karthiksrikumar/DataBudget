import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Transaction } from '../../types/finance';

interface SpendingTrendsProps {
  transactions: Transaction[];
}

export function SpendingTrends({ transactions }: SpendingTrendsProps) {
  const dailyExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), 'MMM dd');
      acc[date] = (acc[date] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const data = Object.entries(dailyExpenses).map(([date, amount]) => ({
    date,
    amount,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Spending Trends</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}