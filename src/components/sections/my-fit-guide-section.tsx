import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AIDietPlanForm from "@/components/ai/ai-diet-plan-form";
import AIExercisePlanForm from "@/components/ai/ai-exercise-plan-form";
import GeographicRecommendationsForm from "@/components/ai/geographic-recommendations-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyFitGuideSection() {
  return (
    <section id="myfitguide" className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">Nombre de la Aplicación: My Fit Guide</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Inspirando y guiando tu camino hacia una vida más saludable y activa con planes personalizados impulsados por IA.
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h3 className="text-2xl font-headline font-bold text-primary">MISIÓN</h3>
            <p className="text-foreground/80">
              Inspirar y guiar a las personas en su camino hacia una vida más saludable y activa, brindándoles las herramientas y el conocimiento personalizado para transformar sus hábitos y alcanzar su máximo potencial.
            </p>
            <Separator />
            <h3 className="text-2xl font-headline font-bold text-primary">VISIÓN</h3>
            <p className="text-foreground/80">
              Crear un mundo donde el bienestar personalizado esté al alcance de todos, sin importar su nivel de experiencia o ubicación.
            </p>
             <Separator />
            <h3 className="text-2xl font-headline font-bold text-primary">OBJETIVO</h3>
            <p className="text-foreground/80">
               Realizar una aplicación implementando inteligencia artificial, que diseñe planes de alimentación y de ejercicios, con recomendaciones geográficas y ajuste de presupuestos.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-headline font-bold text-primary">VALORES</h3>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li><strong>Personalización:</strong> Adaptamos nuestros planes a las necesidades, objetivos y recursos únicos de cada usuario.</li>
              <li><strong>Inteligencia:</strong> Utilizamos la IA para optimizar continuamente los planes de entrenamiento y nutrición, maximizando los resultados.</li>
              <li><strong>Accesibilidad:</strong> Ofrecemos una solución fácil de usar para personas de todos los niveles y presupuestos.</li>
              <li><strong>Integración:</strong> Combinamos entrenamiento y nutrición en una sola plataforma para una experiencia completa y eficiente.</li>
              <li><strong>Sostenibilidad:</strong> Fomentamos hábitos saludables a largo plazo, promoviendo un estilo de vida equilibrado y sostenible.</li>
              <li><strong>Compromiso:</strong> Estamos comprometidos con el éxito de nuestros usuarios y los apoyamos en su camino hacia el bienestar.</li>
            </ul>
             <Separator />
            <h3 className="text-2xl font-headline font-bold text-primary">METAS</h3>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li>Consiga una tasa de retención de usuarios del 70% dentro del primer mes después de la descarga.</li>
              <li>Asegúrese de que los usuarios completen al menos 5 entrenamientos semanales dentro de la aplicación.</li>
            </ul>
          </div>
        </div>

         {/* Forms Section */}
        <div className="mt-16">
           <h3 className="text-2xl font-headline font-bold text-primary text-center mb-8">Explora las funciones de My Fit Guide</h3>
            <Tabs defaultValue="diet" className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 max-w-2xl mx-auto h-auto sm:h-12 mb-8">
                  <TabsTrigger value="diet" className="py-2.5">Plan de dieta de IA</TabsTrigger>
                  <TabsTrigger value="exercise" className="py-2.5">Plan de ejercicios de IA</TabsTrigger>
                  <TabsTrigger value="geo" className="py-2.5">Lugares locales</TabsTrigger>
                </TabsList>

                <TabsContent value="diet">
                  <AIDietPlanForm />
                </TabsContent>
                <TabsContent value="exercise">
                  <AIExercisePlanForm />
                </TabsContent>
                <TabsContent value="geo">
                  <GeographicRecommendationsForm />
                </TabsContent>
              </Tabs>
        </div>
      </div>
      <section className="mt-24 text-center bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-primary mb-4">¿Ya participaste en nuestra encuesta?</h2>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Tus respuestas nos ayudan a mejorar y personalizar aún más tu experiencia con MyFitGuide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/resultados">
                Ver Resultados
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/encuesta">
                Comenzar Encuesta
              </Link>
            </Button>
          </div>
        </section>
    </section>
  );
}
