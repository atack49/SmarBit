import { BenefitsSection } from "./sections/BenefitsSection";
import { CtaSection } from "./sections/CtaSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { HeroSection } from "./sections/HeroSection";
import { LegalSection } from "./sections/LegalSection";
import { PrinciplesSection } from "./sections/PrinciplesSection";

export default function MyFitGuidePage() {
  return (
    <>
      <main>
        <HeroSection />
        <BenefitsSection />
        <PrinciplesSection />
        <FeaturesSection />
        <LegalSection />
        <CtaSection />
      </main>
    </>
  );
}