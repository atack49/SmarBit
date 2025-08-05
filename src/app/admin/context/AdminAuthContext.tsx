//Context para guardar el estado global de los inicios de sesion de usuarios
"use client";
import React, { createContext, useContext, useState } from "react";
import { Admin } from "../types/admin.d";

// Definición del tipo para el contexto
interface AuthContextType {
  admin: Admin | null;
  loading: boolean;
  error: string | null;
  login: (correo: string, contrasena: string) => Promise<boolean>;
  verify: (correo: string, token: string) => Promise<boolean>;
  logout: () => void;
  updateFoto: (url: string) => void;
}

// Crea el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Proveedor del contexto de autenticación para admin.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "http://localhost:3000/MyFitGuide/admin";

  /**
   * Login de administrador. Si isVerified es true permite acceso directo,
   * si es false, pedirá el token de verificación.
   */
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
      // Login inválido o error en backend
      if (!res.ok || data.status !== 200 || !data.admin) {
        setError(data.message || "Error al iniciar sesión");
        setAdmin(null);
        setLoading(false);
        return false;
      }
      // Guarda admin en contexto, asegurando el campo isVerified
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

  /**
   * Verifica el token recibido en el correo y actualiza isVerified.
   */
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
      // Si es correcto, actualiza isVerified a true en contexto
      setAdmin((prev) => prev ? { ...prev, isVerified: true } : prev);
      setLoading(false);
      return true;
    } catch (e) {
      setError("Error de red");
      setLoading(false);
      return false;
    }
  }

  /**
   * Actualiza solo la foto del admin en contexto
   */
  function updateFoto(url: string) {
    setAdmin((prev) => prev ? { ...prev, foto: url } : prev);
  }

  /**
   * Cierra sesión y limpia errores
   */
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

/**
 * Hook para consumir el contexto de autenticación de admin.
 */
export function useAdminAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAdminAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
