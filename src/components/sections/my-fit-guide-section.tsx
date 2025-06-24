
import EncuestaForm from "@/app/components/EncuestaForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyFitGuideSection() {
  return (
    <section id="myfitguide" className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">Danos tu opinión</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Tus respuestas nos ayudan a mejorar y personalizar aún más tu experiencia con MyFitGuide. ¡Toma un momento para completar nuestra encuesta!
          </p>
        </div>

        <EncuestaForm className="shadow-xl" />

        <div className="mt-12 text-center">
            <Button asChild>
              <Link href="/resultados">
                Ver Resultados de la Encuesta
              </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
