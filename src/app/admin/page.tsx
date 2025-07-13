"use client";
import React, { useEffect, useState, useRef } from "react";
import ModalDashboard from "./components/ModalDashboard";
import QuejaSugerenciaList from "./components/QuejaSugerenciaList";
import QuejaSugerenciaModal from "./components/QuejaSugerenciaModal";
import InboxQuejasSugerencias from "./components/InboxQuejasSugerencias";
import { QuejaSugerencia } from "./types";
import { BarChart3 } from "lucide-react";

const API_URL = "http://localhost:3000/MyFitGuide/queja-sugerencia";

// COLORES GLOBALES
const PRIMARY_GREEN = "#22C55E";
const DARK = "#20242a";
const WHITE = "#fff";

export default function AdminPage() {
  const [data, setData] = useState<QuejaSugerencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selected, setSelected] = useState<QuejaSugerencia | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState("");
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const prevNuevosRef = useRef<string[]>([]);

  // Polling solo para inbox y tabla, cada 8s
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let mounted = true;
    const fetchData = async (showLoader = false) => {
      if (!mounted) return;
      if (showLoader) setLoading(true);
      else setUpdating(true);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error al cargar los datos");
        const json = await res.json();
        setData(json);

        // Aquí puedes disparar un sonido/toast si hay nuevos
        const nuevosIds = json.filter((q: QuejaSugerencia) => q.estado === "nuevo").map((q: QuejaSugerencia) => q._id);
        prevNuevosRef.current = nuevosIds;
      } catch {
        setError("No se pudo obtener la información.");
      } finally {
        setLoading(false);
        setUpdating(false);
      }
    };

    fetchData(true);
    interval = setInterval(() => fetchData(false), 8000);
    return () => {
      mounted = false;
      if (interval) clearInterval(interval);
    };
  }, []);

  const handleSelect = (item: QuejaSugerencia) => setSelected(item);

  const handleUpdate = async (estado: string, respuesta: string) => {
    if (!selected) return;
    setModalLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/${selected._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado, respuesta }),
      });
      if (!res.ok) throw new Error("Error al actualizar");
      // Refresca los datos después de modificar
      const resData = await fetch(API_URL);
      setData(await resData.json());
      setSelected(null);
    } catch {
      setError("No se pudo actualizar la queja/sugerencia.");
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: `linear-gradient(135deg, ${WHITE} 70%, ${PRIMARY_GREEN}1c 100%)`,
        minHeight: "100vh",
      }}
    >
      <InboxQuejasSugerencias data={data} onSelect={handleSelect} />

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
            <QuejaSugerenciaList data={data} onSelect={handleSelect} />
          </div>
        )}
      </main>

      <QuejaSugerenciaModal
        open={!!selected}
        onClose={() => setSelected(null)}
        data={selected}
        onSubmit={handleUpdate}
        loading={modalLoading}
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
