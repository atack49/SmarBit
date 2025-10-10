"use client";
import React, { useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

const PRIMARY_GREEN = "#22C55E";

const AdminLogin: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { login, error, loading } = useAdminAuth();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const ok = await login(correo, contrasena);
    if (ok) onSuccess();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-green-100 via-white to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-green-100 flex flex-col gap-7 animate-fade-in"
        autoComplete="off"
      >
        <div className="flex flex-col items-center mb-2">
          <span className="rounded-full bg-green-100 p-4 mb-3 shadow">
            <Lock size={34} className="text-green-600" />
          </span>
          <h2 className="text-3xl font-black mb-1 text-green-800 tracking-tight text-center">
            Acceso Administrador
          </h2>
          <p className="text-gray-500 text-sm font-semibold text-center">
            Ingresa tus credenciales para acceder al panel
          </p>
        </div>
        <div className="flex flex-col gap-3">

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">
              Correo electrónico
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 bg-green-50 focus-within:ring-2 ring-green-300">
              <Mail size={18} className="text-green-400 mr-2" />
              <input
                type="email"
                className="flex-1 bg-transparent outline-none text-base"
                placeholder="ejemplo@email.com"
                value={correo}
                onChange={e => setCorreo(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">
              Contraseña
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 bg-green-50 focus-within:ring-2 ring-green-300">
              <Lock size={18} className="text-green-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                className="flex-1 bg-transparent outline-none text-base"
                placeholder="********"
                value={contrasena}
                onChange={e => setContrasena(e.target.value)}
                required
                autoComplete="off"
              />
              <button
                type="button"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="ml-2 p-1 focus:outline-none"
                tabIndex={-1}
                onClick={() => setShowPassword(prev => !prev)}
                style={{ background: "none" }}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-green-400" />
                ) : (
                  <Eye size={18} className="text-green-400" />
                )}
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-2xl shadow-xl transition-all text-lg mt-3 active:scale-95"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        {/* Muestra errores solo si ya se intentó loguear */}
        {touched && error && (
          <div className="text-center text-red-600 font-semibold text-sm mt-2 animate-pulse">
            {error}
          </div>
        )}
      </form>
      <style jsx global>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: scale(.97);}
          100% { opacity: 1; transform: scale(1);}
        }
        .animate-fade-in { animation: fade-in .2s;}
      `}</style>
    </div>
  );
};

export default AdminLogin;
