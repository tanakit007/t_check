import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomePage() {
    const { t } = useLanguage();

    return (
        <div className="relative overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-900 -z-10" />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8 border border-blue-200">
                        <Zap size={16} className="mr-2" />
                        <span>{t('home.tag')}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                        {t('home.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{t('home.titleHighlight')}</span>
                    </h1>

                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {t('home.description')}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link to="/chat" className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center">
                            {t('home.cta')}
                            <ArrowRight className="ml-2" />
                        </Link>
                        <button className="px-8 py-4 rounded-full bg-white text-gray-800 font-bold text-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                            {t('home.learnMore')}
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<CheckCircle className="text-green-500" size={32} />}
                            title={t('home.features.instant.title')}
                            desc={t('home.features.instant.desc')}
                        />
                        <FeatureCard
                            icon={<Zap className="text-yellow-500" size={32} />}
                            title={t('home.features.style.title')}
                            desc={t('home.features.style.desc')}
                        />
                        <FeatureCard
                            icon={<Shield className="text-blue-500" size={32} />}
                            title={t('home.features.privacy.title')}
                            desc={t('home.features.privacy.desc')}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="bg-white dark:bg-gray-700 w-14 h-14 rounded-xl flex items-center justify-center shadow-sm mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
        </div>
    );
}
