//Dashboar para apartado de quejas y sugerencias para el modulo preevisto
import React from "react";
import { QuejaSugerencia } from "../types/admin.d";
import { BarChart3, ClipboardList, CheckCircle2, Eye } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type Estado = "nuevo" | "en revisión" | "respondido" | "cerrado";
type Props = { data: QuejaSugerencia[] };

const estados: Estado[] = ["nuevo", "en revisión", "respondido", "cerrado"];
const estadoStyles: Record<Estado, { bg: string; text: string; ring: string; border: string }> = {
  "nuevo": { bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-300", border: "border-blue-300" },
  "en revisión": { bg: "bg-yellow-50", text: "text-yellow-800", ring: "ring-yellow-200", border: "border-yellow-200" },
  "respondido": { bg: "bg-green-50", text: "text-green-700", ring: "ring-green-300", border: "border-green-300" },
  "cerrado": { bg: "bg-gray-100", text: "text-gray-700", ring: "ring-gray-300", border: "border-gray-300" },
};
const estadoLabels: Record<Estado, string> = {
  "nuevo": "Nuevos",
  "en revisión": "En Revisión",
  "respondido": "Respondidos",
  "cerrado": "Cerrados",
};
const estadoIcons: Record<Estado, JSX.Element> = {
  "nuevo": <ClipboardList size={36} className="text-blue-500 drop-shadow-sm" />,
  "en revisión": <Eye size={36} className="text-yellow-500 drop-shadow-sm" />,
  "respondido": <CheckCircle2 size={36} className="text-green-600 drop-shadow-sm" />,
  "cerrado": <BarChart3 size={36} className="text-gray-400 drop-shadow-sm" />,
};
const pieColors: Record<Estado, string> = {
  "nuevo": "#3B82F6",
  "en revisión": "#EAB308",
  "respondido": "#22C55E",
  "cerrado": "#6B7280",
};

export default function DashboardQuejasSugerencias({ data }: Props) {
  const resumen: Record<Estado, number> = {
    "nuevo": 0,
    "en revisión": 0,
    "respondido": 0,
    "cerrado": 0,
  };
  data.forEach((q) => {
    if (estados.includes(q.estado as Estado)) {
      resumen[q.estado as Estado]++;
    } else {
      resumen["cerrado"]++;
    }
  });
  const total = estados.reduce((acc, k) => acc + resumen[k], 0);
  const pieData = estados.map((estado) => ({
    name: estadoLabels[estado],
    value: resumen[estado],
    color: pieColors[estado],
    estado,
  }));

  return (
    <section className="mb-10">
      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {estados.map((estado) => (
          <div
            key={estado}
            className={`flex flex-col items-center p-6 rounded-2xl shadow-lg bg-white border-t-4 ${estadoStyles[estado].border} ring-1 ${estadoStyles[estado].ring} transition-all hover:-translate-y-1 hover:shadow-2xl`}
          >
            <div className="mb-2">{estadoIcons[estado]}</div>
            <div className={`text-4xl font-extrabold mb-1 ${estadoStyles[estado].text}`}>{resumen[estado]}</div>
            <div className="text-base font-semibold text-gray-500">{estadoLabels[estado]}</div>
            <div className={`mt-3 px-3 py-1 rounded-full text-xs font-bold bg-white/95 ${estadoStyles[estado].text} border ${estadoStyles[estado].border} shadow-sm`}>
              {((resumen[estado] / (total || 1)) * 100).toFixed(0)}%
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-7 shadow-xl border mx-auto max-w-3xl">
        <h3 className="text-lg font-bold mb-2 text-center text-gray-800">Distribución de Estados</h3>
        <div className="flex flex-col md:flex-row items-center gap-7">
          <div className="w-full md:w-2/3" style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  labelLine={false}
                  label={({ name, percent }) =>
                    percent > 0 ? `${name} (${(percent * 100).toFixed(0)}%)` : ""
                  }
                  isAnimationActive
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.estado} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 14,
                    boxShadow: "0 2px 12px #0001",
                    fontSize: "1rem",
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                  }}
                  formatter={(value: number, name: string) => [`${value} casos`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="w-full md:w-1/3 grid grid-cols-2 gap-3">
            {pieData.map((d) => (
              <li key={d.estado} className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-gray-50 transition">
                <span
                  className="inline-block w-4 h-4 rounded-full border"
                  style={{ backgroundColor: d.color, borderColor: "#fff" }}
                ></span>
                <span className="text-sm font-semibold text-gray-700">{d.name}</span>
                <span className="ml-auto text-sm font-black text-gray-600">{d.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
