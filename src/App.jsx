import { useState } from 'react';
import { AboutUsSection } from './assets/components/AboutUsSection';
import ContactSection from './assets/components/ContactSection';
import { FooterSection } from './assets/components/FooterSection';
import { HeroSection } from './assets/components/HeroSection';
import { HowItWorksSection } from './assets/components/HowItWorksSection';
import { ProjectsSection } from './assets/components/ProjectsSection'
import { ServicesSection } from './assets/components/ServicesSection';
import { EducationSection } from './assets/components/EducationSection';
import { BackToTop } from './assets/components/BackToTop';
import { ProjectDetailPage } from './assets/components/ProjectDetailPage';
import { EducationDetailPage } from './assets/components/EducationDetailPage';

const App = () => {
  // État pour gérer l'affichage de la page de détails des projets
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  // État pour gérer l'affichage de la page de détails de l'éducation
  const [selectedEducationId, setSelectedEducationId] = useState(null);

  // Fonction pour retourner aux projets et scroller à la section
  const handleBackToProjects = () => {
    setSelectedProjectId(null);
    // Scroller à la section des projets après que le rendu soit fait
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  // Fonction pour retourner à l'éducation et scroller à la section
  const handleBackToEducation = () => {
    setSelectedEducationId(null);
    // Scroller à la section de l'éducation après que le rendu soit fait
    setTimeout(() => {
      const educationSection = document.getElementById('education');
      if (educationSection) {
        educationSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  // Si un projet est sélectionné, afficher la page de détails
  if (selectedProjectId !== null) {
    return (
      <div className="min-h-screen bg-gray-900 font-sans">
        <ProjectDetailPage 
          projectId={selectedProjectId} 
          onBack={handleBackToProjects}
        />
      </div>
    );
  }

  // Si une éducation est sélectionnée, afficher la page de détails
  if (selectedEducationId !== null) {
    return (
      <div className="min-h-screen bg-gray-900 font-sans">
        <EducationDetailPage 
          educationId={selectedEducationId} 
          onBack={handleBackToEducation}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <HeroSection />
      <AboutUsSection />
      <HowItWorksSection />
      <ServicesSection />
      <ProjectsSection onProjectSelect={setSelectedProjectId} />
      <EducationSection onEducationSelect={setSelectedEducationId} />
      <ContactSection />
      <FooterSection />
      <BackToTop />
    </div>
  );
};

export default App;
