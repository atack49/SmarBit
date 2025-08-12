
import EncuestaForm from '@/components/forms/EncuestaForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EncuestaPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl">
        <div className="flex justify-start mb-4">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
            </Link>
          </Button>
        </div>
        <EncuestaForm />
      </div>
    </div>
  );
}
