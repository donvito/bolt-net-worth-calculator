import React from 'react';
import { ArrowTrendingUp, ArrowTrendingDown, DollarSign } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface SummaryProps {
  totalAssets: number;
  totalLiabilities: number;
}

export default function Summary({ totalAssets, totalLiabilities }: SummaryProps) {
  const netWorth = totalAssets - totalLiabilities;
  const isPositive = netWorth >= 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full">
            <ArrowTrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Assets</p>
            <p className="text-xl font-bold text-green-600">{formatCurrency(totalAssets)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-100 rounded-full">
            <ArrowTrendingDown className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Liabilities</p>
            <p className="text-xl font-bold text-red-600">{formatCurrency(totalLiabilities)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${isPositive ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <DollarSign className={`w-6 h-6 ${isPositive ? 'text-blue-600' : 'text-gray-600'}`} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Net Worth</p>
            <p className={`text-xl font-bold ${isPositive ? 'text-blue-600' : 'text-gray-600'}`}>
              {formatCurrency(netWorth)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}