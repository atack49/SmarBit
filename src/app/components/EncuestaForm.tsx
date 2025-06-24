
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type EncuestaFormProps = {
  className?: string;
};

export default function EncuestaForm({ className }: EncuestaFormProps) {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSdhxtsBIvGNyLKT-rGBSy0csLdZzCdGDhbtV2KRe17d4AwDvw/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: data,
        }
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    }


    setEnviado(true);
    form.reset();
  };

  return (
    <Card className={cn("w-full max-w-3xl", className)}>
       <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Encuesta de Opinión</CardTitle>
        <CardDescription className="text-center">
          Tu opinión es valiosa para nosotros y nos ayuda a mejorar.
        </CardDescription>
      </CardHeader>
      {enviado ? (
        <CardContent>
          <p className="text-center text-primary font-medium text-lg py-10">
            ¡Gracias por enviar tu respuesta!
          </p>
        </CardContent>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8">
            {/* 1. Rango de edad */}
            <fieldset className="space-y-3">
              <legend className="text-lg font-medium">1. ¿Cuál es tu rango de edad?</legend>
              <RadioGroup required name="entry.1066883662" className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {["Menos de 18", "18–25", "26–35"].map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt} id={`edad-${opt}`} />
                    <Label htmlFor={`edad-${opt}`} className="font-normal">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

            {/* 2. Nivel de experiencia */}
            <fieldset className="space-y-3">
              <legend className="text-lg font-medium">2. ¿Cuál es tu nivel de experiencia con apps de salud y fitness?</legend>
              <RadioGroup required name="entry.1997438928" className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {["Nunca he usado", "He probado alguna, pero ya no la uso", "Uso regularmente 1–2 apps", "Uso varias apps simultáneamente"].map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt} id={`exp-${opt.replace(/\s+/g, '-')}`} />
                    <Label htmlFor={`exp-${opt.replace(/\s+/g, '-')}`} className="font-normal">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

            {/* 3. Lo que más te impide mantener una rutina */}
            <fieldset className="space-y-3">
              <legend className="text-lg font-medium">3. ¿Qué es lo que más te impide mantener una rutina constante de salud o ejercicio?</legend>
              <RadioGroup required name="entry.1533242634" className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {["Falta de motivación", "No sé qué ejercicios hacer", "Dieta difícil de seguir", "Falta de tiempo"].map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt} id={`impide-${opt.replace(/\s+/g, '-')}`} />
                    <Label htmlFor={`impide-${opt.replace(/\s+/g, '-')}`} className="font-normal">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

            {/* 4. Funcionalidades imprescindibles */}
            <fieldset className="space-y-3">
              <legend className="text-lg font-medium">4. ¿Qué funcionalidades te resultarían imprescindibles en una aplicación móvil de salud y fitness?</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Planes de entrenamiento adaptados", "Dietas personalizadas", "Seguimiento automático de actividad", "Comunidad y retos sociales", "Dispositivo de seguimiento de actividad"].map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <Checkbox id={`func-${opt.replace(/\s+/g, '-')}`} name="entry.164568104" value={opt} />
                    <Label htmlFor={`func-${opt.replace(/\s+/g, '-')}`} className="font-normal">{opt}</Label>
                  </div>
                ))}
              </div>
            </fieldset>

            {/* 5. Frecuencia de uso */}
            <fieldset className="space-y-3">
              <legend className="text-lg font-medium">5. ¿Con qué frecuencia usarías una aplicación móvil como esta?</legend>
              <RadioGroup required name="entry.1782057900" className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {["Todos los días", "3–5 veces por semana", "1–2 veces por semana", "Menos de una vez por semana"].map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt} id={`freq-${opt.replace(/\s+/g, '-')}`} />
                    <Label htmlFor={`freq-${opt.replace(/\s+/g, '-')}`} className="font-normal">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

            {/* 6. Dispositivo preferido */}
            <fieldset className="space-y-3">
              <legend className="text-lg font-medium">6. ¿Qué dispositivo utilizarías principalmente para esta aplicación móvil?</legend>
              <RadioGroup required name="entry.1782133720" className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {["Smartphone", "Tablet", "Computadora", "Wearable (smartwatch, pulsera)"].map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt} id={`device-${opt.replace(/\s+/g, '-')}`} />
                    <Label htmlFor={`device-${opt.replace(/\s+/g, '-')}`} className="font-normal">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

            {/* 7. Monto dispuesto a pagar */}
            <fieldset className="space-y-3">
              <legend className="text-lg font-medium">7. ¿Cuánto estarías dispuesto a pagar por una suscripción mensual que cumpla con tus expectativas?</legend>
              <RadioGroup required name="entry.369716536" className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {[
                  "Gratis (con anuncios)",
                  "Hasta $49 MXN (cubriría actualizaciones básicas)",
                  "$50–99 MXN (incluye soporte y nuevas funciones)",
                  "$100–149 MXN (agrega recomendaciones de lugares locales y análisis semanales)",
                  "Más de $150 MXN (todo lo anterior + planes 1-a-1)",
                ].map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt} id={`pay-${opt.replace(/\s+/g, '-')}`} />
                    <Label htmlFor={`pay-${opt.replace(/\s+/g, '-')}`} className="font-normal">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

            {/* 8. Tipo de pago */}
            <fieldset className="space-y-3">
              <legend className="text-lg font-medium">8. ¿Preferirías un pago único, suscripción mensual o anual?</legend>
              <RadioGroup required name="entry.230700242" className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {["Pago único", "Suscripción mensual", "Suscripción anual (con descuento)"].map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt} id={`payment-type-${opt.replace(/\s+/g, '-')}`} />
                    <Label htmlFor={`payment-type-${opt.replace(/\s+/g, '-')}`} className="font-normal">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

            {/* 9. Importancia de la personalización */}
            <fieldset className="space-y-3">
              <legend className="text-lg font-medium">9. ¿Cómo valorarías la importancia de la personalización real en tu plan de dieta y ejercicio?</legend>
              <RadioGroup required name="entry.2046814307" className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {["Nada importante", "Poco importante", "Moderadamente importante", "Muy importante"].map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt} id={`personalization-${opt.replace(/\s+/g, '-')}`} />
                    <Label htmlFor={`personalization-${opt.replace(/\s+/g, '-')}`} className="font-normal">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

            {/* 10. Interés en sugerir rutas a gimnasios */}
            <fieldset className="space-y-3">
              <legend className="text-lg font-medium">10. ¿Te gustaría que la aplicación sugiriera rutas a gimnasios o espacios para entrenar cerca de ti?</legend>
              <RadioGroup required name="entry.1566811163" className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {["Sí, pero solo si están cerca de mi casa o trabajo", "No me interesa esa función", "Sí, pero solo sugerencias basadas en distancia o tipo de espacio"].map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt} id={`routes-${opt.replace(/\s+/g, '-')}`} />
                    <Label htmlFor={`routes-${opt.replace(/\s+/g, '-')}`} className="font-normal">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

            {/* 11. Historial de progreso con IA */}
            <fieldset className="space-y-3">
              <legend className="text-lg font-medium">11. ¿Te gustaría que la aplicación guardara tu historial de progreso y actualizara tu dieta y ejercicios semanalmente con ayuda de inteligencia artificial?</legend>
              <RadioGroup required name="entry.2049304383" className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {["Sí, eso me motivaría", "Me interesa, pero no es esencial", "No me interesa"].map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt} id={`history-${opt.replace(/\s+/g, '-')}`} />
                    <Label htmlFor={`history-${opt.replace(/\s+/g, '-')}`} className="font-normal">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

            {/* 12. Importancia de ver progreso */}
            <fieldset className="space-y-3">
              <legend className="text-lg font-medium">12. ¿Qué tan importante es para ti poder ver tu progreso dentro de la app?</legend>
              <RadioGroup required name="entry.1004635038" className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {["Nada importante", "Poco importante", "Moderadamente importante", "Muy importante"].map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt} id={`progress-${opt.replace(/\s+/g, '-')}`} />
                    <Label htmlFor={`progress-${opt.replace(/\s+/g, '-')}`} className="font-normal">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

            {/* 13. Compartir datos */}
            <fieldset className="space-y-3">
              <legend className="text-lg font-medium">13. ¿Estarías dispuesto(a) a compartir datos como tu ubicación o hábitos diarios para mejorar las recomendaciones personalizadas?</legend>
              <RadioGroup required name="entry.1729868495" className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {["Sí, si es para mejorar mi experiencia", "Tal vez, dependiendo de la privacidad", "No, prefiero no compartir datos"].map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt} id={`share-${opt.replace(/\s+/g, '-')}`} />
                    <Label htmlFor={`share-${opt.replace(/\s+/g, '-')}`} className="font-normal">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Enviar respuestas</Button>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
