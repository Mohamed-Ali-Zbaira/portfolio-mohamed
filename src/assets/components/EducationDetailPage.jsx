import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { education } from '../../data/portfolioData';
import { useTranslation } from '../../hooks/useTranslation';

export const EducationDetailPage = ({ educationId, onBack }) => {
    const { t } = useTranslation();
    
    // Trouver l'éducation sélectionnée
    const edu = education.find(e => e.id === educationId);
    
    if (!edu) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl text-gray-900 font-bold mb-4">Formation non trouvée</h2>
                    <button
                        onClick={onBack}
                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                    >
                        Retour aux formations
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section id="education-detail" className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Bouton de retour */}
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition mb-8 font-semibold"
                >
                    <ArrowLeft size={20} />
                    Retour aux formations
                </button>

                {/* Image de l'école */}
                <div className="mb-10 flex justify-center">
                    <img
                        src={edu.image}
                        alt={edu.school}
                        className="max-w-full h-auto rounded-2xl shadow-2xl"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/800x400/1E3A8A/ffffff?text=Education";
                        }}
                    />
                </div>

                {/* Informations principales */}
                <div className="mb-10">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-3">{edu.degree}</h1>
                    <p className="text-gray-600 text-xl mb-2">{edu.school}</p>
                    <p className="text-blue-500 text-lg font-semibold mb-6">{edu.date}</p>
                </div>

                {/* Badge de statut */}
                {edu.status && (
                    <div className="mb-6 flex items-center gap-2">
                        <span className={`px-4 py-2 rounded-full font-bold text-white text-sm ${
                            edu.status === 'IN PROGRESS' 
                                ? 'bg-blue-500' 
                                : 'bg-green-500'
                        }`}>
                            {edu.status}
                        </span>
                    </div>
                )}

                {/* Description */}
                <div className="mb-10 bg-gray-50 border border-gray-200 rounded-xl p-8">
                    <h2 className="text-3xl font-bold text-blue-500 mb-4">À propos</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {edu.desc}
                    </p>
                </div>

                {/* Sections par année (pour Bachelor) */}
                {edu.sections && edu.sections.length > 0 && (
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-blue-500 mb-6">Contenu du Programme</h2>
                        <div className="space-y-6">
                            {edu.sections.map((section, idx) => (
                                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
                                    <ul className="space-y-2">
                                        {section.details && section.details.map((detail, detailIdx) => (
                                            <li key={detailIdx} className="flex items-start gap-3">
                                                <span className="text-blue-500 font-bold mt-1">•</span>
                                                <span className="text-gray-700 text-lg">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Détails directs (pour Master) */}
                {!edu.sections && edu.details && edu.details.length > 0 && (
                    <div className="mb-10 bg-gray-50 border border-gray-200 rounded-xl p-8">
                        <h2 className="text-3xl font-bold text-blue-500 mb-6">Contenu du Programme</h2>
                        <ul className="space-y-3">
                            {edu.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span className="text-blue-500 font-bold">•</span>
                                    <span className="text-gray-700 text-lg">{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Compétences */}
                {edu.skills && edu.skills.length > 0 && (
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-blue-500 mb-6">Compétences Acquises</h2>
                        <div className="flex flex-wrap gap-3">
                            {edu.skills.map((skill, idx) => (
                                <span 
                                    key={idx}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-600 transition"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Détails supplémentaires */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 mt-12">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                        <h3 className="text-2xl font-bold text-blue-500 mb-3">Établissement</h3>
                        <p className="text-gray-700 text-lg">{edu.school}</p>
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                        <h3 className="text-2xl font-bold text-blue-500 mb-3">Période</h3>
                        <p className="text-gray-700 text-lg">{edu.date}</p>
                    </div>

                    {edu.Niveau && (
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                            <h3 className="text-2xl font-bold text-blue-500 mb-3">Niveau</h3>
                            <p className="text-gray-700 text-lg">{edu.Niveau}</p>
                        </div>
                    )}

                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                        <h3 className="text-2xl font-bold text-blue-500 mb-3">Diplôme</h3>
                        <p className="text-gray-700 text-lg">{edu.degree}</p>
                    </div>
                </div>

                {/* Bouton de retour en bas */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <button
                        onClick={onBack}
                        className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition shadow-lg hover:shadow-blue-500/50"
                    >
                        Retour aux formations
                    </button>
                </div>
            </div>
        </section>
    );
};
