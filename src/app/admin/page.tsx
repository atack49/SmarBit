"use client";
import React, { useRef, useState, useMemo } from "react";
import ModalDashboard from "./components/ModalDashboard";
import QuejaSugerenciaList from "./components/QuejaSugerenciaList";
import InboxQuejasSugerencias from "./components/InboxQuejasSugerencias";
import QuejaSugerenciaModal from "./components/QuejaSugerenciaModal";
import Header from "./components/Header";
import { QuejaSugerencia } from "./types/admin.d";
import { useQuejaSugerencia } from "./hooks/useQuejaSugerencia";
import { useAdminAuth } from "./context/AdminAuthContext";
import AdminLogin from "./components/AdminLogin";
import TokenVerification from "./components/TokenVerification";
import { API_BASE_URL } from "./api/api";

const PRIMARY_GREEN = "#22C55E";
const DARK = "#20242a";
const WHITE = "#fff";

export default function AdminPage() {
  const { admin, loading: authLoading, logout, updateFoto } = useAdminAuth();
  const [modalLoading, setModalLoading] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [selected, setSelected] = useState<QuejaSugerencia | null>(null);
  const [verificationPassed, setVerificationPassed] = useState(false);

  const {
    data,
    loading: dataLoading,
    updating,
    error: dataError,
    updateQuejaSugerencia,
    refresh,
  } = useQuejaSugerencia();

  const inbox = useMemo(() => data.filter(q => q.estado === "nuevo"), [data]);
  const listData = useMemo(() => data.filter(q => q.estado !== "nuevo"), [data]);

  const handleUpdate = async (id: string, estado: string, respuesta: string) => {
    setModalLoading(true);
    const ok = await updateQuejaSugerencia(id, estado, respuesta);
    setModalLoading(false);
    if (ok) refresh();
    return ok;
  };

  const handleUpdateTable = async (estado: string, respuesta: string) => {
    if (!selected) return false;
    return handleUpdate(selected._id, estado, respuesta);
  };

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin border-4 border-green-200 border-t-green-500 rounded-full w-12 h-12 mb-4"></div>
        <div className="text-lg font-semibold text-gray-700">Cargando autenticación...</div>
      </div>
    );
  }

  if (!admin) {
    return <AdminLogin onSuccess={() => {}} />;
  }

  if (!admin.isVerified && !verificationPassed) {
    return (
      <TokenVerification
        correo={admin.correo}
        onVerified={() => setVerificationPassed(true)}
      />
    );
  }

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: `linear-gradient(135deg, ${WHITE} 70%, ${PRIMARY_GREEN}1c 100%)`,
        minHeight: "100vh",
      }}
    >
      <Header
        data={data}
        dashboardOpen={dashboardOpen}
        setDashboardOpen={setDashboardOpen}
        logout={logout}
      />

      <InboxQuejasSugerencias data={inbox} onUpdate={handleUpdate} />

      <main className="max-w-4xl mx-auto px-2 sm:px-8 pb-24 pt-24">
        {dataError && (
          <div className="p-3 mb-3 rounded-xl font-medium text-center animate-pulse shadow bg-red-50 text-red-700">
            {dataError}
          </div>
        )}
        {dataLoading ? (
          <div className="flex justify-center items-center py-28 animate-fade-in-fast">
            <svg className="animate-spin mr-2" width="38" height="38" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="#b4e9c1" strokeWidth="4" opacity="0.25" />
              <path d="M22 12a10 10 0 01-10 10" stroke={PRIMARY_GREEN} strokeWidth="4" />
            </svg>
            <span className="font-bold text-lg" style={{ color: DARK }}>
              Cargando datos...
            </span>
          </div>
        ) : (
          <div
            className="rounded-3xl shadow-2xl border border-gray-100 px-3 py-5 sm:py-10 transition-all bg-white"
            style={{
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              backdropFilter: "none",
            }}
          >
            {updating && (
              <div className="flex items-center gap-2 mb-2 text-xs font-medium animate-pulse text-green-600">
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
      />

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