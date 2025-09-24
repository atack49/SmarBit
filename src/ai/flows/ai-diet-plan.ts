'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized diet plans based on user inputs.
 *
 * @remarks
 * - The flow takes user dietary restrictions, preferences, and health goals as input.
 * - It uses AI to create a personalized diet plan.
 * - It returns the generated diet plan as a string.
 *
 * @interface AIDietPlanInput - The input type for the aiDietPlan function.
 * @interface AIDietPlanOutput - The output type for the aiDietPlan function.
 * @function aiDietPlan - A function that handles the generation of a personalized diet plan.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIDietPlanInputSchema = z.object({
  dietaryRestrictions: z
    .string()
    .describe('Any dietary restrictions the user has (e.g., vegan, gluten-free, allergies).'),
  preferences: z.string().describe('The users food preferences.'),
  healthGoals: z.string().describe('The users health goals (e.g., weight loss, muscle gain).'),
});
export type AIDietPlanInput = z.infer<typeof AIDietPlanInputSchema>;

const AIDietPlanOutputSchema = z.object({
  dietPlan: z.string().describe('A personalized diet plan based on the users inputs.'),
});
export type AIDietPlanOutput = z.infer<typeof AIDietPlanOutputSchema>;

export async function aiDietPlan(input: AIDietPlanInput): Promise<AIDietPlanOutput> {
  return aiDietPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDietPlanPrompt',
  input: {schema: AIDietPlanInputSchema},
  output: {schema: AIDietPlanOutputSchema},
  prompt: `You are a nutritionist. Create a personalized diet plan based on the following information:

Dietary Restrictions: {{{dietaryRestrictions}}}
Preferences: {{{preferences}}}
Health Goals: {{{healthGoals}}}

Diet Plan:`, // Keep newlines
});

const aiDietPlanFlow = ai.defineFlow(
  {
    name: 'aiDietPlanFlow',
    inputSchema: AIDietPlanInputSchema,
    outputSchema: AIDietPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
