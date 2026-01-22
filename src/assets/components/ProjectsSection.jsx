
import React, { useState } from 'react';
// Import du hook de traduction personnalisé
import { useTranslation } from '../../hooks/useTranslation';

// Import des données des projets (simulant une source de données externe)
import { projects } from '../../data/portfolioData'; 


// ---------------------------------------------------------------------
// --- Composant ProjectCard : Affiche une carte de projet individuelle ---
// ---------------------------------------------------------------------
/**
 * @param {object} project - Les données du projet à afficher.
 * @param {object} t - Les fonctions de traduction (traduction locale non utilisée ici, mais conservée pour la cohérence).
 * @param {function} onCardClick - Fonction de rappel pour gérer le clic sur le projet.
 */
const ProjectCard = ({ project, t, onCardClick }) => { 
    return (
        // Le conteneur utilise 'flex' et 'flex-col' ainsi que 'h-full' pour garantir 
        // que toutes les cartes ont la même hauteur, même si le contenu varie.
        <div 
            onClick={() => onCardClick(project.id)} 
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
                    Read more →
                </div>
            </div>
        </div>
    );
};


// ---------------------------------------------------------------------
// --- Composant ProjectsSection : Section principale du portfolio ---
// ---------------------------------------------------------------------
export const ProjectsSection = ({ onProjectSelect }) => {
    const { t } = useTranslation();
    
    // État pour gérer l'affichage de tous les projets
    const [showAllProjects, setShowAllProjects] = useState(false);

    // Nombre de projets à afficher initialement
    const INITIAL_PROJECTS_COUNT = 3;
    // Projets à afficher (tous ou seulement les premiers)
    const displayedProjects = showAllProjects ? projects : projects.slice(0, INITIAL_PROJECTS_COUNT);

    // Gère le clic sur une carte : navigue vers la page de détails
    const handleCardClick = (projectId) => {
        if (onProjectSelect) {
            onProjectSelect(projectId);
        }
    };

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

                {/* Conteneur de la grille de projets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {/* Itération sur les projets à afficher */}
                    {displayedProjects.map((project) => (
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                            t={t} 
                            onCardClick={handleCardClick} 
                        />
                    ))}
                </div>

                {/* Bouton "View All" visible seulement si on n'affiche pas tous les projets */}
                {!showAllProjects && projects.length > INITIAL_PROJECTS_COUNT && (
                    <div className="flex justify-center mb-12">
                        <button
                            onClick={() => setShowAllProjects(true)}
                            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-300 shadow-lg hover:shadow-blue-500/50"
                        >
                            {t.projects.viewAll || "View All Projects"}
                        </button>
                    </div>
                )}

                {/* Bouton "Show Less" visible quand tous les projets sont affichés */}
                {showAllProjects && (
                    <div className="flex justify-center">
                        <button
                            onClick={() => setShowAllProjects(false)}
                            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition duration-300 shadow-lg"
                        >
                            {t.projects.showLess || "Show Less"}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};