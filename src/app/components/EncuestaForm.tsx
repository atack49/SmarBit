"use client";

import { useState } from "react";
import Link from "next/link";  // <-- importamos Link

export default function EncuestaForm() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    await fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSdhxtsBIvGNyLKT-rGBSy0csLdZzCdGDhbtV2KRe17d4AwDvw/formResponse",
      {
        method: "POST",
        mode: "no-cors",
        body: data,
      }
    );

    setEnviado(true);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        {/* ---- Aquí el botón de regreso ---- */}
        <div className="flex justify-start mb-4">
          <Link href="/">
            <button className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition ease-in-out duration-200 transform hover:scale-105">
              <span className="mr-3">&#8592;</span> Volver al inicio
            </button>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Encuesta
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Tu opinión es valiosa y esta encuesta es muy breve.
        </p>

        {enviado ? (
          <p className="text-center text-green-600 font-medium">
            ¡Gracias por enviar tu respuesta!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Rango de edad */}
            <fieldset className="space-y-2">
              <legend className="text-lg font-medium text-gray-800">
                ¿Cuál es tu rango de edad?
              </legend>
              <div className="flex flex-col space-y-2">
                {["Menos de 18", "18–25", "26–35"].map((opt) => (
                  <label key={opt} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="entry.1066883662"
                      value={opt}
                      required
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 2. Nivel de experiencia */}
            <fieldset className="space-y-2">
              <legend className="text-lg font-medium text-gray-800">
                ¿Cuál es tu nivel de experiencia con apps de salud y fitness?
              </legend>
              <div className="flex flex-col space-y-2">
                {[
                  "Nunca he usado",
                  "He probado alguna, pero ya no la uso",
                  "Uso regularmente 1–2 apps",
                  "Uso varias apps simultáneamente",
                ].map((opt) => (
                  <label key={opt} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="entry.1997438928"
                      value={opt}
                      required
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 3. Lo que más te impide mantener una rutina */}
            <fieldset className="space-y-2">
              <legend className="text-lg font-medium text-gray-800">
                ¿Qué es lo que más te impide mantener una rutina constante de salud o ejercicio?
              </legend>
              <div className="flex flex-col space-y-2">
                {[
                  "Falta de motivación",
                  "No sé qué ejercicios hacer",
                  "Dieta difícil de seguir",
                  "Falta de tiempo",
                  
                ].map((opt) => (
                  <label key={opt} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="entry.1533242634"
                      value={opt}
                      required
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 4. Funcionalidades imprescindibles */}
            <fieldset className="space-y-2">
              <legend className="text-lg font-medium text-gray-800">
                ¿Qué funcionalidades te resultarían imprescindibles en una aplicación móvil de salud y fitness?
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Planes de entrenamiento adaptados",
                  "Dietas personalizadas",
                  "Seguimiento automático de actividad",
                  "Comunidad y retos sociales",
                  "Dispositivo de seguimiento de actividad",
                ].map((opt) => (
                  <label key={opt} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="entry.164568104"
                      value={opt}
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 5. Frecuencia de uso */}
            <fieldset className="space-y-2">
              <legend className="text-lg font-medium text-gray-800">
                ¿Con qué frecuencia usarías una aplicación móvil como esta?
              </legend>
              <div className="flex flex-col space-y-2">
                {[
                  "Todos los días",
                  "3–5 veces por semana",
                  "1–2 veces por semana",
                  "Menos de una vez por semana",
                ].map((opt) => (
                  <label key={opt} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="entry.1782057900"
                      value={opt}
                      required
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 6. Dispositivo preferido */}
            <fieldset className="space-y-2">
              <legend className="text-lg font-medium text-gray-800">
                ¿Qué dispositivo utilizarías principalmente para esta aplicación móvil?
              </legend>
              <div className="flex flex-col space-y-2">
                {[
                  "Smartphone",
                  "Tablet",
                  "Computadora",
                  "Wearable (smartwatch, pulsera)",
                ].map((opt) => (
                  <label key={opt} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="entry.1782133720"
                      value={opt}
                      required
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 7. Monto dispuesto a pagar */}
            <fieldset className="space-y-2">
              <legend className="text-lg font-medium text-gray-800">
                ¿Cuánto estarías dispuesto a pagar por una suscripción mensual que cumpla con tus expectativas?
              </legend>
              <div className="flex flex-col space-y-2">
                {[
                  "Gratis (con anuncios)",
                  "Hasta $49 MXN (cubriría actualizaciones básicas)",
                  "$50–99 MXN (incluye soporte y nuevas funciones)",
                  "$100–149 MXN (agrega recomendaciones de lugares locales y análisis semanales)",
                  "Más de $150 MXN (todo lo anterior + planes 1-a-1)",
                ].map((opt) => (
                  <label key={opt} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="entry.369716536"
                      value={opt}
                      required
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 8. Tipo de pago */}
            <fieldset className="space-y-2">
              <legend className="text-lg font-medium text-gray-800">
                ¿Preferirías un pago único, suscripción mensual o anual?
              </legend>
              <div className="flex flex-col space-y-2">
                {[
                  "Pago único",
                  "Suscripción mensual",
                  "Suscripción anual (con descuento)",
                ].map((opt) => (
                  <label key={opt} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="entry.230700242"
                      value={opt}
                      required
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 9. Importancia de la personalización */}
            <fieldset className="space-y-2">
              <legend className="text-lg font-medium text-gray-800">
                ¿Cómo valorarías la importancia de la personalización real en tu plan de dieta y ejercicio?
              </legend>
              <div className="flex flex-col space-y-2">
                {[
                  "Nada importante",
                  "Poco importante",
                  "Moderadamente importante",
                  "Muy importante",
                ].map((opt) => (
                  <label key={opt} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="entry.2046814307"
                      value={opt}
                      required
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 10. Interés en sugerir rutas a gimnasios */}
            <fieldset className="space-y-2">
              <legend className="text-lg font-medium text-gray-800">
                ¿Te gustaría que la aplicación sugiriera rutas a gimnasios o espacios para entrenar cerca de ti?
              </legend>
              <div className="flex flex-col space-y-2">
                {[
                  "Sí, pero solo si están cerca de mi casa o trabajo",
                  "No me interesa esa función",
                  "Sí, pero solo sugerencias basadas en distancia o tipo de espacio",
                ].map((opt) => (
                  <label key={opt} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="entry.1566811163"
                      value={opt}
                      required
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 11. Historial de progreso con IA */}
            <fieldset className="space-y-2">
              <legend className="text-lg font-medium text-gray-800">
                ¿Te gustaría que la aplicación guardara tu historial de progreso y actualizara tu dieta y ejercicios semanalmente con ayuda de inteligencia artificial?
              </legend>
              <div className="flex flex-col space-y-2">
                {[
                  "Sí, eso me motivaría",
                  "Me interesa, pero no es esencial",
                  "No me interesa",
                ].map((opt) => (
                  <label key={opt} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="entry.2049304383"
                      value={opt}
                      required
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 12. Importancia de ver progreso */}
            <fieldset className="space-y-2">
              <legend className="text-lg font-medium text-gray-800">
                ¿Qué tan importante es para ti poder ver tu progreso dentro de la app?
              </legend>
              <div className="flex flex-col space-y-2">
                {[
                  "Nada importante",
                  "Poco importante",
                  "Moderadamente importante",
                  "Muy importante",
                ].map((opt) => (
                  <label key={opt} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="entry.1004635038"
                      value={opt}
                      required
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 13. Compartir datos */}
            <fieldset className="space-y-2">
              <legend className="text-lg font-medium text-gray-800">
                ¿Estarías dispuesto(a) a compartir datos como tu ubicación o hábitos diarios para mejorar las recomendaciones personalizadas?
              </legend>
              <div className="flex flex-col space-y-2">
                {[
                  "Sí, si es para mejorar mi experiencia",
                  "Tal vez, dependiendo de la privacidad",
                  "No, prefiero no compartir datos",
                ].map((opt) => (
                  <label key={opt} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="entry.1729868495"
                      value={opt}
                      required
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Botón enviar */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
              >
                Enviar respuestas
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
