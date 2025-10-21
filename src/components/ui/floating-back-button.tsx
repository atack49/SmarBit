"use client"; // Necesario para detectar la ruta actual y usar el router

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function FloatingBackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Si estamos en la página de inicio ('/'), no renderizamos nada.
  if (pathname === '/') {
    return null;
  }

  // En cualquier otra página, mostramos el botón.
  // Las clases de Tailwind se encargan de la posición responsiva:
  // - Por defecto (móvil): botón centrado en la parte inferior
  // - En pantallas medianas en adelante (md+): oculto
  return (
    <Button
      variant="secondary"
      size="icon"
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 md:hidden h-12 w-12 rounded-full shadow-lg z-50 bg-green-500 hover:bg-green-600 text-white"
      onClick={() => router.back()}
      aria-label="Volver a la página anterior"
    >
      <ArrowLeft className="h-6 w-6" />
    </Button>
  );
}

