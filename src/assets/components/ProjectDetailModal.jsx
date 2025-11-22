// src/assets/components/ProjectDetailModal.jsx

import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Code, Calendar, LayoutGrid, Image } from 'lucide-react';

// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ----------------------------------------------------------------------
// COMPOSANT HELPER : DetailItem
// Rend un élément de métadonnée (Date, Stack, etc.)
// ----------------------------------------------------------------------
const DetailItem = ({ icon: Icon, label, value }) => (
    // Taille du texte légèrement augmentée : text-sm -> text-base
    <p className="flex items-start gap-3 text-base"> 
        <Icon size={20} className="text-blue-400 min-w-[20px] mt-1" />
        <strong className="text-white min-w-max">{label}:</strong>
        <span className="text-gray-400">{value}</span>
    </p>
);

// ----------------------------------------------------------------------
// COMPOSANT PRINCIPAL : ProjectDetailModal
// ----------------------------------------------------------------------
const ProjectDetailModal = ({ project, isOpen, onClose, t }) => {
    // Logique pour fermer avec la touche 'Escape' et contrôler le scroll du body (inchangée)
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', onKey);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', onKey);
        };
    }, [isOpen, onClose]);

    if (!project) return null;

    // Transition moderne utilisant des classes conditionnelles
    const modalClasses = isOpen 
        ? "opacity-100 scale-100 translate-y-0" 
        : "opacity-0 scale-95 translate-y-4 pointer-events-none";

    const images = [project.image, ...(project.screenshots || [])].filter(Boolean);

    return (
        // Overlay de fond (fixed, plein écran, sombre)
        <div 
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
        >
            {/* Arrière-plan flou et sombre */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

            {/* Conteneur du Modal (Max Width augmenté : max-w-4xl -> max-w-6xl) */}
            <div className={`relative z-10 w-full max-w-6xl max-h-[95vh] mx-auto bg-gray-900/95 border border-gray-700/70 rounded-3xl p-8 sm:p-10 shadow-2xl overflow-y-auto 
            transform transition-all duration-500 ease-in-out will-change-transform
            ${modalClasses}`
            }>
                
                {/* Bouton de Fermeture */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-300 hover:text-white transition duration-200 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/90 shadow-lg z-20"
                    aria-label={t?.modal?.close ?? "Fermer"}
                >
                    <X size={28} /> {/* Icône plus grande */}
                </button>

                {/* Contenu principal du Modal */}
                <div className="flex flex-col md:flex-row gap-10">
                    
                    {/* Colonne Gauche : Image/Slider et Liens */}
                    <div className="md:w-5/12">
                        {/* Titre plus grand : text-3xl -> text-4xl */}
                        <h2 id="modal-title" className="text-4xl font-extrabold text-white mb-1 leading-tight">{project.title}</h2>
                        <p className="text-base font-medium uppercase tracking-widest text-blue-400 mb-8">{project.category}</p>

                        {/* Carousel d'Images (Swiper) */}
                        <div className="mb-8 rounded-xl overflow-hidden shadow-xl shadow-gray-900/50 border border-gray-700/80">
                            {images.length > 0 ? (
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    navigation
                                    pagination={{ clickable: true }}
                                    className="project-swiper"
                                >
                                    {images.map((imgSrc, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={imgSrc}
                                                alt={`${project.title} - Screenshot ${index + 1}`}
                                                className="w-full aspect-video object-cover" 
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://placehold.co/800x450/1E3A8A/ffffff?text=Image+Non+Disponible";
                                                }}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                // Fallback si aucune image n'est disponible
                                <div className="w-full aspect-video flex flex-col items-center justify-center bg-gray-800 text-gray-500 p-4">
                                    <Image size={40} /> {/* Icône plus grande */}
                                    <p className="text-base mt-3">{t?.modal?.noImage ?? "Aucune image de démonstration"}</p>
                                </div>
                            )}
                        </div>

                        {/* Liens d'Action */}
                        <div className="flex flex-wrap gap-5 pt-6 border-t border-gray-800">
                            {project.webapp && (
                                <a
                                    href={project.webapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition text-base shadow-md hover:shadow-lg hover:shadow-blue-600/30"
                                >
                                    <ExternalLink size={20} /> {/* Icône plus grande */}
                                    {t?.modal?.liveDemo ?? 'Démo Live'}
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition text-base shadow-md hover:shadow-lg"
                                >
                                    <Github size={20} /> {/* Icône plus grande */}
                                    {t?.modal?.sourceCode ?? 'Code Source'}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Colonne Droite : Description Complète et Tags */}
                    <div className="md:w-7/12 text-gray-300">
                        {/* Sous-titre plus grand : text-xl -> text-2xl */}
                        <h3 className="text-2xl font-bold text-white mb-5 border-b border-gray-700/80 pb-3 flex items-center gap-2">
                            <LayoutGrid size={24} className="text-blue-400" /> {/* Icône plus grande */}
                            {t?.modal?.detailsTitle ?? 'Détails du Projet'}
                        </h3>
                        
                        {/* Métadonnées (utilisent DetailItem qui est déjà mis à jour) */}
                        <div className="space-y-4 mb-8">
                            <DetailItem 
                                icon={Calendar} 
                                label={t?.modal?.date ?? 'Date'} 
                                value={project.date} 
                            />
                        </div>
                        
                        {/* Description longue */}
                        <h4 className="text-xl font-bold text-white mb-3">{t?.modal?.descriptionTitle ?? 'Description Complète'}</h4>
                        {/* Corps de texte plus grand : text-base -> text-lg */}
                        <p className="text-lg leading-relaxed mb-8 text-gray-400 whitespace-pre-wrap">
                            {project.longDescription || project.description} 
                        </p>

                        {/* Section Tags/Technologies */}
                        <h4 className="text-xl font-bold text-white mb-4 mt-6 border-t border-gray-800 pt-6">{t?.modal?.technologies ?? 'Technologies Clés'}</h4>
                        <div className="flex flex-wrap gap-4">
                            {project.tags.map((tag, idx) => (
                                <span key={idx} className="px-5 py-2 bg-blue-900/30 border border-blue-700/50 text-base font-medium text-blue-300 rounded-full transition hover:bg-blue-800/50">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectDetailModal;