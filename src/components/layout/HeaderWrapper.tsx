"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './header';

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Oculta el Header por completo para cualquier ruta que comience con /admin
  if (typeof pathname === 'string' && pathname.startsWith('/admin')) {
    return null;
  }

  return <Header />;
}
