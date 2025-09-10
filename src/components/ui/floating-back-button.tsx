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
  // - Por defecto (móvil): 'bottom-6 left-6'
  // - En pantallas medianas y más grandes (md:): 'top-20 bottom-auto'
  return (
    <Button
      variant="secondary"
      size="icon"
      className="fixed bottom-6 left-6 md:top-20 md:bottom-auto h-12 w-12 rounded-full shadow-lg z-50"
      onClick={() => router.back()}
      aria-label="Volver a la página anterior"
    >
      
      <ArrowLeft className="h-6 w-6" />
    </Button>
  );
}

