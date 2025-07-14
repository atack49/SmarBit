import React, { useState } from "react";
import { QuejaSugerencia } from "../types";
import EstadoBadge from "./EstadoBadge";
import QuejaSugerenciaModal from "./QuejaSugerenciaModal";
import { AlertTriangle, Lightbulb, ChevronRight, Inbox, ChevronDown, ChevronUp } from "lucide-react";

const PRIMARY_GREEN = "#22C55E";
const DARK = "#18181b";
const PAGE_SIZE = 5; // Elementos por página

// Definición de tipos de estado
type Estado = "nuevo" | "en revisión" | "respondido" | "cerrado";
// Type guard para asegurar arrays de tipo Estado[]
function isEstado(val: string): val is Estado {
  return ["nuevo", "en revisión", "respondido", "cerrado"].includes(val);
}

type Props = {
  data: QuejaSugerencia[];
  onUpdate: (id: string, estado: string, respuesta: string) => Promise<boolean>;
};

// Icono dinámico según tipo de registro
const tipoIcon = (tipo: string) =>
  tipo === "queja" ? (
    <AlertTriangle className="w-5 h-5" style={{ color: "#e11d48" }} />
  ) : (
    <Lightbulb className="w-5 h-5" style={{ color: PRIMARY_GREEN }} />
  );

export default function InboxQuejasSugerencias({ data, onUpdate }: Props) {
  // Solo estado "nuevo"
  const nuevos = data
    .filter((item) => item.estado === "nuevo")
    .sort((a, b) =>
      b.createdAt && a.createdAt
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : 0
    );

  // Estado para abrir/cerrar (minimizar/maximizar)
  const [open, setOpen] = useState(true);
  // Estado de paginación
  const [page, setPage] = useState(0);
  const maxPage = Math.max(0, Math.ceil(nuevos.length / PAGE_SIZE) - 1);
  // Estado para modal
  const [selected, setSelected] = useState<QuejaSugerencia | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Cambio de página resetea selección
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSelected(null);
  };

  // Muestra solo los de la página actual
  const paged = nuevos.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  // Handler para pasar a en revisión
  const handleUpdate = async (estado: string, respuesta: string) => {
    if (!selected) return false;
    setModalLoading(true);
    const ok = await onUpdate(selected._id, estado, respuesta);
    setModalLoading(false);
    if (ok) setSelected(null);
    return ok;
  };

  // Si no hay nada, solo deja el minimizado (badge inbox)
  if (!nuevos.length) {
    return (
      <div
        className="fixed z-50 right-8 bottom-8"
        style={{ right: "2rem", bottom: "2rem" }}
      >
        <button
          className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-2xl font-bold shadow-xl focus:outline-none"
          style={{ letterSpacing: ".04em" }}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Abrir bandeja de entrada"
        >
          <Inbox className="w-5 h-5" />
          Inbox
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        className={`
          fixed z-50
          right-8 bottom-8
          max-w-xs w-[340px] sm:w-[360px]
          rounded-3xl shadow-2xl
          border border-green-200
          bg-white
          ring-2 ring-green-100
          animate-fade-in-fast
          backdrop-blur-xl
          transition-all
          flex flex-col
        `}
        style={{
          right: "2rem",
          bottom: "2rem",
          minHeight: open ? undefined : "0px",
          minWidth: open ? undefined : "90px",
          overflow: "hidden",
        }}
        aria-label="Bandeja de entrada de nuevas quejas o sugerencias"
      >
        {/* Barra de título con botón de minimizar/maximizar */}
        <div className="flex items-center gap-2 px-5 pt-5 pb-2 select-none">
          <button
            className="rounded-full bg-green-100 hover:bg-green-200 p-1 transition"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Minimizar inbox" : "Maximizar inbox"}
            tabIndex={0}
            style={{ outline: "none" }}
          >
            {open ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
          <span
            className="flex items-center gap-2 font-bold px-3 py-1 rounded-full shadow-xl text-xs animate-pulse"
            style={{
              background: PRIMARY_GREEN,
              color: "#fff",
              letterSpacing: ".04em",
            }}
          >
            <Inbox className="w-4 h-4" />
            {nuevos.length} nuevo{nuevos.length > 1 ? "s" : ""}
          </span>
          {open && (
            <span
              className="font-black tracking-wide text-lg drop-shadow"
              style={{
                color: DARK,
                textShadow: "0 1px 6px #22C55E18",
              }}
            >
              Bandeja de entrada
            </span>
          )}
        </div>

        {open && (
          <>
            <div className="divide-y divide-green-50">
              {paged.map((item) => (
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
                    onClick={() => setSelected(item)}
                    className="ml-2 rounded-full bg-green-100 p-2 hover:bg-green-200 transition"
                    aria-label="Revisar queja o sugerencia"
                    tabIndex={0}
                  >
                    <ChevronRight className="w-4 h-4" style={{ color: PRIMARY_GREEN }} />
                  </button>
                </div>
              ))}
            </div>
            {/* Paginador */}
            {maxPage > 0 && (
              <div className="flex justify-center gap-2 py-3">
                <button
                  className={`rounded-full px-2 py-1 font-bold text-sm transition ${
                    page === 0 ? "text-gray-400" : "text-green-700 hover:bg-green-100"
                  }`}
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 0}
                >
                  {"‹"}
                </button>
                <span className="text-xs text-gray-700 px-2 py-1 bg-gray-50 rounded-xl font-semibold">
                  Página {page + 1} de {maxPage + 1}
                </span>
                <button
                  className={`rounded-full px-2 py-1 font-bold text-sm transition ${
                    page === maxPage ? "text-gray-400" : "text-green-700 hover:bg-green-100"
                  }`}
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === maxPage}
                >
                  {"›"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {/* Modal para categorizar a "en revisión" */}
      <QuejaSugerenciaModal
        open={!!selected}
        onClose={() => setSelected(null)}
        data={selected}
        loading={modalLoading}
        onSubmit={handleUpdate}
        allowedStates={
          selected
            ? [selected.estado, "en revisión"]
                .filter(isEstado)
                .filter((s, i, arr) => arr.indexOf(s) === i)
            : []
        }
        forceSimple // Oculta textarea de respuesta
      />
    </>
  );
}
