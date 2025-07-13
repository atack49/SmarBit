import React from "react";
import DashboardQuejasSugerencias from "./Dashboard";

type Props = {
  open: boolean;
  onClose: () => void;
  data: any[]; // Usa tu tipo real
};

export default function ModalDashboard({ open, onClose, data }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] px-2 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-gray-100 p-8 animate-dashboard-pop">
        <button
          className="absolute right-5 top-5 text-gray-400 hover:text-blue-600 text-2xl font-extrabold transition focus:outline-none"
          onClick={onClose}
          aria-label="Cerrar dashboard"
          tabIndex={0}
        >
          ×
        </button>
        <DashboardQuejasSugerencias data={data} />
      </div>
      <style jsx global>{`
        @keyframes dashboard-pop {
          0% { opacity: 0; transform: scale(.96);}
          100% { opacity: 1; transform: scale(1);}
        }
        .animate-dashboard-pop { animation: dashboard-pop .18s;}
        .animate-fade-in { animation: fade-in .14s;}
        @keyframes fade-in {
          0% { opacity: 0;}
          100% { opacity: 1;}
        }
      `}</style>
    </div>
  );
}
