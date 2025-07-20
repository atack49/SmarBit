import { useEffect, useRef, useState, useCallback } from "react";
import { QuejaSugerencia } from "../types";
import { API_BASE_URL } from "../api/api"; // ✅ Importamos la base URL desde api.ts

const API_URL = `${API_BASE_URL}/queja-sugerencia`; // ✅ Usamos la base URL

export function useQuejaSugerencia() {
  const [data, setData] = useState<QuejaSugerencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string>("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async (showLoader = false) => {
    if (showLoader) setLoading(true);
    else setUpdating(true);
    try {
      setError("");
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al cargar los datos");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError("No se pudo obtener la información.");
    } finally {
      setLoading(false);
      setUpdating(false);
    }
  }, []);

  useEffect(() => {
    fetchData(true);
    intervalRef.current = setInterval(() => fetchData(false), 8000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchData]);

  const refresh = () => fetchData(true);

  const updateQuejaSugerencia = async (
    id: string,
    estado: string,
    respuesta: string
  ) => {
    setUpdating(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado, respuesta }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Error PATCH:", res.status, text);
        setError(text || "No se pudo actualizar la queja/sugerencia.");
        return false;
      }
      await fetchData(false);
      return true;
    } catch (err: any) {
      setError("No se pudo actualizar la queja/sugerencia.");
      return false;
    } finally {
      setUpdating(false);
    }
  };

  return {
    data,
    loading,
    updating,
    error,
    refresh,
    updateQuejaSugerencia,
  };
}
