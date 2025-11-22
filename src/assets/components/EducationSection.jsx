import React from 'react';
import { education } from '../../data/portfolioData';
import { useTranslation } from '../../hooks/useTranslation';

const EducationCard = ({ edu }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
    <div className="flex items-start gap-4">
      <img
        src={edu.img}
        alt={edu.school}
        className="w-16 h-16 object-contain rounded-lg bg-gray-100 p-2"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/64x64/cccccc/666666?text=School";
        }}
      />
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{edu.school}</h3>
        <p className="text-blue-400 font-semibold mb-2">{edu.degree}</p>
        <p className="text-gray-600 text-sm mb-3">{edu.date}</p>
        <p className="text-gray-700 text-sm">{edu.desc}</p>
      </div>
    </div>
  </div>
);

export const EducationSection = () => {
  const { t } = useTranslation();
  return (
    <section id="education" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold flex items-center text-gray-900 mb-4">
            <span className="text-blue-400 text-5xl mr-3">/</span> {t.education.title}
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            {t.education.subtitle}
          </p>
        </div>
      <div className="space-y-6">
        {education.map((edu) => (
          <EducationCard key={edu.id} edu={edu} />
        ))}
      </div>
    </div>
  </section>
  );
};

