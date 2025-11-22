import React from 'react';
import { experiences } from '../../data/portfolioData';
import { useTranslation } from '../../hooks/useTranslation';

const ExperienceCard = ({ experience }) => (
  <div className="bg-gray-800 rounded-xl p-6 mb-6 hover:bg-gray-750 transition duration-300">
    <div className="flex items-start gap-4">
      <img
        src={experience.img}
        alt={experience.company}
        className="w-16 h-16 object-contain rounded-lg bg-white p-2"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/64x64/cccccc/666666?text=Logo";
        }}
      />
      <div className="flex-1">
        <h4 className="text-xl font-semibold text-white mb-1">{experience.role}</h4>
        <p className="text-blue-400 font-medium mb-2">{experience.company}</p>
        <p className="text-gray-400 text-sm mb-3">{experience.date}</p>
        <p className="text-gray-300 text-sm mb-4">{experience.desc}</p>
        <div className="flex flex-wrap gap-2">
          {experience.skills.map((skill, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-700 text-xs text-gray-300 rounded">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const HowItWorksSection = () => {
  const { t } = useTranslation();
  return (
    <section id="experience" className="bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold flex items-center text-white mb-4">
            <span className="text-blue-400 text-5xl mr-3">/</span> {t.experience.title}
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-3xl">
            {t.experience.subtitle}
          </p>
        </div>
        <div className="space-y-4">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
};
