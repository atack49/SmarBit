"use client";
import React, { useRef, useState } from "react";
import { Camera, User2 } from "lucide-react";

interface AdminProfileCardProps {
  admin: {
    _id: string;
    correo: string;
    foto?: string;
    rol: string;
  };
  updateFoto: (url: string) => void;
  uploading?: boolean;
  uploadError?: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export default function AdminProfileCard({
  admin,
  updateFoto,
  uploading,
  uploadError, 
  onFileChange, 
}: AdminProfileCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };


  return (
    <div
      className={`flex items-center gap-4 bg-white border border-green-100 rounded-2xl shadow-xl px-4 py-3 transition-all w-full sm:w-auto md:max-w-[370px]`}
      style={{ minHeight: "100px", boxShadow: "0 8px 30px rgba(34, 197, 94, 0.18)" }}
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
          onChange={onFileChange}
          disabled={uploading}
        />
      </div>
      <div className="flex flex-col justify-center flex-1">
        <div className="text-base font-black text-green-900 break-all">{admin.correo}</div>
        <div className="text-sm font-semibold text-green-700 mt-0.5">
          Rol: <span className="text-green-600 font-bold">{admin.rol}</span>
        </div>
        {uploading && (
          <div className="mt-2 text-green-700 font-semibold text-xs animate-pulse">
            Actualizando foto...
          </div>
        )}
        {uploadError && (
          <div className="mt-2 text-red-600 font-semibold text-xs">{uploadError}</div>
        )}
      </div>
    </div>
  );
}
