import React from "react";
import { skills } from "../../data/portfolioData";
import { useTranslation } from "../../hooks/useTranslation";

const SkillCard = ({ skill }) => {
  return (
    <div className="border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-lg transition duration-300 flex items-center gap-4">
      <img 
        src={skill.image} 
        alt={skill.name}
        className="w-12 h-12 object-contain"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/48x48/cccccc/666666?text=?";
        }}
      />
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
      </div>
    </div>
  );
};

export const ServicesSection = () => {
  const { t } = useTranslation();
  return (
    <section id="skills" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">

        {/* En-tête de section */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold flex items-center text-gray-900 mb-4">
            <span className="text-blue-400 text-4xl mr-3">/</span> {t.skills.title}
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Skills by category */}
        <div className="space-y-12">
          {skills.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard key={skillIndex} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
