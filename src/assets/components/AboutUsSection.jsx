import React from "react";
import { Bio, projects, experiences } from "../../data/portfolioData";
import { useTranslation } from "../../hooks/useTranslation";

export const AboutUsSection = () => {
  const { t } = useTranslation();
  const stats = [
    { value: `${10}+`, label: t.about.stats.projects },
    { value: `${2}+`, label: t.about.stats.experience },
    { value: '100%', label: t.about.stats.satisfaction },
  ];

  return (
    <section id="about" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        
        {/* En-tête de section */}
        <div className="text-gray-900 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold flex items-center">
            <span className="text-blue-400 text-4xl mr-3">/</span> {t.about.title}
          </h2>
        </div>

        {/* Contenu principal : deux colonnes */}
        <div className="lg:flex lg:gap-16 items-start mb-16">
          
          {/* Colonne gauche : texte */}
          <div className="lg:w-1/2 space-y-8 text-gray-700 leading-relaxed text-lg">
            <p>
              {t.about.description}
            </p>
          </div>

          {/* Colonne droite : image */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center lg:justify-end relative">
            <div className="bg-white p-1 rounded-lg shadow-lg w-80 h-80 sm:w-96 sm:h-96 lg:w-[400px] lg:h-[400px] overflow-hidden relative lg:-translate-y-5">
              <img 
                src="/images/profile.jpg" 
                alt={Bio.name} 
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/400x400/000000/ffffff?text=Profile+Image"; 
                }}
              />
              {/* Petit diamant en bas à droite */}
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-blue-400 rotate-45"></div>
            </div>
          </div>
        </div>
        
        {/* Statistiques */}
        <div className="mt-16 pt-12 border-t border-gray-200 grid grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.value}>
              <p className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 uppercase tracking-wider text-xs sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
