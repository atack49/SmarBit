// app/hooks/useQuejaSugerencia.tsx
import { useEffect, useRef, useState, useCallback } from "react";
import { QuejaSugerencia } from "../types";

// Cambia la URL según corresponda a tu API real
const API_URL = "http://localhost:3000/MyFitGuide/queja-sugerencia";

export function useQuejaSugerencia() {
  const [data, setData] = useState<QuejaSugerencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string>("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch de datos principal
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

  // Polling cada 8 segundos (puedes quitarlo si quieres solo manual)
  useEffect(() => {
    fetchData(true);
    intervalRef.current = setInterval(() => fetchData(false), 8000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchData]);

  // Permite forzar el refresh externo
  const refresh = () => fetchData(true);

  // Actualización de queja/sugerencia
  const updateQuejaSugerencia = async (
    id: string,
    estado: string,
    respuesta: string
  ) => {
    setUpdating(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH", // Cambia a PUT si tu backend así lo espera
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado, respuesta }),
      });
      if (!res.ok) {
        // Extrae el mensaje real del backend para debug
        const text = await res.text();
        console.error("Error PATCH:", res.status, text);
        setError(text || "No se pudo actualizar la queja/sugerencia.");
        return false;
      }
      await fetchData(false); // Refresca los datos tras actualizar
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
