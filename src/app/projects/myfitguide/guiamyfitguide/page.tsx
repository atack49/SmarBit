
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download } from 'lucide-react';
import Link from 'next/link';

interface Step {
  stepNumber: number;
  title: string;
  description: string;
  subItems: string[];
}

const stepsData: Step[] = [
  {
    stepNumber: 1,
    title: "Descarga e Instalación",
    description: "Descarga MyFitGuide desde tu tienda de aplicaciones favorita",
    subItems: [
      "Disponible en iOS y Android",
      "Instalación gratuita",
      "Registro con email o redes sociales",
    ],
  },
  {
    stepNumber: 2,
    title: "Configuración del Perfil",
    description: "Completa tu información personal y objetivos fitness",
    subItems: [
      "Datos básicos (edad, peso, altura)",
      "Nivel de actividad física",
      "Objetivos principales",
    ],
  },
  {
    stepNumber: 3,
    title: "Paso 3: Primera Rutina",
    description: "Selecciona o crea tu primera rutina de entrenamiento",
    subItems: [
      "Explora rutinas predefinidas",
      "Personaliza según tu nivel",
      "Programa tus días de entrenamiento",
    ],
  },
  {
    stepNumber: 4,
    title: "Paso 4: Seguimiento Diario",
    description: "Registra tus entrenamientos y progreso",
    subItems: [
      "Marca ejercicios completados",
      "Registra pesos y repeticiones",
      "Toma fotos de progreso",
    ],
  },
];

export default function QuickStartGuideSection() {
  return (
    <section id="quick-start-guide" className="py-16 md:py-10 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-12 text-center">
          <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">
            Guía de Inicio Rápido
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Sigue estos pasos para comenzar a usar MyFitGuide
          </p>
          <div className="absolute top-0 right-0 hidden sm:block">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/dowland"> 
                <Download className="mr-2 h-5 w-5" />
                Descargar App
              </Link>
            </Button>
          </div>
           <div className="mt-4 sm:hidden flex justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/quick-start">
                <Download className="mr-2 h-5 w-5" />
                Descargar App
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-10 max-w-3xl mx-auto">
          {stepsData.map((step) => (
            <div key={step.stepNumber} className="flex items-start space-x-6 p-6 rounded-lg shadow-md bg-card">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                {step.stepNumber}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-headline font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-foreground/70 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.subItems.map((item, index) => (
                    <li key={index} className="flex items-center text-foreground/90">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
