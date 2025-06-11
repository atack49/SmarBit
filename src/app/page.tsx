import AboutUsSection from '@/components/sections/about-us-section';
import ContactSection from '@/components/sections/contact-section';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import HeroSection from '@/components/sections/hero-section'; // Added import for HeroSection
import MyFitGuideSection from '@/components/sections/my-fit-guide-section';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection /> {/* Replaced inline section with HeroSection component */}
        <AboutUsSection /> 
        <MyFitGuideSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
