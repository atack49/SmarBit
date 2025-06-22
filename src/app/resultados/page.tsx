"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Papa from "papaparse";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ArrowLeft } from "lucide-react";

// URL pública de tu Google Sheet en formato CSV
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1XQzZvP_qdzH4aGOLH83drJyUVA339YSBhrapyhE9YtQ/export?format=csv&gid=924345126";

// Colores para las gráficas
const COLORS = [
  "#00C27F",
  "#F59E0B",
  "#6366F1",
  "#EC4899",
  "#10B981",
  "#EF4444",
];

// Opciones según las 13 preguntas de tu encuesta
const RESPUESTAS = {
  rangoEdad: ["Menos de 18", "18–25", "26–35"],
  nivelExperiencia: [
    "Nunca he usado",
    "He probado alguna, pero ya no la uso",
    "Uso regularmente 1–2 apps",
    "Uso varias apps simultáneamente",
  ],
  impideRutina: [
    "Falta de motivación",
    "No sé qué ejercicios hacer",
    "Dieta difícil de seguir",
    "Falta de tiempo",
    "Otros:",
  ],
  funcionalidades: [
    "Planes de entrenamiento adaptados",
    "Dietas personalizadas",
    "Seguimiento automático de actividad",
    "Comunidad y retos sociales",
    "Dispositivo de seguimiento de actividad",
  ],
  frecuenciaUso: [
    "Todos los días",
    "3–5 veces por semana",
    "1–2 veces por semana",
    "Menos de una vez por semana",
  ],
  dispositivo: ["Smartphone", "Tablet", "Computadora", "Wearable (smartwatch, pulsera)"],
  montoPagar: [
    "Gratis (con anuncios)",
    "Hasta $49 MXN (cubriría actualizaciones básicas)",
    "$50–99 MXN (incluye soporte y nuevas funciones)",
    "$100–149 MXN (agrega recomendaciones de lugares locales y análisis semanales)",
    "Más de $150 MXN (todo lo anterior + planes 1-a-1)",
  ],
  tipoPago: ["Pago único", "Suscripción mensual", "Suscripción anual (con descuento)"],
  importanciaPersonalizacion: [
    "Nada importante",
    "Poco importante",
    "Moderadamente importante",
    "Muy importante",
  ],
  sugerirRutas: [
    "Sí, pero solo si están cerca de mi casa o trabajo",
    "No me interesa esa función",
    "Sí, pero solo sugerencias basadas en distancia o tipo de espacio",
  ],
  historialIA: [
    "Sí, eso me motivaría",
    "Me interesa, pero no es esencial",
    "No me interesa",
  ],
  importanciaProgreso: [
    "Nada importante",
    "Poco importante",
    "Moderadamente importante",
    "Muy importante",
  ],
  compartirDatos: [
    "Sí, si es para mejorar mi experiencia",
    "Tal vez, dependiendo de la privacidad",
    "No, prefiero no compartir datos",
  ],
};

