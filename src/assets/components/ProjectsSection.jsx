import React from 'react';
import { projects } from '../../data/portfolioData';
import { useTranslation } from '../../hooks/useTranslation';

const ProjectCard = ({ project, t }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-[1.02] cursor-pointer">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover"
        onError={(e) => { 
          e.target.onerror = null; 
          e.target.src = "https://placehold.co/600x400/1e293b/ffffff?text=Project+Image"; 
        }}
      />
      <div className="p-6 text-white">
        <h3 className="text-xl font-bold mb-2 text-blue-400">{project.title}</h3>
        <p className="text-gray-400 text-xs mb-2">{project.date}</p>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag, idx) => (
            <span key={idx} className="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700 flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 text-sm font-semibold"
            >
              {t.projects.github} →
            </a>
          )}
          {project.webapp && (
            <a
              href={project.webapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 text-sm font-semibold"
            >
              {t.projects.liveDemo} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection = () => {
  const { t } = useTranslation();
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

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};
