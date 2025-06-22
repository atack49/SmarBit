import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Brain } from 'lucide-react';

export default function AboutUsSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">A cerca de SmartBit</h2>
          <div className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto space-y-4">
            <p className="leading-relaxed">
            tiene como objeto social el desarrollo, comercialización y mantenimiento de software basado en inteligencia artificial, así como la creación de soluciones tecnológicas en salud y bienestar.
            </p>
            <p className="leading-relaxed">
            Como proyecto inicial, la empresa desarrollará una aplicación basada en inteligencia artificial que diseñará planes de alimentación y ejercicio, proporcionando recomendaciones geográficas y ajuste de presupuestos personalizados según las necesidades del usuario.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
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
          <div className="flex justify-center">
            <Image
              src="https://static.wixstatic.com/media/caedac_408a6c844bed4dfdb4e7a157abc59687~mv2.jpg/v1/fill/w_1354,h_766,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202025-03-19%20at%2017_11_edite.jpg"
              alt="SmartBit Team"
              width={500}
              height={350}
              className="rounded-xl shadow-lg"
              data-ai-hint="team collaboration"
            />
          </div>
        </div>

        {/* Team Section (DR) */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-headline font-bold text-primary mb-8">Nuestro Equipo (DR)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
            {[
              { name: 'Diego Alberto Osorio Lopez', role: 'Leader/Programmer' },
              { name: 'Paola Itzel Rueda Hernandez', role: 'Programador' },
              { name: 'Kevin Yael Rosales García', role: 'Tester' },
              { name: 'Jorge Alberto Velez Mendez', role: 'Admin. de base de datos' },
              { name: 'Francisco Axel Mercado Sierra', role: 'Programador' },
              { name: 'Luis Angel Reyes Esquivel', role: 'Tester' },
              { name: 'Zereh A. Rodríguez Albarrán', role: 'Admin. de base de datos' },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Placeholder for potential team member images */}
                {/* <div className="w-20 h-20 bg-gray-300 rounded-full mb-3"></div> */}
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
