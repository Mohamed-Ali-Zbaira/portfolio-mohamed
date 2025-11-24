
import React, { useState } from 'react';
// Import des composants Swiper et SwiperSlide pour la gestion du carrousel
import { Swiper, SwiperSlide } from 'swiper/react'; 
// Import des modules Swiper nécessaires (Pagination et Navigation pour les flèches)
import { Pagination, Navigation } from 'swiper/modules';
// Import des icônes Lucide-React pour la navigation et les liens
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react'; 

// Import des données des projets (simulant une source de données externe)
import { projects } from '../../data/portfolioData';
// Import du hook de traduction personnalisé
import { useTranslation } from '../../hooks/useTranslation';
// Import du composant Modal dédié aux détails d'un projet
import ProjectDetailModal from './ProjectDetailModal'; 


// ---------------------------------------------------------------------
// --- Composant ProjectCard : Affiche une carte de projet individuelle ---
// ---------------------------------------------------------------------
/**
 * @param {object} project - Les données du projet à afficher.
 * @param {object} t - Les fonctions de traduction (traduction locale non utilisée ici, mais conservée pour la cohérence).
 * @param {function} onCardClick - Fonction de rappel pour gérer l'ouverture du modal.
 */
const ProjectCard = ({ project, t, onCardClick }) => { 
    return (
        // Le conteneur utilise 'flex' et 'flex-col' ainsi que 'h-full' pour garantir 
        // que toutes les cartes ont la même hauteur, même si le contenu varie.
        <div 
            onClick={() => onCardClick(project)} 
            className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden 
                       transition duration-500 hover:shadow-blue-500/20 cursor-pointer h-full group
                       flex flex-col"> 
            
            {/* Image du projet */}
            <img
                src={project.image}
                alt={project.title}
                // 'h-56 object-cover' garantit une hauteur fixe pour l'image.
                className="w-full h-56 object-cover transition duration-300 group-hover:opacity-90"
                // Gestion d'erreur de chargement d'image (fallback)
                onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = "https://placehold.co/600x400/1E3A8A/ffffff?text=Project+Image"; 
                }}
            />

            {/* Contenu textuel de la carte */}
            {/* 'flex-grow' et 'h-full' forcent cette section à occuper tout l'espace vertical restant. */}
            <div className="p-6 text-white flex flex-col h-full flex-grow">
                <h3 className="text-2xl font-extrabold mb-2 text-blue-400">{project.title}</h3>
                <p className="text-gray-500 text-xs font-medium mb-3">{project.date}</p>
                
                {/* Description : 'line-clamp-3' limite le texte à 3 lignes pour uniformiser la hauteur. 
                    'flex-grow' est ajouté pour forcer la carte à prendre la hauteur maximale autorisée. */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>
                
                {/* Liste des technologies/tags */}
                <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
                    {project.tags.slice(0, 20).map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-700 text-xs text-blue-300 rounded-full font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
                
                {/* Indicateur de clic : 'mt-auto' pousse cet élément vers le bas, 
                   indépendamment de la hauteur de la description ou des tags. */}
                <div className="mt-auto pt-4 border-t border-gray-700 text-blue-400 font-semibold text-sm hover:text-blue-300 transition flex-shrink-0">
                    Voir les détails →
                </div>
            </div>
        </div>
    );
};


// ---------------------------------------------------------------------
// --- Composant ProjectsSection : Section principale du portfolio ---
// ---------------------------------------------------------------------
export const ProjectsSection = () => {
    const { t } = useTranslation();
    
    // --- États pour la gestion du Modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Stocke les données du projet sélectionné pour les afficher dans le modal
    const [selectedProject, setSelectedProject] = useState(null);

    // Gère le clic sur une carte : définit le projet et ouvre le modal
    const handleCardClick = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    // Ferme le modal et réinitialise l'état du projet sélectionné
    const closeModal = () => {
        setIsModalOpen(false);
        // Retarde l'effacement des données du projet (300ms) pour permettre 
        // l'animation de fermeture du modal avant de le vider.
        setTimeout(() => setSelectedProject(null), 300); 
    };

    // Classes Tailwind réutilisables pour les boutons de navigation Swiper personnalisés
    const customNavClasses = "bg-gray-800/80 p-3 rounded-full shadow-lg text-white hover:bg-gray-700 transition duration-300 absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer hidden md:block";

    return (
        <section id="projects" className="bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen-xl mx-auto">
                {/* En-tête de section centré */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                        <span className="text-blue-400 mr-2">/</span> {t.projects.title}
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        {t.projects.subtitle}
                    </p>
                </div>

                {/* Conteneur du carrousel (Swiper) */}
                <div className="relative">
                    
                    {/* Flèche Précédente personnalisée pour Swiper */}
                    <div className={`swiper-button-prev-custom left-0 -ml-12 ${customNavClasses}`}> 
                        <ArrowLeft size={20} />
                    </div>

                    {/* Implémentation du carrousel Swiper */}
                    <Swiper
                        modules={[Pagination, Navigation]}
                        spaceBetween={30}
                        // Configuration responsive pour le nombre de cartes affichées
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        loop={true} // Active le mode carrousel infini
                        // Connexion des boutons de navigation personnalisés
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        // Configuration de la pagination (points en bas)
                        pagination={{ 
                            clickable: true,
                            // Classes Tailwind pour personnaliser l'apparence des points
                            bulletClass: 'swiper-pagination-bullet bg-gray-600 w-2 h-2 rounded-full mx-1 opacity-50 transition-opacity duration-300',
                            bulletActiveClass: 'swiper-pagination-bullet-active !bg-blue-500 !opacity-100',
                        }}
                        className="mySwiper !pb-8" // Ajout de padding pour les points de pagination
                    >
                        {/* Itération sur la liste des projets pour créer les slides */}
                        {projects.map((project) => (
                            // 'h-auto' est important ici, car 'h-full' est géré par la carte elle-même
                            <SwiperSlide key={project.id} className="h-auto"> 
                                {/* Passe la fonction de clic qui déclenche le modal */}
                                <ProjectCard project={project} t={t} onCardClick={handleCardClick} /> 
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    
                    {/* Flèche Suivante personnalisée pour Swiper */}
                    <div className={`swiper-button-next-custom right-0 -mr-12 ${customNavClasses}`}>
                        <ArrowRight size={20} />
                    </div>
                </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* --- Intégration du Modal (toujours rendu, visible via 'isOpen') --- */}
            {/* ------------------------------------------------------------- */}
            <ProjectDetailModal 
                project={selectedProject} // Les données affichées dans le modal
                isOpen={isModalOpen}     // État d'ouverture/fermeture du modal
                onClose={closeModal}     // Fonction pour fermer le modal
                t={t}
            />
        </section>
    );
};