"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
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
    required_error: "Please select your fitness level."
  }),
  goals: z.string().min(3, "Please describe your fitness goals."),
  availableEquipment: z.string().min(3, "List available equipment (or 'none')."),
  exerciseDuration: z.string().min(3, "e.g., 30 minutes, 1 hour"),
  exerciseFrequency: z.string().min(3, "e.g., 3 times a week, 5 times a week"),
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
        title: "Exercise Plan Generated!",
        description: "Your personalized exercise plan is ready.",
      });
      reset();
    } catch (error) {
      console.error("Error generating exercise plan:", error);
      toast({
        title: "Error",
        description: "Failed to generate exercise plan. Please try again.",
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
          Create Your AI Exercise Plan
        </CardTitle>
        <CardDescription>
          Provide your details for a customized exercise routine from our AI.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fitnessLevel">Fitness Level</Label>
            <Controller
              name="fitnessLevel"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="fitnessLevel" className={errors.fitnessLevel ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select fitness level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.fitnessLevel && (
              <p className="text-sm text-destructive">{errors.fitnessLevel.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">Fitness Goals</Label>
            <Textarea
              id="goals"
              placeholder="e.g., weight loss, muscle gain, improve endurance"
              {...register('goals')}
              className={errors.goals ? 'border-destructive' : ''}
            />
            {errors.goals && (
              <p className="text-sm text-destructive">{errors.goals.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="availableEquipment">Available Equipment</Label>
            <Input
              id="availableEquipment"
              placeholder="e.g., dumbbells, resistance bands, treadmill, or 'none'"
              {...register('availableEquipment')}
              className={errors.availableEquipment ? 'border-destructive' : ''}
            />
            {errors.availableEquipment && (
              <p className="text-sm text-destructive">{errors.availableEquipment.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="exerciseDuration">Preferred Exercise Duration</Label>
            <Input
              id="exerciseDuration"
              placeholder="e.g., 30 minutes, 1 hour"
              {...register('exerciseDuration')}
              className={errors.exerciseDuration ? 'border-destructive' : ''}
            />
            {errors.exerciseDuration && (
              <p className="text-sm text-destructive">{errors.exerciseDuration.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="exerciseFrequency">Preferred Exercise Frequency</Label>
            <Input
              id="exerciseFrequency"
              placeholder="e.g., 3 times a week, 5 times a week"
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
                Generating Plan...
              </>
            ) : (
              'Get Exercise Plan'
            )}
          </Button>
        </CardFooter>
      </form>
      {exercisePlanResult && (
        <CardContent className="mt-6 border-t pt-6">
          <h3 className="font-headline text-xl font-semibold mb-2">Your Personalized Exercise Plan:</h3>
          <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm text-muted-foreground font-body">
            {exercisePlanResult.exercisePlan}
          </pre>
        </CardContent>
      )}
    </Card>
  );
}
