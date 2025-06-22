"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { aiDietPlan, type AIDietPlanInput, type AIDietPlanOutput } from '@/ai/flows/ai-diet-plan';
import { Loader2, UtensilsCrossed } from 'lucide-react';

const dietPlanSchema = z.object({
  dietaryRestrictions: z.string().min(3, "Por favor describa cualquier restricción dietética."),
  preferences: z.string().min(3, "Por favor, enumere sus preferencias alimentarias."),
  healthGoals: z.string().min(3, "¿Cuales son sus objetivos de salud?"),
});

export default function AIDietPlanForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [dietPlanResult, setDietPlanResult] = useState<AIDietPlanOutput | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AIDietPlanInput>({
    resolver: zodResolver(dietPlanSchema),
  });

  const onSubmit: SubmitHandler<AIDietPlanInput> = async (data) => {
    setIsLoading(true);
    setDietPlanResult(null);
    try {
      const result = await aiDietPlan(data);
      setDietPlanResult(result);
      toast({
        title: "¡Plan de dieta generado!",
        description: "Tu plan de dieta personalizado está listo.",
      });
      reset(); 
    } catch (error) {
      console.error("Error al generar un plan de dieta:", error);
      toast({
        title: "Error",
        description: "No se pudo generar el plan de dieta. Inténtalo de nuevo..",
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
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          Crea tu plan de dieta con IA
        </CardTitle>
        <CardDescription>
        Completa tus datos para obtener un plan de dieta personalizado generado por nuestra IA.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dietaryRestrictions">Restricciones dietéticas</Label>
            <Textarea
              id="dietaryRestrictions"
              placeholder="p. ej., vegano, sin gluten, alergia a los frutos secos"
              {...register('dietaryRestrictions')}
              className={errors.dietaryRestrictions ? 'border-destructive' : ''}
            />
            {errors.dietaryRestrictions && (
              <p className="text-sm text-destructive">{errors.dietaryRestrictions.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferences">Preferencias alimentarias</Label>
            <Textarea
              id="preferences"
              placeholder="p. ej., les encantan las frutas, prefieren el pollo al pescado y no les gusta la comida picante."
              {...register('preferences')}
              className={errors.preferences ? 'border-destructive' : ''}
            />
            {errors.preferences && (
              <p className="text-sm text-destructive">{errors.preferences.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="healthGoals">Objetivos de salud</Label>
            <Textarea
              id="healthGoals"
              placeholder="p. ej., pérdida de peso, ganancia muscular, mantenimiento del peso actual"
              {...register('healthGoals')}
              className={errors.healthGoals ? 'border-destructive' : ''}
            />
            {errors.healthGoals && (
              <p className="text-sm text-destructive">{errors.healthGoals.message}</p>
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
              'Obtener un plan de dieta'
            )}
          </Button>
        </CardFooter>
      </form>
      {dietPlanResult && (
        <CardContent className="mt-6 border-t pt-6">
          <h3 className="font-headline text-xl font-semibold mb-2">Tu plan de dieta personalizado:</h3>
          <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm text-muted-foreground font-body">
            {dietPlanResult.dietPlan}
          </pre>
        </CardContent>
      )}
    </Card>
  );
}
