
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form'; // Added Controller
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { generateExercisePlan, type GenerateExercisePlanInput, type GenerateExercisePlanOutput } from '@/ai/flows/ai-exercise-plan';
import { Loader2, Activity } from 'lucide-react';

const exercisePlanSchema = z.object({
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced'], {
    required_error: "Por favor seleccione su nivel de condición física."
  }),
  goals: z.string().min(3, "Por favor describe tus objetivos de fitness."),
  availableEquipment: z.string().min(3, "Enumere el equipo disponible (o 'ninguno')."),
  exerciseDuration: z.string().min(3, "p. ej., 30 minutos, 1 hora"),
  exerciseFrequency: z.string().min(3, "p. ej., 3 veces a la semana, 5 veces a la semana"),
});

export default function AIExercisePlanForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [exercisePlanResult, setExercisePlanResult] = useState<GenerateExercisePlanOutput | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<GenerateExercisePlanInput>({
    resolver: zodResolver(exercisePlanSchema),
  });

  const onSubmit: SubmitHandler<GenerateExercisePlanInput> = async (data) => {
    setIsLoading(true);
    setExercisePlanResult(null);
    try {
      const result = await generateExercisePlan(data);
      setExercisePlanResult(result);
      toast({
        title: "¡Plan de ejercicios generado!",
        description: "Tu plan de ejercicios personalizado está listo.",
      });
      reset();
    } catch (error) {
      console.error("Error al generar el plan de ejercicios:", error);
      toast({
        title: "Error",
        description: "No se pudo generar el plan de ejercicios. Inténtalo de nuevo..",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Activity className="h-6 w-6 text-primary" />
          Crea tu plan de ejercicios de IA
        </CardTitle>
        <CardDescription>
        Proporciona tus datos para una rutina de ejercicios personalizada de nuestra IA.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fitnessLevel">Nivel de condición física</Label>
            <Controller
              name="fitnessLevel"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="fitnessLevel" className={errors.fitnessLevel ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Seleccione su nivel de condición física" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Principiante</SelectItem>
                    <SelectItem value="intermediate">Intermedio</SelectItem>
                    <SelectItem value="advanced">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.fitnessLevel && (
              <p className="text-sm text-destructive">{errors.fitnessLevel.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">Objetivos de fitness</Label>
            <Textarea
              id="goals"
              placeholder="Por ejemplo, pérdida de peso, ganancia muscular, mejora de la resistencia."
              {...register('goals')}
              className={errors.goals ? 'border-destructive' : ''}
            />
            {errors.goals && (
              <p className="text-sm text-destructive">{errors.goals.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="availableEquipment">Equipo disponible</Label>
            <Input
              id="availableEquipment"
              placeholder="p. ej., mancuernas, bandas de resistencia, cinta de correr o 'ninguno'"
              {...register('availableEquipment')}
              className={errors.availableEquipment ? 'border-destructive' : ''}
            />
            {errors.availableEquipment && (
              <p className="text-sm text-destructive">{errors.availableEquipment.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="exerciseDuration">Duración preferida del ejercicio</Label>
            <Input
              id="exerciseDuration"
              placeholder="p. ej., 30 minutos, 1 hora"
              {...register('exerciseDuration')}
              className={errors.exerciseDuration ? 'border-destructive' : ''}
            />
            {errors.exerciseDuration && (
              <p className="text-sm text-destructive">{errors.exerciseDuration.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="exerciseFrequency">Frecuencia de ejercicio preferida</Label>
            <Input
              id="exerciseFrequency"
              placeholder="p. ej., 3 veces a la semana, 5 veces a la semana"
              {...register('exerciseFrequency')}
              className={errors.exerciseFrequency ? 'border-destructive' : ''}
            />
            {errors.exerciseFrequency && (
              <p className="text-sm text-destructive">{errors.exerciseFrequency.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Plan de generación...
              </>
            ) : (
              'Obtener un plan de ejercicios'
            )}
          </Button>
        </CardFooter>
      </form>
      {exercisePlanResult && (
        <CardContent className="mt-6 border-t pt-6">
          <h3 className="font-headline text-xl font-semibold mb-2">Tu plan de ejercicios personalizado:</h3>
          <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm text-muted-foreground font-body">
            {exercisePlanResult.exercisePlan}
          </pre>
        </CardContent>
      )}
    </Card>
  );
}
