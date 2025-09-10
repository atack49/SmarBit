import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { Menu, FileText, Rocket } from 'lucide-react';
import logo from '@/app/assets/smartbit-logo.png'; // Cambiado al logo 'S' de SmartBit

const navItems = [
  { href: '/#projects', label: 'Proyectos' },
  { href: '/#about-us', label: 'Sobre nosotros' },
  { href: '/#contact', label: 'Contacto' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
        {/* Left Section - Logo y Nombre */}
        <div className="flex flex-1 justify-start">
          <Link href="/" className="flex items-center" aria-label="SmartBit Home">
            <Image
              src={logo}
              alt="SmartBit Logo"
              width={40}
              height={40}
              className="h-8 w-auto" // Ajustado para un buen tamaño
            />
            {/* Se aplica un margen negativo y un ajuste vertical sutil */}
            <span className="font-bold text-xl text-foreground -ml-2 relative bottom-px">martBit</span>
          </Link>
        </div>
        
        {/* Center Section (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 justify-center">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Section (Desktop) */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-2">
          <Button asChild variant="outline">
            <Link href="/encuesta">
              <FileText className="mr-2 h-5 w-5" />
              Realizar Encuesta
            </Link>
          </Button>
          <Button asChild>
            <Link href="/projects/myfitguide">
              <Rocket className="mr-2 h-5 w-5" />
              Conoce MyFitGuide
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex-1 flex justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir el menú de navegación</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-6 pt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-lg font-medium text-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/encuesta"
                  className="text-lg font-medium text-foreground hover:text-primary flex items-center"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Realizar Encuesta
                </Link>
                <Link
                  href="/projects/myfitguide"
                  className="text-lg font-medium text-foreground hover:text-primary flex items-center"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Conoce MyFitGuide
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

