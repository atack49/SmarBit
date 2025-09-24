'use server';

/**
 * @fileOverview An AI agent to generate personalized exercise plans.
 *
 * - generateExercisePlan - A function that generates a personalized exercise plan.
 * - GenerateExercisePlanInput - The input type for the generateExercisePlan function.
 * - GenerateExercisePlanOutput - The return type for the generateExercisePlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExercisePlanInputSchema = z.object({
  fitnessLevel: z
    .string()
    .describe(
      'The user\u2019s current fitness level (e.g., beginner, intermediate, advanced).'
    ),
  goals: z
    .string()
    .describe(
      'The user\u2019s fitness goals (e.g., weight loss, muscle gain, general fitness).'
    ),
  availableEquipment: z
    .string()
    .describe(
      'The equipment available to the user (e.g., dumbbells, resistance bands, no equipment).'
    ),
  exerciseDuration: z.string().describe('The duration of each exercise session.'),
  exerciseFrequency: z.string().describe('How many times per week to exercise.'),
});
export type GenerateExercisePlanInput = z.infer<typeof GenerateExercisePlanInputSchema>;

const GenerateExercisePlanOutputSchema = z.object({
  exercisePlan: z.string().describe('A personalized exercise plan for the user.'),
});
export type GenerateExercisePlanOutput = z.infer<typeof GenerateExercisePlanOutputSchema>;

export async function generateExercisePlan(
  input: GenerateExercisePlanInput
): Promise<GenerateExercisePlanOutput> {
  return generateExercisePlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExercisePlanPrompt',
  input: {schema: GenerateExercisePlanInputSchema},
  output: {schema: GenerateExercisePlanOutputSchema},
  prompt: `You are an expert personal trainer. Generate a personalized exercise plan for the user based on their fitness level, goals, and available equipment.

Fitness Level: {{{fitnessLevel}}}
Goals: {{{goals}}}
Available Equipment: {{{availableEquipment}}}
Exercise Duration: {{{exerciseDuration}}}
Exercise Frequency: {{{exerciseFrequency}}}

Exercise Plan:`,
});

const generateExercisePlanFlow = ai.defineFlow(
  {
    name: 'generateExercisePlanFlow',
    inputSchema: GenerateExercisePlanInputSchema,
    outputSchema: GenerateExercisePlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
