import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface SummaryCardProps {
  title: string;
  amount: number;
  type: 'asset' | 'liability' | 'net-worth';
  description: string;
  image?: string;
}

export function SummaryCard({ title, amount, type, description, image }: SummaryCardProps) {
  const getColorClass = () => {
    switch (type) {
      case 'asset':
        return 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 text-emerald-600 dark:text-emerald-400';
      case 'liability':
        return 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 text-red-600 dark:text-red-400';
      case 'net-worth':
        return amount >= 0 
          ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-blue-600 dark:via-blue-700 dark:to-blue-800 text-white' 
          : 'bg-gradient-to-br from-red-500 via-red-600 to-red-700 dark:from-red-600 dark:via-red-700 dark:to-red-800 text-white';
    }
  };

  const Icon = amount >= 0 ? TrendingUp : TrendingDown;

  const isNetWorth = type === 'net-worth';
  const descriptionColor = isNetWorth ? 'text-white/90' : 'opacity-75';
  const iconColor = isNetWorth ? 'text-white' : '';

  return (
    <div className={`rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm ${getColorClass()} ${isNetWorth ? 'md:col-span-2 relative' : ''}`}>
      <div className="flex h-full">
        {/* Image Section */}
        {image && (
          <div className={`relative w-1/3 ${isNetWorth ? 'lg:w-2/5' : ''}`}>
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${isNetWorth ? 'to-blue-600/90 dark:to-blue-700/90' : 'to-current/10'}`} />
            <img 
              src={image} 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content Section */}
        <div className={`flex-1 p-6 ${isNetWorth ? 'lg:p-8' : ''} flex flex-col justify-center`}>
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-semibold ${isNetWorth ? 'text-2xl' : 'text-base'}`}>{title}</h3>
            <Icon className={`${isNetWorth ? 'w-6 h-6' : 'w-5 h-5'} ${iconColor}`} />
          </div>
          <p className={`text-sm mb-3 ${descriptionColor} ${isNetWorth ? 'text-base' : ''}`}>{description}</p>
          <div className="mt-auto">
            <p className={`font-bold tracking-tight ${isNetWorth ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'}`}>
              {formatCurrency(amount)}
            </p>
          </div>
        </div>
      </div>

      {isNetWorth && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-20 -top-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      )}
    </div>
  );
}