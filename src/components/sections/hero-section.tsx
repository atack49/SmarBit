import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlayCircle, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="w-full">
      <div className="container mx-auto flex flex-col items-center justify-center text-center py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-5xl font-headline font-bold tracking-tight text-primary sm:text-6xl md:text-7xl">
            SmartBit
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground/88 max-w-2xl mx-auto">
  Impulsando la innovación tecnológica en salud y bienestar
</h2>

<p className="mt-3 text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
  Combinamos inteligencia artificial, innovación y pasión por la tecnología 
  para crear productos que transforman la experiencia en salud y bienestar.
</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#about">
                <ArrowRight className="mr-2 h-5 w-5" />
                Conócenos
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="#contact">
                Contacto
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}