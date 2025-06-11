import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react'; // Changed MapPinIcon to MapPin

export default function ContactSection() {
  return ( 
    <section id="contact" className="py-16 md:py-24 bg-background pt-16">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">Contáctanos</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          ¡Nos encantaría saber de ti! Si eres cliente potencial, socio o simplemente tienes curiosidad, no dudes en contactarnos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Datos de contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" /> {/* Changed MapPinIcon to MapPin */}
                <div>
                  <h3 className="font-semibold text-foreground">Dirección</h3>
                  <p className="text-foreground/80">Carretera del Departamento del D.F. km 7.5, Santa María Atarasquillo Municipio de Lerma C. P. 52044.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Teléfono</h3>
                  <p className="text-foreground/80">(305) 336-8728</p>
                  <p className="text-foreground/80">722-355-3743</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-border/40">
                <h3 className="font-semibold text-foreground">Síganos:</h3>
                <Link href="https://instagram.com/smartbithealth" target="_blank" rel="noopener noreferrer" aria-label="SmartBit Instagram">
                  <Instagram className="h-7 w-7 text-foreground/70 hover:text-primary transition-colors" />
                </Link>
                <Link href="https://facebook.com/smartbithealth" target="_blank" rel="noopener noreferrer" aria-label="SmartBit Facebook">
                  <Facebook className="h-7 w-7 text-foreground/70 hover:text-primary transition-colors" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-xl shadow-lg overflow-hidden">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.663220578958!2d-99.47601979999999!3d19.3404149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d20a1464000001%3A0x1c254456341588a0!2sUniversidad%20Tecnol%C3%B3gica%20del%20Valle%20de%20Toluca!5e0!3m2!1ses-419!2smx!4v1749627993658!5m2!1ses-419!2smx" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