export default function ResultadosEncuestaPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo descargar el CSV");
        return res.text();
      })
      .then((csv) => {
        const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
        setData(parsed.data as any[]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Conteo para opción única
  const contarUnica = (pregunta: string, opciones: string[]) => {
    const conteo = Object.fromEntries(opciones.map((o) => [o, 0]));
    data.forEach((item) => {
      const v: string = item[pregunta]?.trim();
      if (v in conteo) conteo[v]++;
    });
    return Object.entries(conteo).map(([name, cantidad]) => ({ name, cantidad }));
  };

  // Conteo para opción múltiple
  const contarMultiple = (pregunta: string, opciones: string[]) => {
    const conteo = Object.fromEntries(opciones.map((o) => [o, 0]));
    data.forEach((item) => {
      const v: string = item[pregunta] || "";
      v.split(",").forEach((s) => {
        const key = s.trim();
        if (key in conteo) conteo[key]++;
      });
    });
    return Object.entries(conteo).map(([name, cantidad]) => ({ name, cantidad }));
  };

  if (loading) return <p className="text-center mt-10">Cargando datos...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  // Preparar datos de las 13 preguntas
  const datosRangoEdad = contarUnica("¿Cuál es tu rango de edad?", RESPUESTAS.rangoEdad);
  const datosNivelExperiencia = contarUnica(
    "¿Cuál es tu nivel de experiencia con apps de salud y fitness?",
    RESPUESTAS.nivelExperiencia
  );
  const datosImpideRutina = contarUnica(
    "¿Qué es lo que más te impide mantener una rutina constante de salud o ejercicio?",
    RESPUESTAS.impideRutina
  );
  const datosFuncionalidades = contarMultiple(
    "¿Qué funcionalidades te resultarían imprescindibles en una aplicación móvil de salud y fitness?",
    RESPUESTAS.funcionalidades
  );
  const datosFrecuenciaUso = contarUnica(
    "¿Con qué frecuencia usarías una aplicación móvil como esta?",
    RESPUESTAS.frecuenciaUso
  );
  const datosDispositivo = contarUnica(
    "¿Qué dispositivo utilizarías principalmente para esta aplicación móvil?",
    RESPUESTAS.dispositivo
  );
  const datosMontoPagar = contarUnica(
    "¿Cuánto estarías dispuesto a pagar por una suscripción mensual que cumpla con tus expectativas?",
    RESPUESTAS.montoPagar
  );
  const datosTipoPago = contarUnica(
    "¿Preferirías un pago único, suscripción mensual o anual?",
    RESPUESTAS.tipoPago
  );
  const datosImportanciaPersonalizacion = contarUnica(
    "¿Cómo valorarías la importancia de la personalización real en tu plan de dieta y ejercicio?",
    RESPUESTAS.importanciaPersonalizacion
  );
  const datosSugerirRutas = contarUnica(
    "¿Te gustaría que la aplicación sugiriera rutas a gimnasios o espacios para entrenar cerca de ti?",
    RESPUESTAS.sugerirRutas
  );
  const datosHistorialIA = contarUnica(
    "¿Te gustaría que la aplicación guardara tu historial de progreso y actualizara tu dieta y ejercicios semanalmente con ayuda de inteligencia artificial?",
    RESPUESTAS.historialIA
  );
  const datosImportanciaProgreso = contarUnica(
    "¿Qué tan importante es para ti poder ver tu progreso dentro de la app?",
    RESPUESTAS.importanciaProgreso
  );
  const datosCompartirDatos = contarUnica(
    "¿Estarías dispuesto(a) a compartir datos como tu ubicación o hábitos diarios para mejorar las recomendaciones personalizadas?",
    RESPUESTAS.compartirDatos
  );

  const GraficaPastel = ({ titulo, datos }: { titulo: string; datos: { name: string; cantidad: number }[] }) => (
    <div className="max-w-4xl mx-auto mb-12">
      <h2 className="text-xl font-semibold mb-4 text-center">{titulo}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={datos} dataKey="cantidad" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {datos.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  const GraficaBarras = ({ titulo, datos }: { titulo: string; datos: { name: string; cantidad: number }[] }) => (
    <div className="max-w-4xl mx-auto mb-12">
      <h2 className="text-xl font-semibold mb-4 text-center">{titulo}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={datos}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" minPointSize={5}>
            {datos.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <main className="min-h-screen bg-white py-10 px-4">
      {/* Botón de regreso con diseño */}
      <div className="flex justify-start mb-6">
        <Link href="/">
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <ArrowLeft className="w-5 h-5 mr-2" />Volver al inicio
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-center text-green-600 mb-10">
        Resultados de la Encuesta
      </h1>
      {/* Renderizar las 13 gráficas */}
      <GraficaPastel titulo="¿Cuál es tu rango de edad?" datos={datosRangoEdad} />
      <GraficaPastel titulo="¿Cuál es tu nivel de experiencia con apps de salud y fitness?" datos={datosNivelExperiencia} />
      <GraficaPastel titulo="¿Qué es lo que más te impide mantener una rutina constante de salud o ejercicio?" datos={datosImpideRutina} />
      <GraficaBarras titulo="¿Qué funcionalidades te resultarían imprescindibles en una aplicación móvil de salud y fitness?" datos={datosFuncionalidades} />
      <GraficaPastel titulo="¿Con qué frecuencia usarías una aplicación móvil como esta?" datos={datosFrecuenciaUso} />
      <GraficaPastel titulo="¿Qué dispositivo utilizarías principalmente para esta aplicación móvil?" datos={datosDispositivo} />
      <GraficaPastel titulo="¿Cuánto estarías dispuesto a pagar por una suscripción mensual que cumpla con tus expectativas?" datos={datosMontoPagar} />
      <GraficaPastel titulo="¿Preferirías un pago único, suscripción mensual o anual?" datos={datosTipoPago} />
      <GraficaPastel titulo="¿Cómo valorarías la importancia de la personalización real en tu plan de dieta y ejercicio?" datos={datosImportanciaPersonalizacion} />
      <GraficaPastel titulo="¿Te gustaría que la aplicación sugiriera rutas a gimnasios o espacios para entrenar cerca de ti?" datos={datosSugerirRutas} />
      <GraficaPastel titulo="¿Te gustaría que la aplicación guardara tu historial de progreso y actualizara tu dieta y ejercicios semanalmente con ayuda de inteligencia artificial?" datos={datosHistorialIA} />
      <GraficaPastel titulo="¿Qué tan importante es para ti poder ver tu progreso dentro de la app?" datos={datosImportanciaProgreso} />
      <GraficaPastel titulo="¿Estarías dispuesto(a) a compartir datos como tu ubicación o hábitos diarios para mejorar las recomendaciones personalizadas?" datos={datosCompartirDatos} />
    </main>
  );
}
