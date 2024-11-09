import React, { useState } from 'react';
import { Code, Save, X } from 'lucide-react';
import { FinancialData } from '../types';

interface JsonEditorProps {
  data: FinancialData;
  onSave: (newData: FinancialData) => void;
  onClose: () => void;
}

export function JsonEditor({ data, onSave, onClose }: JsonEditorProps) {
  const [jsonContent, setJsonContent] = useState(JSON.stringify(data, null, 2));
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    try {
      const parsedData = JSON.parse(jsonContent);
      onSave(parsedData);
      setError(null);
      onClose();
    } catch (e) {
      setError('Invalid JSON format. Please check your syntax.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl mx-4 shadow-xl flex flex-col h-[80vh]">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold dark:text-white">Edit Raw Data</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 p-4 overflow-hidden">
          <textarea
            value={jsonContent}
            onChange={(e) => setJsonContent(e.target.value)}
            className="w-full h-full font-mono text-sm p-4 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            spellCheck="false"
          />
        </div>

        {error && (
          <div className="px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}