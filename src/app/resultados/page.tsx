
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
import { ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  "#3B82F6",
  "#8B5CF6",
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

export default function ResultadosPage() {
  // Auth state
  const [userRole, setUserRole] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Survey data state
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
    setIsClient(true);

    // Fetch survey data
    fetch(SHEET_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo descargar el CSV");
        return res.text();
      })
      .then((csv) => {
        const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
        setData(parsed.data as any[]);
      })
      .catch((err) => setFetchError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (email.toLowerCase() === 'admin@smartbit.com' && password === 'admin123') {
      localStorage.setItem('userRole', 'admin');
      setUserRole('admin');
    } else if (email.toLowerCase() === 'client@smartbit.com' && password === 'client123') {
      localStorage.setItem('userRole', 'client');
      setUserRole('client');
    } else {
      setAuthError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setUserRole(null);
    setEmail('');
    setPassword('');
  };

  // Helper functions for charts
  const contarUnica = (pregunta: string, opciones: string[]) => {
    const conteo = Object.fromEntries(opciones.map((o) => [o, 0]));
    data.forEach((item) => {
      const v: string = item[pregunta]?.trim();
      if (v in conteo) conteo[v]++;
    });
    return Object.entries(conteo).map(([name, cantidad]) => ({ name, cantidad }));
  };

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

  if (!isClient) {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  // LOGIN VIEW
  if (!userRole) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="absolute top-4 left-4">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
            </Link>
          </Button>
        </div>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para ver el panel.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder="usuario@smartbit.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {authError && <p className="text-sm text-destructive">{authError}</p>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Acceder</Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    );
  }

  // ADMIN DASHBOARD VIEW
  if (userRole === 'admin') {
    if (loading) return <p className="text-center mt-10">Cargando datos...</p>;
    if (fetchError) return <p className="text-center mt-10 text-destructive">Error: {fetchError}</p>;

    const datosRangoEdad = contarUnica("¿Cuál es tu rango de edad?", RESPUESTAS.rangoEdad);
    const datosNivelExperiencia = contarUnica("¿Cuál es tu nivel de experiencia con apps de salud y fitness?", RESPUESTAS.nivelExperiencia);
    const datosImpideRutina = contarUnica("¿Qué es lo que más te impide mantener una rutina constante de salud o ejercicio?", RESPUESTAS.impideRutina);
    const datosFuncionalidades = contarMultiple("¿Qué funcionalidades te resultarían imprescindibles en una aplicación móvil de salud y fitness?", RESPUESTAS.funcionalidades);
    const datosFrecuenciaUso = contarUnica("¿Con qué frecuencia usarías una aplicación móvil como esta?", RESPUESTAS.frecuenciaUso);
    const datosDispositivo = contarUnica("¿Qué dispositivo utilizarías principalmente para esta aplicación móvil?", RESPUESTAS.dispositivo);
    const datosMontoPagar = contarUnica("¿Cuánto estarías dispuesto a pagar por una suscripción mensual que cumpla con tus expectativas?", RESPUESTAS.montoPagar);
    const datosTipoPago = contarUnica("¿Preferirías un pago único, suscripción mensual o anual?", RESPUESTAS.tipoPago);
    const datosImportanciaPersonalizacion = contarUnica("¿Cómo valorarías la importancia de la personalización real en tu plan de dieta y ejercicio?", RESPUESTAS.importanciaPersonalizacion);
    const datosSugerirRutas = contarUnica("¿Te gustaría que la aplicación sugiriera rutas a gimnasios o espacios para entrenar cerca de ti?", RESPUESTAS.sugerirRutas);
    const datosHistorialIA = contarUnica("¿Te gustaría que la aplicación guardara tu historial de progreso y actualizara tu dieta y ejercicios semanalmente con ayuda de inteligencia artificial?", RESPUESTAS.historialIA);
    const datosImportanciaProgreso = contarUnica("¿Qué tan importante es para ti poder ver tu progreso dentro de la app?", RESPUESTAS.importanciaProgreso);
    const datosCompartirDatos = contarUnica("¿Estarías dispuesto(a) a compartir datos como tu ubicación o hábitos diarios para mejorar las recomendaciones personalizadas?", RESPUESTAS.compartirDatos);

    const GraficaPastel = ({ titulo, datos }: { titulo: string; datos: { name: string; cantidad: number }[] }) => (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-center">{titulo}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={datos} dataKey="cantidad" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                  return (
                    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}>
                  {datos.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} respuestas`, name]}/>
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      );
    
      const GraficaBarras = ({ titulo, datos }: { titulo: string; datos: { name: string; cantidad: number }[] }) => (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-center">{titulo}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={datos} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-30} textAnchor="end" height={80} />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={(value) => [`${value} respuestas`, 'Cantidad']}/>
                <Bar dataKey="cantidad" minPointSize={5}>
                  {datos.map((_, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      );

    return (
      <main className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
              </Link>
            </Button>
            <Button onClick={handleLogout} variant="destructive">
              <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-center text-primary mb-10">
            Resultados de la Encuesta (Panel de Administrador)
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GraficaPastel titulo="1. Rango de edad" datos={datosRangoEdad} />
            <GraficaPastel titulo="2. Nivel de experiencia con apps" datos={datosNivelExperiencia} />
            <GraficaPastel titulo="3. Impedimentos para rutina" datos={datosImpideRutina} />
            <GraficaBarras titulo="4. Funcionalidades imprescindibles" datos={datosFuncionalidades} />
            <GraficaPastel titulo="5. Frecuencia de uso" datos={datosFrecuenciaUso} />
            <GraficaPastel titulo="6. Dispositivo principal" datos={datosDispositivo} />
            <GraficaPastel titulo="7. Disposición a pagar" datos={datosMontoPagar} />
            <GraficaPastel titulo="8. Tipo de pago preferido" datos={datosTipoPago} />
            <GraficaPastel titulo="9. Importancia de la personalización" datos={datosImportanciaPersonalizacion} />
            <GraficaPastel titulo="10. Interés en rutas sugeridas" datos={datosSugerirRutas} />
            <GraficaPastel titulo="11. Interés en historial con IA" datos={datosHistorialIA} />
            <GraficaPastel titulo="12. Importancia del progreso visible" datos={datosImportanciaProgreso} />
            <GraficaPastel titulo="13. Disposición a compartir datos" datos={datosCompartirDatos} />
          </div>
        </div>
      </main>
    );
  }

  // CLIENT DASHBOARD VIEW
  if (userRole === 'client') {
    return (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="absolute top-4 left-4">
                <Button asChild variant="outline">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
                    </Link>
                </Button>
            </div>
            <div className="absolute top-4 right-4">
                <Button onClick={handleLogout} variant="destructive">
                    <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                </Button>
            </div>
            <div className="text-center">
                <h1 className="text-4xl font-bold text-primary">¡Bienvenido, Cliente!</h1>
                <p className="mt-4 text-lg text-foreground/80">Este es tu panel personal.</p>
            </div>
        </main>
    );
  }

  return null;
}
