import React, { useState } from 'react';
import { CategorySection } from './components/CategorySection';
import { SummaryCard } from './components/SummaryCard';
import { JsonEditor } from './components/JsonEditor';
import { AddItemModal } from './components/AddItemModal';
import { useFinancialData } from './hooks/useFinancialData';
import { useTheme } from './hooks/useTheme';
import { PieChart, Wallet, Building2, Briefcase, Code, Sun, Moon, Github, Globe, Twitter, Heart, Download, Plus, Menu, X } from 'lucide-react';
import type { FinancialData } from './types';

function App() {
  const { data, updateItem, deleteItem, addItem, setFullData } = useFinancialData();
  const { theme, toggleTheme } = useTheme();
  const [showJsonEditor, setShowJsonEditor] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const totalAssets = Object.values(data.assets).reduce(
    (sum, category) => sum + category.reduce((catSum, item) => catSum + item.value, 0),
    0
  );

  const totalLiabilities = Object.values(data.liabilities).reduce(
    (sum, category) => sum + category.reduce((catSum, item) => catSum + item.value, 0),
    0
  );

  const netWorth = totalAssets - totalLiabilities;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cashAndInvestments':
        return <PieChart className="w-5 h-5" />;
      case 'property':
        return <Building2 className="w-5 h-5" />;
      case 'otherAssets':
        return <Briefcase className="w-5 h-5" />;
      default:
        return <Wallet className="w-5 h-5" />;
    }
  };

  const handleJsonSave = (newData: FinancialData) => {
    setFullData(newData);
  };

  const handleDownloadJson = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'net-worth-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddItem = (type: keyof FinancialData, category: string, item: { name: string; value: number }) => {
    addItem(type, category, item);
    setShowAddModal(false);
  };

  const MenuActions = () => (
    <>
      <button
        onClick={() => setShowAddModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors w-full md:w-auto"
      >
        <Plus className="w-4 h-4" />
        <span>New Item</span>
      </button>
      <button
        onClick={handleDownloadJson}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full md:w-auto"
        title="Download JSON data"
      >
        <Download className="w-4 h-4" />
        <span>Download Data</span>
      </button>
      <button
        onClick={() => setShowJsonEditor(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full md:w-auto"
      >
        <Code className="w-4 h-4" />
        <span>Edit Raw Data</span>
      </button>
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full md:w-auto"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Net Worth Calculator</h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">Track, manage, and grow your financial portfolio</p>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden self-end p-2 rounded-lg bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-t-xl fixed bottom-0 left-0 right-0 flex flex-col gap-2">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold dark:text-white">Menu</h3>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <MenuActions />
              </div>
            </div>
          )}

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <MenuActions />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <SummaryCard 
            title="Net Worth" 
            amount={netWorth} 
            type="net-worth"
            description="Your total financial worth"
            image="https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&q=80&w=2070"
          />
          <SummaryCard 
            title="Total Assets" 
            amount={totalAssets} 
            type="asset"
            description="Your combined assets value"
            image="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=2070"
          />
          <SummaryCard 
            title="Total Liabilities" 
            amount={totalLiabilities} 
            type="liability"
            description="Your total outstanding debts"
            image="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2070"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-emerald-500" />
                Assets
              </h2>
              <div className="space-y-4">
                {Object.entries(data.assets).map(([key, items]) => (
                  <CategorySection
                    key={key}
                    title={key}
                    items={items}
                    type="asset"
                    icon={getCategoryIcon(key)}
                    onUpdate={(itemId, updates) => updateItem('assets', key, itemId, updates)}
                    onDelete={(itemId) => deleteItem('assets', key, itemId)}
                    onAdd={(item) => addItem('assets', key, item)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-red-500" />
                Liabilities
              </h2>
              <div className="space-y-4">
                {Object.entries(data.liabilities).map(([key, items]) => (
                  <CategorySection
                    key={key}
                    title={key}
                    items={items}
                    type="liability"
                    icon={getCategoryIcon(key)}
                    onUpdate={(itemId, updates) => updateItem('liabilities', key, itemId, updates)}
                    onDelete={(itemId) => deleteItem('liabilities', key, itemId)}
                    onAdd={(item) => addItem('liabilities', key, item)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center text-gray-600 dark:text-gray-400 py-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1 text-sm">
            Made with <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> by{' '}
            <a href="https://donvitocodes.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              donvitocodes
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/donvito"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://donvitocodes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/donvito"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </footer>
      </div>

      {showJsonEditor && (
        <JsonEditor
          data={data}
          onSave={handleJsonSave}
          onClose={() => setShowJsonEditor(false)}
        />
      )}

      {showAddModal && (
        <AddItemModal
          data={data}
          onAdd={handleAddItem}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}

export default App;