
import AboutUsSection from '@/components/sections/about-us-section';
import ContactSection from '@/components/sections/contact-section';
import CoreFeaturesSection from '@/components/sections/core-features-section'; // Added import
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import HeroSection from '@/components/sections/hero-section';
import MyFitGuideSection from '@/components/sections/my-fit-guide-section';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutUsSection /> 
        <MyFitGuideSection />
        <CoreFeaturesSection /> {/* Added new section */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
