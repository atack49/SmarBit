import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Brain } from 'lucide-react';
import teamImage from '@/app/assets/team.jpg';

export default function AboutUsSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            A cerca de <span className="text-primary">MyfitGuide</span>
          </h2>
          <div className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto space-y-4">
            <p className="leading-relaxed">
              Aprende a usar todas las funcionalidades de MyFitGuide para alcanzar tus objetivos de fitness. Desde configuración inicial hasta funciones avanzadas.
            </p>
          </div>
        </div>

        {/* Sección de "MyFitGuide" y Cards de Innovación e Inteligencia */}
        <div className="flex flex-col items-center">
            <div className="mb-8 text-center max-w-xl">
              <h3 className="text-2xl font-headline font-bold text-primary">MyFitGuide</h3>
              <p className="mt-2 text-lg text-foreground/80">
                Aplicación diseñada para generar dietas y rutinas personalizadas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
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


        {/* Team Section (DR) */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-headline font-bold text-primary mb-8">Nuestro Equipo (DR)</h3>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-10">
          Un equipo de estudiantes de la Universidad Tecnológica del Valle de Toluca, apasionados por la tecnología y la innovación, dedicados a crear soluciones que marcan la diferencia.
          </p>
           <div className="flex justify-center mb-10">
            <Image
              src={teamImage}
              alt="MyFitGuide Team"
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