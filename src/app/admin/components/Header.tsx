"use client";
import React from "react";
import Image from "next/image";
import { BarChart3 } from "lucide-react";
import ModalDashboard from "./ModalDashboard";
import { QuejaSugerencia } from "../types/admin.d";
import AdminProfileDropdown from "./AdminProfileDropdown";

const PRIMARY_GREEN = "#22C55E";
const DARK = "#20242a";
const WHITE = "#fff";

interface HeaderProps {
  data: QuejaSugerencia[];
  dashboardOpen: boolean;
  setDashboardOpen: (open: boolean) => void;
  logout: () => void;
}

export default function Header({ data, dashboardOpen, setDashboardOpen, logout }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-center sm:justify-between px-4 py-6 bg-gradient-to-r from-green-50 to-white shadow-lg border-b border-green-100">
      <div className="flex items-center gap-4">
        <Image
          src="/assets/Header.jpg"
          alt="MyFitGuide Logo"
          width={60}
          height={60}
          className="rounded-full shadow-lg border-2 border-green-200 object-cover"
        />
        <div className="flex flex-col items-center sm:items-start">
          <h1
            className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-md"
            style={{ color: DARK, letterSpacing: "-.02em" }}
          >
            MyFit<span style={{ color: PRIMARY_GREEN }}>Guide</span>
          </h1>
          <p className="text-sm font-semibold text-gray-600 mt-1">
            Panel de Quejas y{" "}
            <span style={{ color: PRIMARY_GREEN }}>Sugerencias</span>
          </p>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 flex gap-3 items-center">
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
        <AdminProfileDropdown />
      </div>
      <ModalDashboard
        open={dashboardOpen}
        onClose={() => setDashboardOpen(false)}
        data={data}
      />
    </header>
  );
}
