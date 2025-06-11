// src/ai/flows/geographic-recommendations.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for recommending nearby gyms and healthy food stores based on user location.
 *
 * - recommendPlaces - A function that takes user location as input and returns recommendations.
 * - RecommendPlacesInput - The input type for the recommendPlaces function.
 * - RecommendPlacesOutput - The return type for the recommendPlaces function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendPlacesInputSchema = z.object({
  latitude: z.number().describe('The latitude of the user.'),
  longitude: z.number().describe('The longitude of the user.'),
});
export type RecommendPlacesInput = z.infer<typeof RecommendPlacesInputSchema>;

const RecommendPlacesOutputSchema = z.object({
  gyms: z.array(
    z.object({
      name: z.string().describe('The name of the gym.'),
      address: z.string().describe('The address of the gym.'),
      distance: z.number().describe('The distance to the gym in meters.'),
    })
  ).describe('A list of nearby gyms.'),
  healthyFoodStores: z.array(
    z.object({
      name: z.string().describe('The name of the healthy food store.'),
      address: z.string().describe('The address of the healthy food store.'),
      distance: z.number().describe('The distance to the store in meters.'),
    })
  ).describe('A list of nearby healthy food stores.'),
});
export type RecommendPlacesOutput = z.infer<typeof RecommendPlacesOutputSchema>;

export async function recommendPlaces(input: RecommendPlacesInput): Promise<RecommendPlacesOutput> {
  return recommendPlacesFlow(input);
}

const recommendPlacesPrompt = ai.definePrompt({
  name: 'recommendPlacesPrompt',
  input: {schema: RecommendPlacesInputSchema},
  output: {schema: RecommendPlacesOutputSchema},
  prompt: `You are a helpful assistant that recommends nearby gyms and healthy food stores based on the user's current location.

  User Location: Latitude: {{{latitude}}}, Longitude: {{{longitude}}}

  Recommend up to 3 gyms and 3 healthy food stores.
  Include the name, address, and distance in meters for each recommendation.
  `,
});

const recommendPlacesFlow = ai.defineFlow(
  {
    name: 'recommendPlacesFlow',
    inputSchema: RecommendPlacesInputSchema,
    outputSchema: RecommendPlacesOutputSchema,
  },
  async input => {
    const {output} = await recommendPlacesPrompt(input);
    return output!;
  }
);
