import Navbar from '../../components/feature/Navbar';
import HeroSection from '../../components/feature/HeroSection';
import StudiesSection from '../../components/feature/StudiesSection';
import SkillsSection from '../../components/feature/SkillsSection';
import CertificatesSection from '../../components/feature/CertificatesSection';
import ProjectsSection from '../../components/feature/ProjectsSection';
import ContactSection from '../../components/feature/ContactSection';
import Footer from '../../components/feature/Footer';
import { useThemeContext } from '../../hooks/useThemeContext';

export default function Home() {
  const { theme } = useThemeContext();
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-slate-50' : 'bg-dark-900'}`}>
      <Navbar />
      <HeroSection />
      <StudiesSection />
      <SkillsSection />
      <CertificatesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}