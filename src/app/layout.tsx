import type { Metadata } from 'next';
import { Poppins, PT_Sans } from 'next/font/google'; // Método optimizado para fuentes
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/HeaderWrapper'; // 1. Importamos el HeaderWrapper (cliente) que decide mostrar u ocultar el header
import Footer from '@/components/layout/footer'; // 2. Importamos el Footer
import { FloatingBackButton } from '@/components/ui/floating-back-button'; // Se añade la importación del botón

// Configuración de fuentes optimizada
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins', // Opcional: para usar con Tailwind
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans', // Opcional: para usar con Tailwind
});

export const metadata: Metadata = {
  title: 'MyFitGuide "Tú meta, tú plan, tú precio"',
  description: 'Planes de dieta y ejercicio personalizados con IA por MyFitGuide.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${ptSans.variable}`}>
      <body className="font-sans antialiased">
        <div className="flex flex-col min-h-screen">
          <Header /> {/* 3. Añadimos el Header aquí */}
          <main className="flex-grow">
            {children} {/* Aquí se renderiza cada página */}
          </main>
          <Footer /> {/* 4. Añadimos el Footer aquí */}
        </div>
        <FloatingBackButton /> {/* Se añade el botón flotante aquí */}
        <Toaster />
      </body>
    </html>
  );
}

