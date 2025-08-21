"use client";
import React, { useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { ShieldCheck, KeyRound } from "lucide-react";

const PRIMARY_GREEN = "#22C55E";

const TokenVerification: React.FC<{ correo: string; onVerified: () => void }> = ({
  correo,
  onVerified,
}) => {
  const { verify, loading, error } = useAdminAuth();
  const [token, setToken] = useState("");
  const [touched, setTouched] = useState(false);

  const tokenValido = token.trim().length >= 4 && token.trim().length <= 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!tokenValido) return;
    const ok = await verify(correo, token);
    if (ok) onVerified();
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
            <ShieldCheck size={34} className="text-green-600" />
          </span>
          <h2 className="text-2xl font-black mb-1 text-green-800 tracking-tight text-center">
            Verificación de cuenta
          </h2>
          <p className="text-gray-500 text-sm font-semibold text-center">
            Ingresa el código enviado a <br />
            <span className="font-bold text-green-700 break-all">{correo}</span>
          </p>
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-600">
            Código de verificación
          </label>
          <div className="flex items-center border rounded-xl px-3 py-2 bg-green-50 focus-within:ring-2 ring-green-300">
            <KeyRound size={18} className="text-green-400 mr-2" />
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-xl font-mono tracking-widest text-center"
              placeholder="123456"
              value={token}
              onChange={e => setToken(e.target.value)}
              required
              maxLength={8}
              autoFocus
              inputMode="numeric"
            />
          </div>
          {touched && !tokenValido && (
            <div className="text-xs text-red-500 mt-1 font-semibold">
              El código debe tener entre 4 y 8 dígitos.
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-2xl shadow-xl transition-all text-lg mt-2 active:scale-95"
          disabled={loading || !tokenValido}
        >
          {loading ? "Verificando..." : "Verificar"}
        </button>
        {error && (
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

export default TokenVerification;
