"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Brain } from 'lucide-react';

export function PrinciplesSection() {
  return (
    <section className="py-20 md:py-20">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="mb-8 text-center max-w-xl">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">La base de MyFitGuide</h2>
          <p className="mt-4 text-lg text-foreground/80">
            Nuestra aplicación combina la última tecnología con algoritmos inteligentes para ofrecerte la mejor experiencia.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <Zap className="w-6 h-6 text-primary" />
              <CardTitle className="text-lg">Innovación</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/70">Impulsando la tecnología sanitaria con IA para crear soluciones que antes eran imposibles.</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <Brain className="w-6 h-6 text-primary" />
              <CardTitle className="text-lg">Inteligencia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/70">Planes que aprenden y se adaptan a ti a través de algoritmos inteligentes y personalizados.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}