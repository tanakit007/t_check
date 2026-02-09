import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import Swal from 'sweetalert2';
import { useLanguage } from '../contexts/LanguageContext';

export default function SettingsModal({ onClose }) {
    const { t } = useLanguage();
    const [apiKey, setApiKey] = useState('');
    const [baseUrl, setBaseUrl] = useState('');
    const [model, setModel] = useState('');

    useEffect(() => {
        setApiKey(localStorage.getItem('ai_api_key') || 'lm-studio');
        setBaseUrl(localStorage.getItem('ai_base_url') || 'http://localhost:1234/v1');
        setModel(localStorage.getItem('ai_model') || 'scb10x_-_llama-3-typhoon-v1.5-8b-instruct');
    }, []);

    const handleSave = () => {
        localStorage.setItem('ai_api_key', apiKey);
        localStorage.setItem('ai_base_url', baseUrl);
        localStorage.setItem('ai_model', model);

        Swal.fire({
            icon: 'success',
            title: 'Settings Saved',
            timer: 1500,
            showConfirmButton: false
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-scale-in">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t('settings.title')}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('settings.apiKey')}</label>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="sk-..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('settings.baseUrl')}</label>
                        <input
                            type="text"
                            value={baseUrl}
                            onChange={(e) => setBaseUrl(e.target.value)}
                            placeholder="e.g., https://api.opentyphoon.ai/v1"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('settings.model')}</label>
                        <input
                            type="text"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            placeholder="e.g., typhoon-v1.5-instruct"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={handleSave}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/20"
                        >
                            <Save size={18} />
                            {t('settings.save')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
