'use client'
import React from "react";

const AdminPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <section className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Panel de Administración</h1>
        <p className="text-gray-600 text-center mb-6">
          Bienvenido al panel de administrador. Aquí puedes gestionar tu aplicación.
        </p>
        {/* Aquí puedes renderizar módulos, tablas, formularios, etc */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
            Usuarios
          </button>
          <button className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition">
            Reportes
          </button>
        </div>
      </section>
    </main>
  );
};

export default AdminPage;
