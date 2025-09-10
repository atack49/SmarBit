"use client";
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomModal } from '@/components/ui/custom-modal';

// ===================================================================
// ===== INICIO: ORGANIZACIÓN DEL CONTENIDO LEGAL ====================
// ===================================================================
const legalContent = {
  terms: {
    title: "Términos y Condiciones",
    summary: "Al usar MyFitGuide, aceptas que es una herramienta de orientación para hábitos saludables y no un servicio médico. Es crucial que consultes a un profesional de la salud antes de iniciar cualquier plan.",
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
    summary: "Respetamos tu privacidad. Recopilamos la información necesaria para personalizar tus planes, como datos de tu cuenta, actividad y salud. No vendemos tus datos y los protegemos con medidas de seguridad.",
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
// ===================================================================
// ===== FIN: ORGANIZACIÓN DEL CONTENIDO LEGAL =======================
// ===================================================================

export function LegalSection() {
  // Estado para controlar qué pestaña está activa
  const [activeTab, setActiveTab] = React.useState<'terms' | 'privacy'>('terms');
  // Estado para controlar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Contenido actual basado en la pestaña activa
  const currentContent = legalContent[activeTab];

  return (
    <>
      <section className="py-20 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">
              Transparencia y Confianza
            </h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
              Queremos que te sientas seguro usando MyFitGuide. Aquí te explicamos de forma clara cómo funciona nuestra app y el uso que le damos a tu información.
            </p>
          </div>

          <Card className="max-w-3xl mx-auto text-left shadow-lg">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'terms' | 'privacy')} className="w-full">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    {/* El título ahora es dinámico */}
                    <CardTitle className="text-2xl">{currentContent.title}</CardTitle>
                    <CardDescription className="mt-1">Selecciona una sección para ver el resumen.</CardDescription>
                  </div>
                </div>
                <TabsList className="grid w-full grid-cols-2 mt-4">
                  <TabsTrigger value="terms">Términos y Condiciones</TabsTrigger>
                  <TabsTrigger value="privacy">Política de Privacidad</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent>
                {/* El resumen ahora es dinámico */}
                <p className="text-base text-foreground/90 mb-6">
                  {currentContent.summary}
                </p>
                <Button onClick={() => setIsModalOpen(true)}>
                  Leer {activeTab === 'terms' ? 'Términos' : 'Políticas'} Completos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Tabs>
          </Card>

        </div>
      </section>

      {/* El Modal asociado a esta sección */}
       <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeTab={activeTab} // Le pasamos el estado actual
        onTabChange={setActiveTab} // Le pasamos la función para que el modal pueda cambiarlo
      >
        <div className="space-y-4 whitespace-pre-wrap text-foreground/80">
          {/* El contenido que se muestra depende directamente del estado de LegalSection */}
          {legalContent[activeTab].fullText}
        </div>
      </CustomModal>
    </>
  );
}