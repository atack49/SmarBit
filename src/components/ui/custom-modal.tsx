// components/ui/custom-modal.tsx

"use client";

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// El modal ya no necesita saber sobre el contenido.
// Solo necesita saber qué pestaña está activa y cómo cambiarla.
interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'terms' | 'privacy';
  onTabChange: (tab: 'terms' | 'privacy') => void;
  children: React.ReactNode;
}

export function CustomModal({ 
  isOpen, 
  onClose, 
  activeTab, 
  onTabChange, 
  children 
}: CustomModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-xl shadow-2xl w-full max-w-3xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado con Pestañas */}
        <div className="flex justify-between items-center p-6 border-b border-border flex-shrink-0">
          <div className="flex items-baseline gap-4">
            <button
              onClick={() => onTabChange('terms')} // Usa la función pasada por props
              className={cn(
                "transition-all duration-200 ease-in-out",
                activeTab === 'terms'
                  ? 'text-xl font-bold text-primary'
                  : 'text-base font-medium text-muted-foreground hover:text-foreground'
              )}
            >
              Términos y Condiciones
            </button>

            <span className="text-2xl font-light text-border select-none">/</span>

            <button
              onClick={() => onTabChange('privacy')} // Usa la función pasada por props
              className={cn(
                "transition-all duration-200 ease-in-out",
                activeTab === 'privacy'
                  ? 'text-xl font-bold text-primary'
                  : 'text-base font-medium text-muted-foreground hover:text-foreground'
              )}
            >
              Política de Privacidad
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors rounded-full p-1"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Contenido del Modal (con scroll) */}
        <div className="p-6 md:py-2 overflow-y-auto">
          {/* Muestra el contenido que se le pasa directamente */}
          <div style={{ textAlign: 'justify' }}>{children}</div>
        </div>
      </div>
    </div>
  );
}