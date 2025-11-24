import React from 'react';
import { experiences } from '../../data/portfolioData';
import { useTranslation } from '../../hooks/useTranslation';

const ExperienceCard = ({ experience }) => {
    const points = experience.desc
        .split(/[.!?]\s*/)
        .filter(sentence => sentence.trim().length > 0);

    return (
        <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition duration-300 shadow-lg">
            <div className="flex items-start gap-4">
                <img
                    src={experience.img}
                    alt={experience.company}
                    className="w-16 h-16 object-contain rounded-lg bg-white p-2 flex-shrink-0"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/64x64/cccccc/666666?text=Logo";
                    }}
                />
                <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-1">{experience.role}</h4>
                    <p className="text-blue-400 font-medium mb-2">{experience.company}</p>
                    <p className="text-gray-400 text-sm mb-3">{experience.date}</p>
                    <h4 className="text-xl font-semibold text-white mb-1">Key Achievements :</h4>

                    <ul className="text-gray-300 text-sm mb-4 space-y-2 list-disc list-inside">
                        {points.map((point, index) => (
                            <li key={index} className="pl-1">
                                {point.trim()}.
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-700 mt-4">
                        <span className="text-sm font-semibold text-gray-400">Tools/Skills:</span>
                        {experience.skills.map((skill, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-700 text-xs text-gray-300 rounded-full font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TimelineItem = ({ experience, isLast }) => (
    <div className="relative pl-10 pb-10">
        <div className="absolute left-0 top-0 mt-3 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-900 z-10"></div>
        
        {!isLast && (
            <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-gray-700"></div>
        )}
        
        <div className="ml-2">
            <ExperienceCard experience={experience} />
        </div>
    </div>
);

export const HowItWorksSection = () => {
  const { t } = useTranslation();
  
  const sortedExperiences = experiences.sort((a, b) => b.id - a.id);

  return (
    <section id="experience" className="bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold flex items-center text-white mb-4">
            <span className="text-blue-400 text-5xl mr-3">/</span> {t.experience.title || "Work Experience"}
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-3xl">
            {t.experience.subtitle || "My professional journey, detailed in chronological order."}
          </p>
        </div>

        <div className="relative">
          {sortedExperiences.map((experience, index) => (
            <TimelineItem 
              key={experience.id} 
              experience={experience} 
              isLast={index === sortedExperiences.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
};