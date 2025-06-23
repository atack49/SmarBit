"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { categoria: "Excelente", cantidad: 40 },
  { categoria: "Buena", cantidad: 25 },
  { categoria: "Regular", cantidad: 15 },
  { categoria: "Mala", cantidad: 5 },
];

export default function EncuestaChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="categoria" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="cantidad" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );
}
