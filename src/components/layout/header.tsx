import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { Menu, Download, FileText } from 'lucide-react';
import logo from '@/app/assets/myfitguide-logo.png';

const navItems = [
  { href: '/#myfitguide', label: 'MyFitGuide' },
  { href: '/#about', label: 'Sobre nosotros' },
  { href: '/#contact', label: 'Contacto' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex flex-1 justify-start">
          <Link href="/" className="flex items-center gap-2" aria-label="MyFitGuide Home">
            <Image
              src={logo}
              alt="MyFitGuide Logo"
              width={128}
              height={128}
              className="h-10 w-auto"
            />
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
          <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <Link href="/encuesta">
              <FileText className="mr-2 h-5 w-5" />
              Realizar Encuesta
            </Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/quick-start">
              <Download className="mr-2 h-5 w-5" />
              Descargar App
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
                {/* Mobile Nav Links */}
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
                  href="/quick-start"
                  className="text-lg font-medium text-foreground hover:text-primary flex items-center"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Descargar App
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
