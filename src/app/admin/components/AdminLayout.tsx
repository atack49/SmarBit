"use client";
import React, { useState, useEffect } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import AdminLogin from "./AdminLogin";
import TokenVerification from "./TokenVerification";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { admin } = useAdminAuth();
  const [step, setStep] = useState<"login" | "verify" | "panel">("login");

  useEffect(() => {
    if (admin) {
      if (admin.isVerified) setStep("panel");
      else setStep("verify");
    } else {
      setStep("login");
    }
  }, [admin]);

  if (step === "login") return <AdminLogin onSuccess={() => setStep("panel")} />;
  if (step === "verify" && admin) return <TokenVerification correo={admin.correo} onVerified={() => setStep("panel")} />;
  return <>{children}</>;
}
