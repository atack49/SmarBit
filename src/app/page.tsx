import ContactSection from '@/components/sections/contact-section';
import HeroSection from '@/components/sections/hero-section';
import ProjectsSection from '@/components/sections/projects-section';
import TeamSection from '@/components/sections/team-section';
import ValuesSection from '@/components/sections/values-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuesSection />
      <ProjectsSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}
