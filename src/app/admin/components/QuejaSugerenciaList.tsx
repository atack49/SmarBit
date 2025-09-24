import React from "react";
import { QuejaSugerencia } from "../types/admin.d";
import EstadoBadge from "./EstadoBadge";
import { Lightbulb, AlertTriangle, ChevronRight } from "lucide-react";

type Props = {
  data: QuejaSugerencia[];
  onSelect: (item: QuejaSugerencia) => void;
};

const tipoChip = (tipo: string) =>
  tipo === "queja" ? (
    <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-2 py-1 rounded-xl text-xs font-bold shadow-sm">
      <AlertTriangle className="w-4 h-4" /> Queja
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-600 px-2 py-1 rounded-xl text-xs font-bold shadow-sm">
      <Lightbulb className="w-4 h-4" /> Sugerencia
    </span>
  );

const categoriaChip = (cat: string) => (
  <span className="inline-flex bg-blue-50 text-blue-600 px-2 py-1 rounded-xl text-xs font-semibold capitalize">
    {cat}
  </span>
);

export default function QuejaSugerenciaList({ data, onSelect }: Props) {
  if (!data.length)
    return (
      <div className="py-14 text-center text-gray-400 font-semibold text-lg select-none">
        No hay registros aún.
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-2xl shadow-2xl border border-gray-100 bg-white">
      <table className="min-w-full text-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-200 via-green-100 to-white text-gray-600 uppercase tracking-wider">
            <th className="p-4 text-left rounded-tl-lg">Tipo</th>
            <th className="p-4 text-left">Categoría</th>
            <th className="p-4 text-left">Mensaje</th>
            <th className="p-4 text-left">Estado</th>
            <th className="p-4 text-left rounded-tr-lg">Acción</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              className="border-t border-gray-100 hover:bg-blue-50 hover:shadow-lg transition-all"
            >
              <td className="p-4">{tipoChip(item.tipo)}</td>
              <td className="p-4">{categoriaChip(item.categoria)}</td>
              <td className="p-4 max-w-md whitespace-nowrap overflow-hidden text-ellipsis" title={item.mensaje}>
                <span className="font-medium text-gray-800">{item.mensaje.length > 60 ? item.mensaje.slice(0, 60) + "…" : item.mensaje}</span>
              </td>
              <td className="p-4">
                <EstadoBadge estado={item.estado} />
              </td>
              <td className="p-4">
                <button
                  className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-bold shadow-lg hover:scale-[1.05] hover:from-blue-600 hover:to-green-600 focus:ring-2 focus:ring-blue-300 transition text-xs"
                  onClick={() => onSelect(item)}
                  aria-label="Revisar queja o sugerencia"
                >
                  Revisar
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
