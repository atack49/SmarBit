"use client";
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const legalContent = {
  terms: {
    title: "Términos y Condiciones",
    fullText: `
MyFitGuide es una aplicación móvil desarrollada por SmartBit, cuyo objetivo es ofrecer planes de alimentación y rutinas de ejercicio personalizadas para fomentar hábitos saludables. Al utilizar esta aplicación, usted acepta cumplir con los presentes Términos y Condiciones. Si no está de acuerdo con alguno de los puntos aquí descritos, le solicitamos que no utilice la aplicación.

1. Objeto del Servicio
· MyFitGuide no es un servicio médico y no sustituye la consulta, diagnóstico o tratamiento de un profesional de la salud.
· Los planes, rutinas y sugerencias ofrecidas son orientaciones generales para personas sanas y no constituyen prescripción médica.
· Los resultados pueden variar según cada persona y no se garantiza pérdida de peso, ganancia muscular u otros objetivos físicos.

2. Requisitos para el Uso
Para utilizar esta aplicación, usted declara y garantiza que:
1. Tiene entre 18 y 30 años.
2. No padece diabetes, enfermedades cardiovasculares, enfermedades renales, trastornos alimenticios, cáncer, hipertensión grave, enfermedades respiratorias graves u otras condiciones crónicas o agudas que requieran atención médica especializada.
3. No se encuentra embarazada ni en periodo de lactancia.
4. Se encuentra en condiciones físicas adecuadas para realizar actividad física.
5. Ha consultado, o consultará, a un médico antes de iniciar cualquier plan de dieta o ejercicio sugerido por la aplicación.

3. Limitación de Responsabilidad
· El uso de la aplicación es bajo su propio riesgo.
· MyFitGuide y sus desarrolladores no asumen responsabilidad por lesiones, complicaciones, reacciones adversas o daños derivados de la implementación de los planes o rutinas sugeridas.
· MyFitGuide no se responsabiliza por el acceso o uso de gimnasios o parques recomendados, ni por incidentes ocurridos en los mismos.
· El usuario asume toda responsabilidad sobre su salud y condición física al utilizar el servicio.
· Los precios de los alimentos pueden variar, por lo que la aplicación no garantiza que el costo estimado de la dieta sugerida sea siempre exacto.

4. Indemnización
Usted acepta defender, indemnizar y eximir de responsabilidad a SmartBit y sus afiliados, funcionarios, agentes y empleados de cualquier reclamo, demanda, daño, obligación, pérdida, responsabilidad, costo o deuda, y gastos (incluyendo, pero no limitado a, honorarios de abogados) que surjan de:
a) Su uso de la aplicación y el acceso a ella, incluido cualquier dato o contenido transmitido o recibido por usted.
b) Su violación de cualquiera de estos Términos.
c) Su violación de los derechos de un tercero, incluido, sin limitación, cualquier derecho de privacidad o de propiedad intelectual.
d) Su violación de cualquier ley, norma o regulación aplicable.

5. Uso Adecuado de la Aplicación
El usuario se compromete a:
· Proporcionar información veraz y actualizada sobre su estado de salud.
· No utilizar la aplicación si no cumple con los requisitos del punto 2.
· Usar la aplicación únicamente para fines personales y no comerciales.

6. Propiedad Intelectual
Todo el contenido, diseño, algoritmos y material de MyFitGuide son propiedad exclusiva de SmartBit. Queda prohibida su reproducción, distribución, modificación o uso comercial sin consentimiento previo y por escrito.

7. Suspensión o Eliminación de Cuentas
SmartBit se reserva el derecho de suspender o eliminar cuentas que incumplan estos términos, sin previo aviso y sin responsabilidad alguna.

8. Modificaciones del Servicio
MyFitGuide y SmartBit pueden modificar, actualizar o suspender el servicio en cualquier momento.

9. Cambios en los Términos
Nos reservamos el derecho de modificar estos Términos en cualquier momento. Si un cambio es sustancial, se notificará a través de la aplicación o por correo electrónico. Al continuar utilizando MyFitGuide después de que los cambios entren en vigor, usted acepta estar sujeto a los nuevos términos.

10. Protección de Datos
El tratamiento de datos personales se regirá por la Política de Privacidad disponible dentro de la aplicación.

11. Contacto
Para consultas o reclamaciones, puede comunicarse a:
Email: myfitguide2025@gmail.com
    `
  },
  privacy: {
    title: "Política de Privacidad",
    fullText: `
En MyFitGuide respetamos su privacidad. Por lo que en esta Política explica cómo recopilamos, usamos, protegemos y compartimos su información personal cuando utiliza nuestra aplicación.

1. Información que Recopilamos
· Información de la cuenta: Cuando se registra, recopilamos información como su nombre, dirección de correo electrónico y contraseña.
· Datos de actividad física y salud: Podemos recopilar datos sobre su peso, altura, edad, género, objetivos de fitness, actividades de entrenamiento, hábitos alimenticios y cualquier otra información que decida compartir para personalizar su experiencia.
· Datos de ubicación: Con su consentimiento, podemos recopilar datos de su ubicación para proporcionar funciones como la búsqueda de gimnasios y parques cercanos.
· Información técnica: Recopilamos información sobre el dispositivo que utiliza, el tipo de sistema operativo, la dirección IP, el identificador del dispositivo y datos de diagnóstico para mejorar el rendimiento de la aplicación.
· Información de uso: Recopilamos datos sobre cómo interactúa con la aplicación, las funciones que utiliza y el tiempo que pasa en ella para entender mejor cómo podemos mejorarla.

2. Finalidad del Tratamiento de Datos
Utilizamos la información recopilada para:
· Crear planes de alimentación y rutinas personalizadas.
· Mejorar el rendimiento y funcionalidad de la aplicación.
· Enviar notificaciones y recordatorios relacionados con su plan.
· Atender consultas y solicitudes del usuario.
· Cumplir obligaciones legales.

3. Protección de Datos
· Implementamos medidas de seguridad para proteger su información contra accesos no autorizados, pérdida, alteración o divulgación indebida.
· El acceso a sus datos está limitado únicamente al personal autorizado.

4. Compartición de Datos
No vendemos ni alquilamos sus datos personales. Podemos compartir información únicamente en estos casos:
· Con proveedores de servicios necesarios para el funcionamiento de la app (ej. servidores).
· Por requerimiento legal o autoridad competente.

5. Derechos del Usuario
Usted puede:
· Acceder a sus datos personales.
· Solicitar su eliminación cuando ya no sean necesarios para los fines establecidos.
· Retirar su consentimiento para el tratamiento de datos.

6. Retención de Datos
Mantendremos sus datos personales únicamente por el tiempo necesario para cumplir con las finalidades descritas en esta Política, salvo que la ley requiera un periodo mayor.

7. Uso por Menores de Edad
La aplicación está destinada exclusivamente a personas entre 18 y 30 años. No recopilamos información de menores de edad de manera intencional.

8. Cambios a esta Política
Podemos actualizar esta Política de Privacidad en cualquier momento. Los cambios se publicarán en esta sección con la fecha de última modificación.

9. Contacto
Para dudas o solicitudes relacionadas con esta Política de Privacidad, puede contactarnos en: myfitguide2025@gmail.com
    `
  }
};

export default function TermsPage() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams?.get('tab') === 'privacy') ? 'privacy' : 'terms';
  const [activeTab, setActiveTab] = React.useState<'terms' | 'privacy'>(initialTab);

  const content = legalContent[activeTab];

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-primary mt-1" />
              <div>
                <CardTitle className="text-2xl">{content.title}</CardTitle>
              </div>
            </div>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'terms' | 'privacy')}>
              <TabsList className="grid grid-cols-2 mt-4">
                <TabsTrigger value="terms">Términos y Condiciones</TabsTrigger>
                <TabsTrigger value="privacy">Política de Privacidad</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent className="prose max-w-none">
            <div className="whitespace-pre-wrap text-foreground/90" style={{ textAlign: 'justify' }}>
              {content.fullText}
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={() => window.close()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cerrar
              </Button>
              <div />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
