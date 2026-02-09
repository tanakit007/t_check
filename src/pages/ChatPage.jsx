import { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Check, Loader2, Download, FileText, Share, Save, User, Sparkles, Feather, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Swal from 'sweetalert2';
import SettingsModal from '../components/SettingsModal';
import { checkGrammar, humanizeText, paraphraseText } from '../services/aiService';

export default function ChatPage() {
    const { t, language } = useLanguage();
    const [text, setText] = useState('');
    const [correctedText, setCorrectedText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showFileMenu, setShowFileMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const menuRef = useRef(null);
    const [activeTab, setActiveTab] = useState('grammar');

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowFileMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleProcess = async (option = null) => {
        const strippedText = text.replace(/<[^>]+>/g, '').trim();
        if (!strippedText) return;

        // Check if configured (allow local usage without explicit key if base url is localhost)
        const storedBaseUrl = localStorage.getItem('ai_base_url') || '';
        const storedApiKey = localStorage.getItem('ai_api_key');

        if (!storedApiKey && !storedBaseUrl.includes('localhost') && !storedBaseUrl.includes('127.0.0.1')) {
            Swal.fire({
                icon: 'warning',
                title: 'API Key Missing',
                text: 'Please configure your Typhoon/OpenAI API Key in Settings to use this feature.',
                confirmButtonText: 'Open Settings'
            }).then((result) => {
                if (result.isConfirmed) {
                    setShowSettings(true);
                }
            });
            return;
        }

        setIsProcessing(true);
        setCorrectedText('');
        setShowResults(false);

        try {
            let result = '';
            if (activeTab === 'grammar') {
                result = await checkGrammar(strippedText, language);
            } else if (activeTab === 'humanizer') {
                const voice = option || 'The Everyday Voice';
                result = await humanizeText(strippedText, voice, language);
            } else if (activeTab === 'paraphraser') {
                const style = option || 'Professional';
                result = await paraphraseText(strippedText, style, language);
            }

            // Convert newlines to HTML breaks for display
            setCorrectedText(result.replace(/\n/g, '<br />'));
            setShowResults(true);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to process text.'
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSaveLocal = () => {
        const blob = new Blob([text], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setShowFileMenu(false);
        Swal.fire({
            icon: 'success',
            title: t('chat.saveComputer'),
            text: 'File saved successfully',
            timer: 1500,
            showConfirmButton: false
        });
    };

    const handleExportDocs = () => {
        setShowFileMenu(false);
        Swal.fire({
            title: t('chat.exporting'),
            didOpen: () => {
                Swal.showLoading();
            },
        });

        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: t('chat.exportSuccess'),
                timer: 1500,
                showConfirmButton: false
            });
        }, 2000);
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#f9fbfd] dark:bg-gray-900 flex">
            {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

            {/* Sidebar Navigation */}
            <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col pt-16 fixed left-0 top-0 bottom-0 z-20">
                <div className="p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('grammar')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'grammar' ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                        <Check size={20} />
                        {t('chat.check')}
                    </button>
                    <button
                        onClick={() => setActiveTab('humanizer')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'humanizer' ? 'bg-purple-50 text-purple-600 dark:bg-gray-700 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                        <User size={20} />
                        {t('chat.humanizer')}
                    </button>
                    <button
                        onClick={() => setActiveTab('paraphraser')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'paraphraser' ? 'bg-pink-50 text-pink-600 dark:bg-gray-700 dark:text-pink-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                        <Feather size={20} />
                        {t('chat.paraphraser')}
                    </button>
                </div>

                {/* Context Specific Sidebar Content */}
                <div className="px-4 mt-6 flex-grow">
                    {activeTab === 'humanizer' && (
                        <div className="space-y-4 animate-slide-in-right">
                            <h3 className="font-semibold text-gray-700 dark:text-gray-200 px-2">{t('chat.voices')}</h3>
                            <div className="space-y-2">
                                {['everyday', 'precisionist', 'executive', 'scholar'].map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => handleProcess(t(`chat.voiceList.${key}.name`))}
                                        className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
                                    >
                                        <span className="block font-medium text-gray-800 dark:text-white">{t(`chat.voiceList.${key}.name`)}</span>
                                        <span className="text-xs text-gray-500">{t(`chat.voiceList.${key}.desc`)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'paraphraser' && (
                        <div className="space-y-4 animate-slide-in-right">
                            <h3 className="font-semibold text-gray-700 dark:text-gray-200 px-2">{t('chat.styles')}</h3>
                            <div className="space-y-2">
                                {['humanize', 'academic', 'professional', 'streamlined', 'creative'].map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => handleProcess(t(`chat.styleList.${key}`))}
                                        className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all"
                                    >
                                        <span className="block font-medium text-gray-800 dark:text-white">{t(`chat.styleList.${key}`)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setShowSettings(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                    >
                        <Settings size={18} />
                        {t('settings.title')}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col ml-64 min-h-screen">
                {/* Toolbar / Header */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-2 flex items-center justify-between sticky top-16 z-30 shadow-sm">

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                            <FileText className="text-blue-600" size={24} />
                            <h1 className="font-medium text-lg">{t('chat.title')}</h1>
                        </div>

                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowFileMenu(!showFileMenu)}
                                className="px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-1"
                            >
                                {t('chat.file')}
                            </button>

                            {showFileMenu && (
                                <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-50">
                                    <button
                                        onClick={handleSaveLocal}
                                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                                    >
                                        <Save size={16} />
                                        {t('chat.saveComputer')}
                                    </button>
                                    <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>
                                    <button
                                        onClick={handleExportDocs}
                                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                                    >
                                        <Share size={16} />
                                        {t('chat.saveDocs')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => handleProcess()}
                        disabled={!text.replace(/<[^>]+>/g, '').trim() || isProcessing}
                        className={`
                px-6 py-2 rounded-full font-semibold flex items-center gap-2 transition-all shadow-md
                ${!text.replace(/<[^>]+>/g, '').trim() || isProcessing
                                ? 'bg-blue-200 text-blue-50 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:translate-y-0.5'}
            `}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                {t('chat.processing')}
                            </>
                        ) : (
                            <>
                                {activeTab === 'grammar' && <Check size={18} />}
                                {activeTab === 'humanizer' && <User size={18} />}
                                {activeTab === 'paraphraser' && <Feather size={18} />}
                                {activeTab === 'grammar' ? t('chat.check') : activeTab === 'humanizer' ? 'Humanize' : 'Paraphrase'}
                            </>
                        )}
                    </button>
                </div>

                <div className="flex flex-grow overflow-hidden relative">
                    <div className="flex-grow overflow-y-auto py-8 px-8 flex justify-center bg-[#f9fbfd] dark:bg-gray-900">
                        <div className="w-full max-w-[816px] min-h-[1056px] bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-all flex flex-col">
                            <ReactQuill
                                theme="snow"
                                value={text}
                                onChange={setText}
                                modules={modules}
                                className="h-full flex-grow flex flex-col"
                                placeholder={t('chat.placeholder')}
                            />
                        </div>
                    </div>

                    {showResults && (
                        <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-xl overflow-y-auto absolute right-0 top-0 bottom-0 z-20 animate-slide-in-right">
                            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                                <h2 className="font-semibold text-gray-800 dark:text-gray-200">{t('chat.suggestions')}</h2>
                                <button onClick={() => setShowResults(false)} className="text-gray-400 hover:text-gray-600">×</button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl p-4">
                                    <p className="font-medium text-green-800 dark:text-green-300 mb-2 text-sm uppercase tracking-wide">{t('chat.corrected')}</p>
                                    <div className="text-gray-800 dark:text-gray-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: correctedText }}></div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                                    <p className="font-medium text-gray-500 dark:text-gray-400 mb-2 text-sm uppercase tracking-wide">{t('chat.original')}</p>
                                    <div className="text-gray-600 dark:text-gray-400 leading-relaxed line-through decoration-red-400 decoration-2" dangerouslySetInnerHTML={{ __html: text }}></div>
                                </div>

                                <button className="w-full py-2.5 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                                    <Download size={18} />
                                    Accept All Changes
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .quill {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
        .ql-toolbar {
            border: none !important;
            border-bottom: 1px solid #e5e7eb !important;
            padding: 12px 16px !important;
            background: #fafafa;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
        .dark .ql-toolbar {
            background: #1f2937;
            border-color: #374151 !important;
        }
        .dark .ql-toolbar .ql-stroke {
            stroke: #9ca3af;
        }
        .dark .ql-toolbar .ql-fill {
            fill: #9ca3af;
        }
        .dark .ql-toolbar .ql-picker {
            color: #9ca3af;
        }
        .ql-container {
            flex-grow: 1;
            font-family: 'Inter', sans-serif !important;
            font-size: 1.125rem !important;
            border: none !important;
        }
        .ql-editor {
            padding: 40px !important;
            min-height: 1000px;
        }
        .ql-editor.ql-blank::before {
            left: 40px !important;
            right: 40px !important;
            font-style: normal !important;
            color: #9ca3af !important;
        }
        .dark .ql-editor {
            color: #e5e7eb;
        }
      `}</style>
        </div>
    );
}
