"use client";
import React, { useRef, useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { Camera, User2 } from "lucide-react";
import { API_BASE_URL } from "../api/api";

export default function AdminProfile() {
  const { admin, updateFoto } = useAdminAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!admin) return null;

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
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
      const res = await fetch(`${API_BASE_URL}/admin/${admin._id}`, {
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

  return (
    <div
      className={`
        flex items-center gap-6 bg-white border border-green-100 rounded-2xl
        shadow-md p-5 mt-2 mb-5 w-full max-w-xl transition-all
      `}
      style={{
        minHeight: "110px",
        marginLeft: 0,
        boxShadow: "0 2px 18px #22c55e11",
      }}
    >
      <div className="relative flex-shrink-0">
        <div
          className="rounded-full w-20 h-20 bg-gradient-to-br from-green-100 via-white to-white flex items-center justify-center border-2 border-green-200 shadow-lg cursor-pointer hover:opacity-90 transition group"
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
            <User2 className="w-14 h-14 text-green-400" />
          )}
          <span className="absolute bottom-1 right-1 bg-green-600 p-1.5 rounded-full shadow text-white group-hover:scale-110 transition">
            <Camera className="w-4 h-4" />
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
      <div className="flex flex-col justify-center">
        <div className="text-lg font-black text-green-900 break-all">{admin.correo}</div>
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
  );
}
