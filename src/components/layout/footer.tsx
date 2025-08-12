import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-screen-2xl flex flex-col items-center justify-between gap-4 py-8 md:flex-row px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-foreground/70">
          © {new Date().getFullYear()} MyFitGuide by SmartBit. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="https://www.instagram.com/my_fit.guide?igsh=eTVuMHk3OXVjZWZw&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="MyFitGuide Instagram">
            <Instagram className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" />
          </Link>
          <Link href="https://www.facebook.com/share/1BnGdHiY7L/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="MyFitGuide Facebook">
            <Facebook className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
