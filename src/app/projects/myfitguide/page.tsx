import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Target, CalendarDays, Smartphone, CheckCircle2, ArrowRight, HeartPulse, Zap, TrendingUp, Brain } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import logo from '@/app/assets/logo.png';
import Link from 'next/link';
import { VideoPlayerModal } from '@/components/ui/video-player-modal';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  subFeatures: string[];
}

const featuresData: Feature[] = [
  {
    icon: Target,
    title: "Objetivos Personalizados",
    description: "Define y rastrea tus metas de fitness personalizadas.",
    subFeatures: [
      "Pérdida de peso",
      "Ganancia muscular",
      "Resistencia cardiovascular",
    ],
  },
  {
    icon: CalendarDays,
    title: "Planificación de Entrenamientos",
    description: "Crea y programa tus rutinas de ejercicio.",
    subFeatures: [
      "Rutinas predefinidas",
      "Calendario personalizado",
      "Recordatorios automáticos",
    ],
  },
  {
    icon: Smartphone,
    title: "App Móvil",
    description: "Accede a todas las funciones desde tu smartphone.",
    subFeatures: [
      "Modo offline",
      "Sincronización automática",
      "Notificaciones push",
    ],
  },
];

const benefitsData = [
    {
        icon: HeartPulse,
        title: "Mejora tu Rendimiento",
        description: "Planes inteligentes que se adaptan a tu progreso para que superes tus límites de forma segura y eficiente.",
    },
    {
        icon: Zap,
        title: "Adaptado a tu Estilo de Vida",
        description: "¿Poco tiempo? ¿Entrenas en casa? Tu plan se ajusta a tus horarios, equipo y preferencias alimenticias.",
    },
    {
        icon: TrendingUp,
        title: "Motivación Constante",
        description: "Con seguimiento de progreso y recordatorios, te mantenemos enfocado en el camino hacia tus metas.",
    },
]


export default function MyFitGuidePage() {
const videoDemoUrl = "/comercial.mp4";
  return (
    <main>
      {/* Hero Section de la página del proyecto */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <Image src={logo} alt="MyFitGuide Logo" width={100} height={100} className="mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-primary">MyFitGuide</h1>
          <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            La aplicación diseñada para ayudarte a alcanzar tus metas de fitness y bienestar de manera personalizada y sencilla.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/projects/myfitguide/quick-start">
                <Download className="mr-2 h-5 w-5" />
                Descargar App
              </Link>
            </Button>
            <VideoPlayerModal videoUrl={videoDemoUrl}>
                <Button size="lg" variant="outline">
                    Ver Demo
                </Button>
            </VideoPlayerModal>
          </div>
        </div>
      </section>

      {/* Sección de Beneficios */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary sm:text-4xl">
                    Transforma tu Vida, no solo tu Físico
                </h2>
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

      {/* Nueva Sección de Principios */}
      <section className="py-20 md:py-32">
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

      {/* Sección de Funcionalidades */}
      <section id="core-features" className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">
              Funcionalidades Principales
            </h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Descubre las herramientas clave que MyFitGuide ofrece para ayudarte a alcanzar tus metas de salud y bienestar.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {featuresData.map((feature) => (
              <Card key={feature.title} className="flex flex-col shadow-lg rounded-xl h-full bg-card border-primary/10 hover:border-primary/30 transition-all duration-300">
                <CardHeader>
                  <div className="mb-3">
                    <feature.icon className="w-10 h-10 text-primary" />
                  </div>
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

      {/* Sección "Cómo Empezar" */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">
              ¿Listo para Empezar?
            </h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Sigue nuestra guía paso a paso para configurar tu perfil y comenzar tu primera rutina en menos de 5 minutos.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/projects/myfitguide/quick-start">
                  Ver Guía de Inicio Rápido
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
        </div>
      </section>

    </main>
  );
}

