import React, { useState, useEffect } from "react";
import { QuejaSugerencia } from "../types";
import EstadoBadge from "./EstadoBadge";
import { Mail, UserCircle, Lightbulb, AlertTriangle } from "lucide-react";

const PRIMARY_GREEN = "#22C55E";
const DARK = "#18181b";

type Estado = "nuevo" | "en revisión" | "respondido" | "cerrado";
type Props = {
  open: boolean;
  onClose: () => void;
  data: QuejaSugerencia | null;
  onSubmit: (estado: string, respuesta: string) => Promise<boolean>;
  loading: boolean;
  allowedStates?: Estado[];
  forceSimple?: boolean; // Si true, oculta textarea de respuesta
};

const tipoIcon: Record<string, JSX.Element> = {
  queja: <AlertTriangle style={{ color: "#e11d48" }} size={38} />,
  sugerencia: <Lightbulb style={{ color: PRIMARY_GREEN }} size={38} />,
};

export default function QuejaSugerenciaModal({
  open,
  onClose,
  data,
  onSubmit,
  loading,
  allowedStates,
  forceSimple = false,
}: Props) {
  const [estado, setEstado] = useState<Estado>(data?.estado ?? "nuevo");
  const [respuesta, setRespuesta] = useState(data?.respuesta ?? "");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    setEstado(data?.estado ?? "nuevo");
    setRespuesta(data?.respuesta ?? "");
  }, [data]);

  if (!open || !data) return null;

  const isEditable = data.estado !== "cerrado" && data.estado !== "respondido";
  const isRespondido = estado === "respondido";
  const isRespuestaRequired = isRespondido && !forceSimple;

  // Opciones permitidas (para el inbox solo "en revisión", para la tabla según el flujo)
  const opcionesEstado: Estado[] = allowedStates || [data.estado as Estado];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    const ok = await onSubmit(estado, respuesta);
    setGuardando(false);
    if (ok) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[4px] px-3 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-green-200 p-0 animate-dashboard-pop overflow-hidden ring-2 ring-green-100">
        <header className="flex items-center gap-4 px-8 py-7 bg-gradient-to-r from-white via-green-50 to-white border-b border-green-100 shadow-inner relative">
          <span className="rounded-full bg-white p-2 shadow-xl">{tipoIcon[data.tipo]}</span>
          <div>
            <h3 className="font-extrabold text-2xl capitalize flex items-center gap-2 tracking-wide" style={{ color: DARK }}>
              {data.tipo}
              <EstadoBadge estado={estado} />
            </h3>
            <span className="text-xs font-semibold" style={{ color: "#7f7f7f" }}>
              Categoría: <span className="capitalize" style={{ color: PRIMARY_GREEN }}>{data.categoria}</span>
            </span>
          </div>
          <button
            className="absolute right-7 top-6 text-gray-400 hover:text-green-600 text-2xl font-extrabold transition focus:outline-none"
            onClick={onClose}
            aria-label="Cerrar"
            tabIndex={0}
            type="button"
          >
            ×
          </button>
        </header>

        <div className="px-8 pt-7 pb-8">
          <section className="mb-6">
            <label className="block text-green-600 text-xs font-bold mb-1 tracking-wide">
              Mensaje del usuario
            </label>
            <div className="bg-gradient-to-br from-white via-green-50 to-white border border-green-100 rounded-xl px-5 py-4 text-base font-semibold shadow-md whitespace-pre-line break-words transition-all" style={{ color: DARK }}>
              {data.mensaje}
            </div>
          </section>

          <section className="mb-7 flex flex-wrap items-center gap-4" style={{ color: "#646464" }}>
            <div className="flex items-center gap-1">
              <UserCircle style={{ color: PRIMARY_GREEN }} size={18} />
              <span className="font-medium text-xs">{data.usuarioId ? data.usuarioId : "Usuario anónimo"}</span>
            </div>
            {data.emailContacto && (
              <div className="flex items-center gap-1">
                <Mail style={{ color: PRIMARY_GREEN }} size={17} />
                <span className="text-xs font-semibold">{data.emailContacto}</span>
              </div>
            )}
          </section>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-bold" style={{ color: DARK }}>
                Estado
              </label>
              <select
                className="w-full border border-green-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none text-base bg-white font-semibold transition shadow"
                value={estado}
                onChange={e => setEstado(e.target.value as Estado)}
                disabled={!isEditable || loading || guardando}
                required
              >
                {opcionesEstado.map(e => (
                  <option key={e} value={e}>
                    {e.charAt(0).toUpperCase() + e.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            {!forceSimple && (
              <div>
                <label className="block mb-1 text-sm font-bold" style={{ color: DARK }}>
                  Respuesta
                </label>
                <textarea
                  className="w-full border border-green-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none resize-none bg-white/90 shadow"
                  rows={4}
                  placeholder="Escribe la respuesta para el usuario..."
                  value={respuesta}
                  onChange={e => setRespuesta(e.target.value)}
                  disabled={!isEditable || !isRespondido || loading || guardando}
                  maxLength={1000}
                  required={isRespuestaRequired}
                  style={{ color: DARK }}
                />
                <span className="block text-right text-xs mt-1 font-semibold" style={{ color: "#8bbf92" }}>
                  {respuesta.length}/1000
                </span>
                {isRespuestaRequired && !respuesta.trim() && (
                  <span className="text-red-500 text-xs font-bold">
                    Debes ingresar una respuesta antes de guardar y enviar.
                  </span>
                )}
              </div>
            )}
            <button
              className={`bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl px-4 py-2 w-full font-extrabold mt-2 shadow-2xl tracking-widest text-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-400 active:scale-[.98] ${
                loading || guardando || !isEditable || (isRespuestaRequired && !respuesta.trim())
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }`}
              type="submit"
              disabled={
                loading ||
                guardando ||
                !isEditable ||
                (isRespuestaRequired && !respuesta.trim())
              }
            >
              {(loading || guardando) ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="animate-spin mr-1"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#fff"
                      strokeWidth="4"
                      opacity="0.3"
                    />
                    <path
                      d="M22 12a10 10 0 01-10 10"
                      stroke="#fff"
                      strokeWidth="4"
                    />
                  </svg>
                  Guardando...
                </span>
              ) : "Guardar y Enviar"}
            </button>
          </form>
        </div>
      </div>
      <style jsx global>{`
        @keyframes dashboard-pop {
          0% { opacity: 0; transform: scale(.93);}
          100% { opacity: 1; transform: scale(1);}
        }
        .animate-dashboard-pop { animation: dashboard-pop .19s cubic-bezier(.44,1.3,.49,1);}
        .animate-fade-in { animation: fade-in .14s;}
        @keyframes fade-in {
          0% { opacity: 0;}
          100% { opacity: 1;}
        }
      `}</style>
    </div>
  );
}
