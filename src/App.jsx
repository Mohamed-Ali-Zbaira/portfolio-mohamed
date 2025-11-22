import { AboutUsSection } from './assets/components/AboutUsSection';
import ContactSection from './assets/components/ContactSection';
import { FooterSection } from './assets/components/FooterSection';
import { HeroSection } from './assets/components/HeroSection';
import { HowItWorksSection } from './assets/components/HowItWorksSection';
import { ProjectsSection } from './assets/components/ProjectsSection'
import { ServicesSection } from './assets/components/ServicesSection';
import { EducationSection } from './assets/components/EducationSection';
import { BackToTop } from './assets/components/BackToTop';
const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 font-sans">


      <HeroSection />
      <AboutUsSection />
           <HowItWorksSection />

      <ServicesSection />
 <ProjectsSection />
      <EducationSection />
      <ContactSection />
      <FooterSection />

  <BackToTop />

    </div>
  );
};

export default App;
