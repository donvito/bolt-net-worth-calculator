import { useState, useEffect } from 'react';
import { sampleData } from '../data/sampleData';
import { FinancialItem, FinancialData } from '../types';

const STORAGE_KEY = 'netWorthCalculator';

export function useFinancialData() {
  const [data, setData] = useState<FinancialData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : sampleData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateItem = (
    category: keyof FinancialData,
    subCategory: string,
    itemId: number,
    updates: Partial<FinancialItem>
  ) => {
    setData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subCategory]: prev[category][subCategory].map(item =>
          item.id === itemId ? { ...item, ...updates } : item
        )
      }
    }));
  };

  const deleteItem = (
    category: keyof FinancialData,
    subCategory: string,
    itemId: number
  ) => {
    setData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subCategory]: prev[category][subCategory].filter(item => item.id !== itemId)
      }
    }));
  };

  const addItem = (
    category: keyof FinancialData,
    subCategory: string,
    item: Omit<FinancialItem, 'id'>
  ) => {
    const newId = Math.max(
      ...Object.values(data[category]).flat().map(item => item.id),
      0
    ) + 1;

    setData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subCategory]: [...prev[category][subCategory], { ...item, id: newId }]
      }
    }));
  };

  const setFullData = (newData: FinancialData) => {
    setData(newData);
  };

  return { data, updateItem, deleteItem, addItem, setFullData };
}