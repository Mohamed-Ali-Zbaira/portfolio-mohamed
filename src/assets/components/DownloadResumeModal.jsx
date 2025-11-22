import React, { useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

const DownloadResumeModal = ({ isOpen, onClose, englishPath, frenchPath }) => {
    const { t } = useTranslation();

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const downloadAndClose = (href, filename) => {
        const a = document.createElement('a');
        a.href = href;
        a.download = filename || '';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        a.remove();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

            <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-gray-900/95 border border-gray-700 rounded-2xl p-6 sm:p-8 shadow-2xl transition-all duration-300 ease-in-out transform scale-100 opacity-100">
                <h3 className="text-xl font-extrabold text-white mb-3 tracking-wide">{t?.hero?.chooseResume ?? 'Choose CV / Choisissez le CV'}</h3>
                <p className="text-base text-gray-400 mb-6">{t?.hero?.chooseResumeSubtitle ?? 'Select the language you want to download.'}</p>

                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Bouton Anglais - Principal */}
                    <button
                        onClick={() => downloadAndClose(englishPath, 'CV-Mohamed-Ali-Zbaira-ANG.pdf')}
                        className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                    >
                        English <span className="text-sm opacity-75 ml-1">(PDF)</span>
                    </button>

                    {/* Bouton Français - Secondaire */}
                    <button
                        onClick={() => downloadAndClose(frenchPath, 'CV-Mohamed-Ali-Zbaira-Fr.pdf')}
                        className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-xl font-medium transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-gray-500/50"
                    >
                        Français <span className="text-sm opacity-75 ml-1">(PDF)</span>
                    </button>
                </div>

                <div className="mt-6 text-right">
                    {/* Bouton Fermer - Texte discret */}
                    <button 
                        onClick={onClose} 
                        className="text-sm text-gray-500 hover:text-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md p-1"
                    >
                        {t?.common?.close ?? 'Close'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DownloadResumeModal;