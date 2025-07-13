import React from "react";
import { QuejaSugerencia } from "../types";
import EstadoBadge from "./EstadoBadge";
import { AlertTriangle, Lightbulb, ChevronRight, Inbox } from "lucide-react";

// Colores branding
const PRIMARY_GREEN = "#22C55E";
const DARK = "#18181b";

type Props = {
  data: QuejaSugerencia[];
  onSelect: (item: QuejaSugerencia) => void;
};

const tipoIcon = (tipo: string) =>
  tipo === "queja" ? (
    <AlertTriangle className="w-5 h-5" style={{ color: "#e11d48" }} /> // rojo tailwind-rose-600
  ) : (
    <Lightbulb className="w-5 h-5" style={{ color: PRIMARY_GREEN }} />
  );

export default function InboxQuejasSugerencias({ data, onSelect }: Props) {
  const nuevos = data
    .filter((item) => item.estado === "nuevo")
    .sort((a, b) =>
      b.createdAt && a.createdAt
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : 0
    );

  if (!nuevos.length) return null;

  return (
    <div
      className="
        fixed z-50
        right-8 bottom-8
        max-w-xs w-[340px] sm:w-[360px]
        rounded-3xl shadow-2xl
        border border-green-200
        bg-white
        ring-2 ring-green-100
        animate-fade-in-fast
        backdrop-blur-xl
        p-0 md:p-0 transition-all
      "
      style={{
        top: "auto",
        left: "auto",
        right: "2rem",
        bottom: "2rem",
      }}
    >
      <div className="flex items-center gap-2 mb-2 px-5 pt-5">
        <span
          className="flex items-center gap-2 font-bold px-3 py-1 rounded-full shadow-xl text-xs"
          style={{
            background: PRIMARY_GREEN,
            color: "#fff",
            letterSpacing: ".04em",
          }}
        >
          <Inbox className="w-4 h-4" />
          {nuevos.length} nuevo{nuevos.length > 1 ? "s" : ""}
        </span>
        <span
          className="font-black tracking-wide text-lg drop-shadow"
          style={{
            color: DARK,
            textShadow: "0 1px 6px #22C55E18",
          }}
        >
          Bandeja de entrada
        </span>
      </div>
      <div className="divide-y divide-green-50">
        {nuevos.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-3 px-5 py-4 last:pb-5 hover:bg-green-50/90 transition group"
          >
            <span>{tipoIcon(item.tipo)}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span
                  className="font-bold text-sm capitalize"
                  style={{ color: DARK }}
                >
                  {item.tipo}
                </span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: PRIMARY_GREEN }}
                >
                  {item.categoria}
                </span>
              </div>
              <span
                className="block text-xs truncate max-w-[160px] sm:max-w-[220px]"
                style={{ color: DARK }}
                title={item.mensaje}
              >
                {item.mensaje}
              </span>
            </div>
            <EstadoBadge estado={item.estado} />
            <button
              onClick={() => onSelect(item)}
              className="ml-2 rounded-full bg-green-100 p-2 hover:bg-green-200 transition"
              aria-label="Revisar"
              tabIndex={0}
            >
              <ChevronRight className="w-4 h-4" style={{ color: PRIMARY_GREEN }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
