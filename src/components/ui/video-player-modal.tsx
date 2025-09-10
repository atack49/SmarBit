"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

// Este componente ahora recibe la ruta a tu video local
export function VideoPlayerModal({ children, videoUrl }: { children: React.ReactNode; videoUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0 border-0">
        <DialogHeader className="p-4">
          <DialogTitle>Video Demo de MyFitGuide</DialogTitle>
        </DialogHeader>
        {isOpen && (
            <div className="aspect-video">
              {/* Usamos la etiqueta <video> nativa para control total */}
              <video
                width="100%"
                height="100%"
                controls // Muestra los controles nativos del navegador (limpios, sin marca)
                autoPlay // Inicia el video automáticamente
                playsInline // Importante para la reproducción en móviles
                className="rounded-b-lg"
              >
                <source src={videoUrl} type="video/mp4" />
                Tu navegador no soporta la reproducción de videos.
              </video>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
