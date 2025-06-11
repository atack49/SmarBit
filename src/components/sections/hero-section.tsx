
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlayCircle, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="w-full">
      <div className="container flex flex-col items-center justify-center text-center py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-4xl font-headline font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Domina tu Fitness con <span className="text-primary">MyFitGuide</span>
          </h1>
          <p className="text-lg text-foreground/80 md:text-xl">
            Aprende a usar todas las funcionalidades de MyFitGuide para alcanzar tus objetivos de fitness. Desde configuración inicial hasta funciones avanzadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#myfitguide"> 
                <PlayCircle className="mr-2 h-5 w-5" />
                Ver Tutorial
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/quick-start"> 
                Guía Rápida
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
