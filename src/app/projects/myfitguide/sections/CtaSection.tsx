"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-20 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-primary sm:text-4xl">¿Listo para Empezar?</h2>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          Sigue nuestra guía paso a paso para configurar tu perfil y comenzar tu primera rutina en menos de 5 minutos.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild>
            <Link href="/projects/myfitguide/guiamyfitguide">
              Ver Guía de Inicio Rápido
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}