//Context para guardar el estado global de los inicios de sesion de usuarios
"use client";
import React, { createContext, useContext, useState } from "react";
import { Admin } from "../types/admin.d";

interface AuthContextType {
  admin: Admin | null;
  loading: boolean;
  error: string | null;
  login: (correo: string, contrasena: string) => Promise<boolean>;
  verify: (correo: string, token: string) => Promise<boolean>;
  logout: () => void;
  updateFoto: (url: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "https://myfitguide.duckdns.org/MyFitGuide/admin";

  async function login(correo: string, contrasena: string): Promise<boolean> {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });
      const data = await res.json();
      if (!res.ok || data.status !== 200 || !data.admin) {
        setError(data.message || "Error al iniciar sesión");
        setAdmin(null);
        setLoading(false);
        return false;
      }
      setAdmin({
        _id: data.admin.id ?? data.admin._id,
        correo: data.admin.correo,
        foto: data.admin.foto,
        rol: data.admin.rol,
        isVerified: !!data.admin.isVerified,
      });
      setLoading(false);
      return true;
    } catch (e) {
      setError("Error de red");
      setLoading(false);
      return false;
    }
  }

  async function verify(correo: string, token: string): Promise<boolean> {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, token }),
      });
      const data = await res.json();
      if (!data.verified) {
        setError("Token inválido");
        setLoading(false);
        return false;
      }
      setAdmin((prev) => prev ? { ...prev, isVerified: true } : prev);
      setLoading(false);
      return true;
    } catch (e) {
      setError("Error de red");
      setLoading(false);
      return false;
    }
  }


  function updateFoto(url: string) {
    setAdmin((prev) => prev ? { ...prev, foto: url } : prev);
  }

  function logout() {
    setAdmin(null);
    setError(null);
  }

  return (
    <AuthContext.Provider value={{ admin, loading, error, login, verify, logout, updateFoto }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAdminAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAdminAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
