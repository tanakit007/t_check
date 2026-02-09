import { Link } from 'react-router-dom';
import { Bot, Home, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-gray-900/80 dark:border-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2 text-primary-600 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white">
                        <Bot size={20} />
                    </div>
                    <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        {t('nav.title')}
                    </span>
                </Link>

                <nav className="flex items-center space-x-4">
                    <Link to="/" className="hidden md:flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                        <Home size={18} />
                        <span>{t('nav.home')}</span>
                    </Link>
                    <Link to="/login" className="hidden md:flex text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium text-sm px-4">
                        {t('auth.login')}
                    </Link>
                    <Link to="/chat" className="hidden md:flex px-4 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm">
                        {t('nav.chat')}
                    </Link>

                    <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1 hidden md:block"></div>

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        <Globe size={16} />
                        <span>{language.toUpperCase()}</span>
                    </button>
                </nav>
            </div>
        </header>
    );
}
