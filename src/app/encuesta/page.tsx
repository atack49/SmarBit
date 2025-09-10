import EncuestaForm from '@/components/forms/EncuestaForm';

export default function EncuestaPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">
            Tu Opinión es Clave para el Futuro
          </h1>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Esta breve encuesta nos ayudará a validar si MyFitGuide es una solución viable y valiosa para la comunidad. ¡Apreciamos mucho tu tiempo y tus ideas!
          </p>
        </div>
        <EncuestaForm />
      </div>
    </div>
  );
}
