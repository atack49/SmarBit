import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPinIcon, Instagram, Facebook } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">Get In Touch</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you're a potential client, partner, or just curious, feel free to reach out.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPinIcon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Our Address</h3>
                  <p className="text-foreground/80">951 SW 8th St, Miami, Florida, 33130, US</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <p className="text-foreground/80">(305) 336-8728</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Email for Inquiries</h3>
                  <p className="text-foreground/80">
                    <a href="mailto:info@smartbithealth.com" className="hover:text-primary transition-colors">info@smartbithealth.com</a> (Example email)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-border/40">
                <h3 className="font-semibold text-foreground">Follow Us:</h3>
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
             <Image
              src="https://placehold.co/600x450.png"
              alt="Map of Miami location"
              width={600}
              height={450}
              className="w-full h-full object-cover"
              data-ai-hint="map miami"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
