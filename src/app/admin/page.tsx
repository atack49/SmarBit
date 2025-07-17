"use client";
import React, { useRef, useState } from "react";
import ModalDashboard from "./components/ModalDashboard";
import QuejaSugerenciaList from "./components/QuejaSugerenciaList";
import InboxQuejasSugerencias from "./components/InboxQuejasSugerencias";
import QuejaSugerenciaModal from "./components/QuejaSugerenciaModal";
import { QuejaSugerencia } from "./types";
import { BarChart3, LogOut, Camera, User2 } from "lucide-react";
import { useQuejaSugerencia } from "./hooks/useQuejaSugerencia";
import { useAdminAuth } from "./context/AdminAuthContext";
import AdminLogin from "./components/AdminLogin";
import TokenVerification from "./components/TokenVerification";

const PRIMARY_GREEN = "#22C55E";
const DARK = "#20242a";
const WHITE = "#fff";

export default function AdminPage() {
  const { admin, loading: authLoading, logout, updateFoto } = useAdminAuth();
  const [modalLoading, setModalLoading] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [selected, setSelected] = useState<QuejaSugerencia | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado local para controlar el flujo tras verificación
  const [verificationPassed, setVerificationPassed] = useState(false);

  // Hook para la gestión de quejas/sugerencias
  const {
    data,
    loading: dataLoading,
    updating,
    error: dataError,
    updateQuejaSugerencia,
    refresh,
  } = useQuejaSugerencia();

  const inbox = data.filter(q => q.estado === "nuevo");
  const listData = data.filter(q => q.estado !== "nuevo");

  // ------------------- MANEJO DE FOTO (BASE64) -------------------
  const handlePhotoClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    if (!file.type.startsWith("image/") || file.size > 3 * 1024 * 1024) {
      setError("Selecciona una imagen válida (máx. 3MB)");
      return;
    }

    setUploading(true);

    try {
      const base64 = await fileToBase64(file);
      const res = await fetch(`http://localhost:3000/MyFitGuide/admin/${admin?._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foto: base64 }),
      });
      const data = await res.json();

      if (!res.ok || !data.foto) {
        setError(data.message || "No se pudo actualizar la foto.");
        setUploading(false);
        return;
      }
      updateFoto(data.foto);
    } catch (err) {
      setError("Error de red al subir la foto.");
    } finally {
      setUploading(false);
    }
  };

  // ------------------- FUNCIONES QUE FALTABAN -------------------
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

  // ------------------- AUTENTICACIÓN -------------------
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

  // ------------------- PÁGINA PRINCIPAL -------------------
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: `linear-gradient(135deg, ${WHITE} 70%, ${PRIMARY_GREEN}1c 100%)`,
        minHeight: "100vh",
      }}
    >
      <InboxQuejasSugerencias data={inbox} onUpdate={handleUpdate} />

      <header className="sticky top-0 z-30 shadow-md mb-12 bg-white/90 border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-7 gap-6">
          <h1
            className="text-4xl font-black tracking-tight drop-shadow text-center sm:text-left flex-1"
            style={{
              color: DARK,
              letterSpacing: "-.03em",
            }}
          >
            Panel de Quejas y{" "}
            <span style={{ color: PRIMARY_GREEN }}>Sugerencias</span>
          </h1>
          <div className="flex items-center gap-3">
            <button
              className="flex gap-2 items-center px-6 py-2 rounded-2xl font-bold transition text-lg border-2"
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
            <button
              className="flex gap-2 items-center px-4 py-2 rounded-xl bg-gray-50 hover:bg-red-50 border border-gray-200 font-bold text-gray-700 hover:text-red-600 shadow transition"
              onClick={logout}
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" />
              Salir
            </button>

            {/* ----------- Perfil Admin: EN HEADER, GRANDE, MODERNO ----------- */}
            <div
              className={`
                flex items-center gap-6 bg-white border border-green-100 rounded-2xl
                shadow-md px-5 py-3 ml-4 min-w-[340px] max-w-[370px] transition-all
                relative
              `}
              style={{
                minHeight: "118px",
                boxShadow: "0 2px 18px #22c55e11",
              }}
            >
              <div className="relative flex-shrink-0">
                <div
                  className="rounded-full w-24 h-24 bg-gradient-to-br from-green-100 via-white to-white flex items-center justify-center border-2 border-green-200 shadow-lg cursor-pointer hover:opacity-90 transition group"
                  onClick={handlePhotoClick}
                  title="Cambiar foto de perfil"
                  style={{ overflow: "hidden" }}
                >
                  {admin.foto ? (
                    <img
                      src={admin.foto}
                      alt="Foto de perfil"
                      className="w-full h-full object-cover object-center rounded-full"
                    />
                  ) : (
                    <User2 className="w-16 h-16 text-green-400" />
                  )}
                  <span className="absolute bottom-2 right-2 bg-green-600 p-2 rounded-full shadow text-white group-hover:scale-110 transition">
                    <Camera className="w-5 h-5" />
                  </span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </div>
              <div className="flex flex-col justify-center flex-1 min-w-[120px]">
                <div className="text-base font-black text-green-900 break-all">{admin.correo}</div>
                <div className="text-sm font-semibold text-green-700 mt-0.5">
                  Rol: <span className="text-green-600 font-bold">{admin.rol}</span>
                </div>
                {uploading && (
                  <div className="mt-2 text-green-700 font-semibold text-xs animate-pulse">
                    Actualizando foto...
                  </div>
                )}
                {error && (
                  <div className="mt-2 text-red-600 font-semibold text-xs">{error}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-2 sm:px-8 pb-24">
        {dataError && (
          <div className="p-3 mb-3 rounded-xl font-medium text-center animate-pulse shadow bg-red-50 text-red-700">
            {dataError}
          </div>
        )}
        {dataLoading ? (
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
