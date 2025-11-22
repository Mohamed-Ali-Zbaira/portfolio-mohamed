// src/assets/components/ProjectsSection.jsx (Version finale avec modal)

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Pagination, Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react'; 

import { projects } from '../../data/portfolioData';
import { useTranslation } from '../../hooks/useTranslation';
// Import du nouveau composant Modal
import ProjectDetailModal from './ProjectDetailModal'; 


// --- Composant ProjectCard ---
// Maintenant, il prend une fonction pour gérer le clic
const ProjectCard = ({ project, t, onCardClick }) => { 
    return (
        // Ajout d'un onClick qui appelle la fonction passée par le parent
        <div 
            onClick={() => onCardClick(project)} 
            className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden 
                    transition duration-500 hover:shadow-blue-500/20 cursor-pointer h-full group"> 
            
            {/* ... (Le contenu de la carte reste le même) ... */}

            <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover transition duration-300 group-hover:opacity-90"
                onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = "https://placehold.co/600x400/1E3A8A/ffffff?text=Project+Image"; 
                }}
            />
            <div className="p-6 text-white flex flex-col h-full">
                <h3 className="text-2xl font-extrabold mb-2 text-blue-400">{project.title}</h3>
                <p className="text-gray-500 text-xs font-medium mb-3">{project.date}</p>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>
                
                {/* Retrait des liens d'action pour les concentrer dans le modal, 
                    rendant la carte plus propre et forçant le clic pour les détails. */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-700 text-xs text-blue-300 rounded-full font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
                
                {/* Ajout d'un indicateur de clic moderne (optionnel) */}
                <div className="mt-auto pt-4 border-t border-gray-700 text-blue-400 font-semibold text-sm hover:text-blue-300 transition">
                    Voir les détails →
                </div>
            </div>
        </div>
    );
};


// --- Composant ProjectsSection ---
export const ProjectsSection = () => {
    const { t } = useTranslation();
    
    // --- État du Modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    // Fonction appelée au clic sur une carte
    const handleCardClick = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Retarder l'effacement du projet pour que l'animation de fermeture soit visible
        setTimeout(() => setSelectedProject(null), 300); 
    };

    const customNavClasses = "bg-gray-800/80 p-3 rounded-full shadow-lg text-white hover:bg-gray-700 transition duration-300 absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer hidden md:block";

    return (
        <section id="projects" className="bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen-xl mx-auto">
                {/* En-tête de section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                        <span className="text-blue-400 mr-2">/</span> {t.projects.title}
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        {t.projects.subtitle}
                    </p>
                </div>

                <div className="relative">
                    {/* Flèche Précédente */}
                    <div className={`swiper-button-prev-custom left-0 -ml-12 ${customNavClasses}`}> 
                        <ArrowLeft size={20} />
                    </div>

                    <Swiper
                        modules={[Pagination, Navigation]}
                        spaceBetween={30}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        loop={true}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        pagination={{ 
                            clickable: true,
                            bulletClass: 'swiper-pagination-bullet bg-gray-600 w-2 h-2 rounded-full mx-1 opacity-50 transition-opacity duration-300',
                            bulletActiveClass: 'swiper-pagination-bullet-active !bg-blue-500 !opacity-100',
                        }}
                        className="mySwiper !pb-8"
                    >
                        {projects.map((project) => (
                            <SwiperSlide key={project.id} className="h-auto">
                                {/* Passage de la fonction de clic à la carte */}
                                <ProjectCard project={project} t={t} onCardClick={handleCardClick} /> 
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    
                    {/* Flèche Suivante */}
                    <div className={`swiper-button-next-custom right-0 -mr-12 ${customNavClasses}`}>
                        <ArrowRight size={20} />
                    </div>
                </div>
            </div>

            {/* --- Intégration du Modal --- */}
            <ProjectDetailModal 
                project={selectedProject} 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                t={t}
            />
        </section>
    );
};