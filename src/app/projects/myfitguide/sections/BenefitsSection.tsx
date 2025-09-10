"use client";
import { HeartPulse, Zap, TrendingUp } from 'lucide-react';

const benefitsData = [
  { icon: HeartPulse, title: "Mejora tu Rendimiento", description: "Planes inteligentes que se adaptan a tu progreso para que superes tus límites de forma segura y eficiente." },
  { icon: Zap, title: "Adaptado a tu Estilo de Vida", description: "¿Poco tiempo? ¿Entrenas en casa? Tu plan se ajusta a tus horarios, equipo y preferencias alimenticias." },
  { icon: TrendingUp, title: "Motivación Constante", description: "Con seguimiento de progreso y recordatorios, te mantenemos enfocado en el camino hacia tus metas." },
];

export function BenefitsSection() {
  return (
    <section className="py-20 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">Transforma tu Vida, no solo tu Físico</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            MyFitGuide está diseñado para integrarse en tu vida y ofrecerte beneficios reales y duraderos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {benefitsData.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="flex justify-center items-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-foreground/70">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}