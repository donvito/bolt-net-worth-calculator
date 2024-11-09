import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Trash, Check, X } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { FinancialItem } from '../types';

interface EditableItemProps {
  item: FinancialItem;
  type: 'asset' | 'liability';
  onUpdate: (updates: Partial<FinancialItem>) => void;
  onDelete: () => void;
}

export function EditableItem({ item, type, onUpdate, onDelete }: EditableItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);
  const [editedValue, setEditedValue] = useState(item.value.toString());
  const nameInputRef = useRef<HTMLInputElement>(null);
  const textColor = type === 'asset' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400';

  useEffect(() => {
    if (isEditing && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    const value = parseFloat(editedValue);
    if (isNaN(value)) return;

    onUpdate({ name: editedName, value });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(item.name);
    setEditedValue(item.value.toString());
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:gap-3">
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <input
            ref={nameInputRef}
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-3 py-1.5 text-sm border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            placeholder="Enter name"
          />
          <input
            type="number"
            inputMode="decimal"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full sm:w-32 px-3 py-1.5 text-sm border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            placeholder="Enter value"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleSave}
            disabled={!editedName || !editedValue}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            title="Save"
          >
            <Check className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 text-sm font-medium"
            title="Cancel"
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center group">
      <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{item.name}</span>
      <div className="flex items-center gap-3">
        <span className={`${textColor} font-semibold text-sm`}>{formatCurrency(item.value)}</span>
        <div className="flex gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/30"
            title="Delete"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}