import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { formatCurrency, formatTitle } from '../utils/formatters';
import { EditableItem } from './EditableItem';
import { FinancialItem } from '../types';

interface CategorySectionProps {
  title: string;
  items: FinancialItem[];
  type: 'asset' | 'liability';
  icon?: React.ReactNode;
  onUpdate: (itemId: number, updates: Partial<FinancialItem>) => void;
  onDelete: (itemId: number) => void;
  onAdd: (item: Omit<FinancialItem, 'id'>) => void;
}

export function CategorySection({
  title,
  items,
  type,
  icon,
  onUpdate,
  onDelete,
  onAdd
}: CategorySectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newValue, setNewValue] = useState('');
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const textColor = type === 'asset' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400';
  const bgColor = type === 'asset' ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20';

  const handleAdd = () => {
    const value = parseFloat(newValue);
    if (newName && !isNaN(value)) {
      onAdd({ name: newName, value });
      setNewName('');
      setNewValue('');
      setIsAdding(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${bgColor}`}>
            {icon}
          </div>
          <h3 className="text-base font-semibold dark:text-white">{formatTitle(title)}</h3>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
        >
          <Plus className="w-3 h-3" />
          <span className="text-xs font-medium">Add Item</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-sm overflow-hidden backdrop-blur-sm">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
              No items added yet
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="p-3">
                <EditableItem
                  item={item}
                  type={type}
                  onUpdate={(updates) => onUpdate(item.id, updates)}
                  onDelete={() => onDelete(item.id)}
                />
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex justify-between items-center font-semibold">
            <span className="dark:text-white text-sm">Total {formatTitle(title)}</span>
            <span className={`${textColor}`}>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-[100] p-4 md:p-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold dark:text-white">Add New {formatTitle(title)} Item</h4>
              <button
                onClick={() => setIsAdding(false)}
                className="p-2 -mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-base"
                  placeholder="Enter name"
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Value
                </label>
                <input
                  id="value"
                  type="number"
                  inputMode="decimal"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-base"
                  placeholder="Enter value"
                  autoComplete="off"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAdd}
                  disabled={!newName || !newValue}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base font-medium"
                >
                  Add Item
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors text-base font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}