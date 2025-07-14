"use client";
import React, { useState, useEffect } from "react";
import ModalDashboard from "./components/ModalDashboard";
import QuejaSugerenciaList from "./components/QuejaSugerenciaList";
import InboxQuejasSugerencias from "./components/InboxQuejasSugerencias";
import QuejaSugerenciaModal from "./components/QuejaSugerenciaModal";
import { QuejaSugerencia } from "./types";
import { BarChart3 } from "lucide-react";
import { useQuejaSugerencia } from "./hooks/useQuejaSugerencia";

const PRIMARY_GREEN = "#22C55E";
const DARK = "#20242a";
const WHITE = "#fff";

// Polling SOLO para el inbox
function useInboxPolling() {
  const [inbox, setInbox] = useState<QuejaSugerencia[]>([]);
  const API_URL = "http://localhost:3000/MyFitGuide/queja-sugerencia";
  useEffect(() => {
    let active = true;
    async function fetchInbox() {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        if (active) setInbox(json);
      } catch {}
    }
    fetchInbox();
    const interval = setInterval(fetchInbox, 8000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);
  return { inbox };
}

export default function AdminPage() {
  // Hook para la tabla principal
  const {
    data,
    loading,
    updating,
    error,
    updateQuejaSugerencia,
    refresh,
  } = useQuejaSugerencia();

  // Hook para inbox (polling)
  const { inbox } = useInboxPolling();

  // Solo los que NO son "nuevo" para la tabla principal
  const listData = data.filter(q => q.estado !== "nuevo");

  // Estado modal de tabla
  const [selected, setSelected] = useState<QuejaSugerencia | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  // Actualiza estado desde cualquier modal, refresca tabla/inbox
  const handleUpdate = async (id: string, estado: string, respuesta: string) => {
    setModalLoading(true);
    const ok = await updateQuejaSugerencia(id, estado, respuesta);
    setModalLoading(false);
    if (ok) {
      refresh();
    }
    return ok;
  };

  // Para el modal de la tabla principal
  const handleUpdateTable = async (estado: string, respuesta: string) => {
    if (!selected) return false;
    return handleUpdate(selected._id, estado, respuesta);
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: `linear-gradient(135deg, ${WHITE} 70%, ${PRIMARY_GREEN}1c 100%)`,
        minHeight: "100vh",
      }}
    >
      {/* Inbox SOLO para nuevos, categoriza a "en revisión" */}
      <InboxQuejasSugerencias
        data={inbox}
        onUpdate={handleUpdate}
      />

      <header className="sticky top-0 z-30 shadow-md mb-10 bg-white/90 border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-7">
          <h1
            className="text-4xl font-black tracking-tight drop-shadow text-center sm:text-left"
            style={{
              color: DARK,
              letterSpacing: "-.03em",
            }}
          >
            Panel de Quejas y{" "}
            <span style={{ color: PRIMARY_GREEN }}>Sugerencias</span>
          </h1>
          <button
            className="flex gap-2 items-center mt-5 sm:mt-0 px-6 py-2 rounded-2xl font-bold transition text-lg border-2"
            style={{
              background: `linear-gradient(90deg, ${PRIMARY_GREEN} 80%, #15803d 100%)`,
              color: WHITE,
              borderColor: "#16a34a",
              boxShadow: "0 2px 18px #22c55e19",
            }}
            onClick={() => setDashboardOpen(true)}
          >
            <BarChart3 className="w-5 h-5" />
            Dashboard de Quejas
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-2 sm:px-8 pb-24">
        {error && (
          <div
            className="p-3 mb-3 rounded-xl font-medium text-center animate-pulse shadow"
            style={{
              background: "#fff0f1",
              color: "#db2828",
              border: "1px solid #db282830",
            }}
          >
            {error}
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center py-28 animate-fade-in-fast">
            <svg
              className="animate-spin mr-2"
              width="38"
              height="38"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#b4e9c1"
                strokeWidth="4"
                opacity="0.25"
              />
              <path
                d="M22 12a10 10 0 01-10 10"
                stroke={PRIMARY_GREEN}
                strokeWidth="4"
              />
            </svg>
            <span className="font-bold text-lg" style={{ color: DARK }}>
              Cargando datos...
            </span>
          </div>
        ) : (
          <div
            className="rounded-3xl shadow-2xl border border-gray-100 px-3 py-5 sm:py-10 transition-all"
            style={{
              background: "#fff",
              boxShadow: "0 4px 32px #22c55e10",
              backdropFilter: "blur(1.5px)",
            }}
          >
            {updating && (
              <div
                className="flex items-center gap-2 mb-2 text-xs font-medium animate-pulse"
                style={{ color: PRIMARY_GREEN }}
              >
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke={PRIMARY_GREEN}
                    strokeWidth="3"
                    fill="none"
                    opacity="0.3"
                  />
                  <path
                    d="M22 12a10 10 0 01-10 10"
                    stroke={PRIMARY_GREEN}
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
                Actualizando datos...
              </div>
            )}
            <QuejaSugerenciaList data={listData} onSelect={setSelected} />
          </div>
        )}
      </main>

      <QuejaSugerenciaModal
        open={!!selected}
        onClose={() => setSelected(null)}
        data={selected}
        onSubmit={handleUpdateTable}
        loading={modalLoading}
        // allowedStates: sólo permite avanzar según tu lógica (ajusta si necesitas)
      />
      <ModalDashboard open={dashboardOpen} onClose={() => setDashboardOpen(false)} data={data} />

      <style jsx global>{`
        @keyframes fade-in-fast {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-fast {
          animation: fade-in-fast 0.18s;
        }
        ::selection {
          background: #22C55E22;
        }
      `}</style>
    </div>
  );
}
