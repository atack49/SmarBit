import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="hero" className="bg-gradient-to-b from-primary/10 to-background">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-16 md:py-24">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl font-headline font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Revolutionizing Wellness with <span className="text-primary">SmartBit</span>
          </h1>
          <p className="text-lg text-foreground/80">
            Discover MyFitGuide, your AI-powered companion for personalized diet and exercise plans, tailored to your unique needs and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#myfitguide">Explore MyFitGuide</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://placehold.co/600x400.png"
            alt="AI Health Technology"
            width={600}
            height={400}
            className="rounded-xl shadow-2xl"
            data-ai-hint="health technology"
            priority
          />
        </div>
      </div>
    </section>
  );
}
