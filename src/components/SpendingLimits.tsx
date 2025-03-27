import React, { useState } from 'react';
import { EXPENSE_CATEGORIES } from '../types/finance';

interface SpendingLimitsProps {
  limits: { category: string; limit: number }[];
  onUpdateLimits: (limits: { category: string; limit: number }[]) => void;
}

export function SpendingLimits({ limits, onUpdateLimits }: SpendingLimitsProps) {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newLimit, setNewLimit] = useState<string>('');

  const handleUpdateLimit = (category: string) => {
    const updatedLimits = limits.map(limit =>
      limit.category === category
        ? { ...limit, limit: parseFloat(newLimit) }
        : limit
    );
    onUpdateLimits(updatedLimits);
    setEditingCategory(null);
    setNewLimit('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Spending Limits</h2>
      <div className="space-y-4">
        {EXPENSE_CATEGORIES.map(category => {
          const limit = limits.find(l => l.category === category);
          const isEditing = editingCategory === category;

          return (
            <div key={category} className="flex items-center justify-between">
              <span className="text-gray-700">{category}</span>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={newLimit}
                    onChange={(e) => setNewLimit(e.target.value)}
                    className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleUpdateLimit(category)}
                    className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-medium">
                    ${limit?.limit.toFixed(2) || '0.00'}
                  </span>
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setNewLimit(limit?.limit.toString() || '');
                    }}
                    className="px-2 py-1 text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}