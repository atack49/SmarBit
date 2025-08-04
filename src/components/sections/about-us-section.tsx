
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Brain } from 'lucide-react';

export default function AboutUsSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">Domina tu Fitness con MyFitGuide</h2>
          <div className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto space-y-4">
            <p className="leading-relaxed">
              Aprende a usar todas las funcionalidades de MyFitGuide para alcanzar tus objetivos de fitness. Desde configuración inicial hasta funciones avanzadas.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-headline font-bold text-primary">MyFitGuide</h3>
              <p className="mt-2 text-lg text-foreground/80">
                Aplicación diseñada para generar dietas y rutinas personalizadas.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <Zap className="w-6 h-6 text-primary" />
                  <CardTitle className="text-lg font-headline">Innovación</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/70">Impulsando la tecnología sanitaria con IA.</p>
                </CardContent>
              </Card>
              <Card className="bg-accent/10 border-accent/20">
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <Brain className="w-6 h-6 text-accent" />
                  <CardTitle className="text-lg font-headline">Inteligencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/70">Planes personalizados a través de algoritmos inteligentes.</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            {/* Image is now below */}
          </div>
        </div>

        {/* Team Section (DR) */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-headline font-bold text-primary mb-8">Nuestro Equipo (DR)</h3>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-10">
          Un equipo de estudiantes de la Universidad Tecnológica del Valle de Toluca, apasionados por la tecnología y la innovación, dedicados a crear soluciones que marcan la diferencia.
          </p>
           <div className="flex justify-center mb-10">
            <Image
              src="https://static.wixstatic.com/media/caedac_408a6c844bed4dfdb4e7a157abc59687~mv2.jpg/v1/fill/w_1354,h_766,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202025-03-19%20at%2017_11_edite.jpg"
              alt="SmartBit Team"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
              data-ai-hint="team collaboration"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
            {[
              { name: 'Osorio Lopez Diego Alberto', role: 'Líder de proyecto y Desarrollador móvil' },
              { name: 'Rodríguez Albarrán Zereh Alondra', role: 'Proyect manager' },
              { name: 'Rueda Hernández Paola Itzel', role: 'Desarrollador backend' },
              { name: 'Rosales García Kevin Yael', role: 'Desarrollador web' },
              { name: 'Vélez Méndez Jorge Alberto', role: 'Administrador de base de datos' },
              { name: 'Mercado Sierra Francisco Axel', role: 'Auxiliar desarrollador web' },
              { name: 'Esquivel Reyes Luis Angel', role: 'Auxiliar administrador de base de datos' },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <p className="font-semibold text-foreground">{member.name}</p>
                <p className="text-sm text-foreground/70">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
