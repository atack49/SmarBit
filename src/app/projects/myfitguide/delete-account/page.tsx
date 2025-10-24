"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Trash2,
  AlertTriangle,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DeleteAccountGuidePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Trash2 className="h-6 w-6 text-destructive" />
            <CardTitle className="text-2xl">Guía de Eliminación de Cuenta MyFitGuide</CardTitle>
          </div>
          <CardDescription>
            Sigue estos pasos para solicitar la eliminación de tu cuenta desde la aplicación móvil.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start space-x-4 rounded-xl border p-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                1
              </div>
              <div className="flex-grow">
                <div className="flex items-center font-semibold">
                  <MessageCircle className="mr-2 h-5 w-5 text-gray-500" />
                  Ve a Soporte
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Abre la aplicación <strong>MyFitGuide</strong> y navega hasta la sección de <strong>"Soporte MyFitGuide"</strong>, usualmente encontrada en el menú lateral.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-4 rounded-xl border p-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                2
              </div>
              <div className="flex-grow">
                <p className="font-semibold">Rellena el formulario</p>
                <div className="mt-2 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                    <span>Tipo:</span>
                    <ChevronRight className="mx-1 h-4 w-4" />
                    <span className="font-bold">Queja</span>
                  </div>
                  <div className="flex items-center">
                    <Lock className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Categoría:</span>
                    <ChevronRight className="mx-1 h-4 w-4" />
                    <span className="font-bold">Acceso</span>
                  </div>
                  <div>
                    <p className="mb-2"><strong>Mensaje (Obligatorio):</strong> Escribe el motivo, comenzando con la frase exacta:</p>
                    <div className="rounded-md border border-red-200 bg-red-50/70 p-2 font-mono text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                      SOLICITUD DE ELIMINACIÓN DE CUENTA: [Tu correo] y la razón.
                    </div>
                  </div>
                   <p className="pt-2"><strong>Correo Electrónico:</strong> Asegúrate de que el correo de la cuenta a eliminar esté en el campo correspondiente.</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-4 rounded-xl border p-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                3
              </div>
              <div className="flex-grow">
                <div className="flex items-center font-semibold">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                  Enviar Solicitud
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Toca el botón <strong>"Enviar"</strong> para finalizar tu solicitud.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-red-200 bg-red-50/50 p-4 dark:bg-red-900/20">
            <h4 className="mb-3 text-base font-bold text-gray-800 dark:text-gray-100">
              Información Importante (Requisitos de Google Play)
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <strong>Proceso de Solicitud:</strong> La solicitud se realiza siguiendo los pasos anteriores en la app o enviando un correo a <a href="mailto:myfitguide2025@gmail.com" className="text-blue-500 hover:underline">myfitguide2025@gmail.com</a>.
              </li>
              <li>
                <strong>Datos Eliminados:</strong> Se borrarán todos tus datos personales, incluyendo el historial de rutinas y dietas.
              </li>
              <li>
                <strong>Datos Conservados:</strong> Tu correo y la solicitud se guardarán de forma segura por un máximo de 90 días para fines de auditoría y cumplimiento legal.
              </li>
              <li>
                <strong>Tiempo de Procesamiento:</strong> La eliminación se completará en un plazo de 1 a 5 días hábiles.
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/projects/myfitguide/terms?tab=privacy" className="text-sm text-blue-500 hover:underline">
                Consulta nuestra Política de Privacidad para más detalles.
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}