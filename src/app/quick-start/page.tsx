
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import QuickStartGuideSection from '@/components/sections/quick-start-guide-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guía de Inicio Rápido - MyFitGuide',
  description: 'Sigue estos pasos para comenzar a usar MyFitGuide y alcanzar tus objetivos de fitness.',
};

export default function QuickStartPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <QuickStartGuideSection />
      </main>
      <Footer />
    </div>
  );
}
