import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { projects } from '../../data/portfolioData';
import { useTranslation } from '../../hooks/useTranslation';

export const ProjectDetailPage = ({ projectId, onBack }) => {
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(null);
    
    // Scroller vers le haut quand la page de détails s'ouvre
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [projectId]);
    
    // Trouver le projet sélectionné
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl text-white font-bold mb-4">Projet non trouvé</h2>
                    <button
                        onClick={onBack}
                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                    >
                        Retour aux projets
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section id="project-detail" className="min-h-screen bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Bouton de retour */}
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition mb-8 font-semibold"
                >
                    <ArrowLeft size={20} />
                    Retour aux projets
                </button>

                {/* Carrousel d'images */}
                <div className="mb-10 relative w-full" style={{ display: 'block' }}>
                    <div className="w-full rounded-2xl overflow-hidden bg-gray-800 shadow-2xl" style={{ height: '400px', display: 'block' }}>
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={0}
                            navigation={{
                                nextEl: '.swiper-button-next-project',
                                prevEl: '.swiper-button-prev-project',
                            }}
                            pagination={{
                                clickable: true,
                                bulletClass: 'swiper-pagination-bullet bg-white w-2 h-2 rounded-full mx-1 opacity-50 transition-opacity duration-300',
                                bulletActiveClass: 'swiper-pagination-bullet-active !bg-blue-500 !opacity-100',
                            }}
                            style={{ width: '100%', height: '100%', display: 'block' }}
                        >
                            {/* Vidéo si elle existe */}
                            {project.video && (
                                <SwiperSlide style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                    <video
                                        src={project.video}
                                        controls
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </SwiperSlide>
                            )}

                            {/* Image principale */}
                            <SwiperSlide style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'pointer' }}
                                    onClick={() => setSelectedImage(project.image)}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://placehold.co/800x400/1E3A8A/ffffff?text=Project+Image";
                                    }}
                                />
                            </SwiperSlide>

                            {/* Images supplémentaires si elles existent */}
                            {project.images && project.images.map((image, idx) => (
                                <SwiperSlide key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                    <img
                                        src={image}
                                        alt={`${project.title} - Image ${idx + 2}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'pointer' }}
                                        onClick={() => setSelectedImage(image)}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://placehold.co/800x400/1E3A8A/ffffff?text=Project+Image";
                                        }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Boutons de navigation personnalisés */}
                    <button className="swiper-button-prev-project absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 flex items-center justify-center" style={{ cursor: 'pointer' }}>
                        <ChevronLeft size={24} />
                    </button>
                    <button className="swiper-button-next-project absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 flex items-center justify-center" style={{ cursor: 'pointer' }}>
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Titre et information générale */}
                <div className="mb-10">
                    <h1 className="text-5xl font-extrabold text-white mb-3">{project.title}</h1>
                    <p className="text-gray-400 text-lg mb-6">{project.date}</p>
                    
                    {/* Liens GitHub et démo en direct */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition shadow-lg"
                            >
                                <Github size={20} />
                                GitHub Repository
                            </a>
                        )}
                        {project.webapp && (
                            <a
                                href={project.webapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition shadow-lg"
                            >
                                <ExternalLink size={20} />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>

                {/* Description complète */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-blue-400 mb-4">Description</h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        {project.description}
                    </p>
                    {project.fullDescription && (
                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-gray-300 whitespace-pre-wrap leading-relaxed text-base">
                            {project.fullDescription}
                        </div>
                    )}
                </div>

                {/* Technologies utilisées */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-blue-400 mb-4">Technologies</h2>
                    <div className="flex flex-wrap gap-3">
                        {project.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-4 py-2 bg-blue-900/50 border border-blue-500 text-blue-300 rounded-lg font-medium hover:bg-blue-900 transition"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Catégorie */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-blue-400 mb-4">Catégorie</h2>
                    <div className="inline-block px-4 py-2 bg-gray-800 rounded-lg text-white capitalize">
                        {project.category}
                    </div>
                </div>

                {/* Bouton de retour en bas */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                    <button
                        onClick={onBack}
                        className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition shadow-lg hover:shadow-blue-500/50"
                    >
                        Retour aux projets
                    </button>
                </div>
            </div>

            {/* Modal pour l'image en taille originale */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div 
                        className="relative max-w-6xl max-h-[90vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage}
                            alt="Enlarged project image"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onError={(e) => {
                                e.target.src = "https://placehold.co/800x600/1E3A8A/ffffff?text=Image+Error";
                            }}
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300 flex items-center justify-center"
                        >
                            <X size={28} />
                        </button>
                    </div>
                </div>
            )}        </section>
    );
};