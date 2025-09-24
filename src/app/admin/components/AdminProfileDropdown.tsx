"use client";
import React, { useState, useRef, useEffect } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import AdminProfileCard from "./AdminProfileCard";
import { LogOut } from "lucide-react";
import { API_BASE_URL } from "../api/api";

export default function AdminProfileDropdown() {
  const { admin, logout, updateFoto } = useAdminAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!admin) return null;

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
      const res = await fetch(`${API_BASE_URL}/admin/${admin._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foto: base64 }),
      });
      const resData = await res.json();

      if (!res.ok || !resData.foto) {
        setError(resData.message || "No se pudo actualizar la foto.");
        setUploading(false);
        return;
      }

      updateFoto(resData.foto);
    } catch (err) {
      setError("Error de red al subir la foto.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-10 h-10 bg-green-200 flex items-center justify-center text-green-800 font-bold text-lg shadow-md hover:bg-green-300 transition-all focus:outline-none focus:ring-2 focus:ring-green-400 overflow-hidden"
        aria-label="Abrir menú de perfil"
      >
        {admin.foto ? (
          <img
            src={admin.foto}
            alt="Foto de perfil"
            className="w-full h-full object-cover object-center rounded-full"
          />
        ) : (
          <span className="capitalize">{admin.correo.charAt(0)}</span>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-auto min-w-[300px] bg-white rounded-xl shadow-2xl border border-gray-100 animate-fade-in-down z-40"
          style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}
        >
          <div className="p-4">
            <AdminProfileCard
              admin={admin}
              updateFoto={updateFoto}
              uploading={uploading}
              uploadError={error}
              onFileChange={handleFileChange}
            />
          </div>
          <div className="border-t border-gray-100 p-3">
            <button
              onClick={logout}
              className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 font-semibold transition-all justify-center"
            >
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
