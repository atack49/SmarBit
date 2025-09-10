"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CalendarDays, Smartphone, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature { icon: LucideIcon; title: string; description: string; subFeatures: string[]; }

const featuresData: Feature[] = [
  { icon: Target, title: "Objetivos Personalizados", description: "Define y rastrea tus metas de fitness personalizadas.", subFeatures: ["Pérdida de peso", "Ganancia muscular", "Resistencia cardiovascular"] },
  { icon: CalendarDays, title: "Planificación de Entrenamientos", description: "Crea y programa tus rutinas de ejercicio.", subFeatures: ["Rutinas predefinidas", "Calendario personalizado", "Recordatorios automáticos"] },
  { icon: Smartphone, title: "App Móvil", description: "Accede a todas las funciones desde tu smartphone.", subFeatures: ["Modo offline", "Sincronización automática", "Notificaciones push"] },
];

export function FeaturesSection() {
  return (
    <section id="core-features" className="py-20 md:py-15">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">Funcionalidades Principales</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Descubre las herramientas clave que MyFitGuide ofrece para ayudarte a alcanzar tus metas de salud y bienestar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {featuresData.map((feature) => (
            <Card key={feature.title} className="flex flex-col shadow-lg rounded-xl h-full bg-card border-primary/10 hover:border-primary/30 transition-all duration-300">
              <CardHeader>
                <div className="mb-3"><feature.icon className="w-10 h-10 text-primary" /></div>
                <CardTitle className="text-xl text-foreground mb-1">{feature.title}</CardTitle>
                <CardDescription className="leading-relaxed min-h-[3.5rem]">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow pt-2">
                <ul className="space-y-2">
                  {feature.subFeatures.map((subFeature, subIndex) => (
                    <li key={subIndex} className="flex items-start gap-2 text-sm text-foreground/90">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span>{subFeature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}