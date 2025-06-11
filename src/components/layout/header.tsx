
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { Menu, Download } from 'lucide-react'; 

const navItems = [
  { href: '#about', label: 'Sobre nosotros' },
  { href: '#myfitguide', label: 'MyFitGuide' },
  { href: '#contact', label: 'Contacto' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="SmartBit Home">
          <Image
            src="https://static.wixstatic.com/media/caedac_b35e4d7d01234aa2b1151b08164fecc6~mv2.jpg/v1/fill/w_248,h_122,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/caedac_b35e4d7d01234aa2b1151b08164fecc6~mv2.jpg"
            alt="SmartBit Logo"
            width={248}
            height={122}
            className="h-auto w-32" 
          />
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
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

        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/quick-start"> 
              <Download className="mr-2 h-5 w-5" />
              Descargar App
            </Link>
          </Button>
          <div className="md:hidden">
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
      </div>
    </header>
  );
}
