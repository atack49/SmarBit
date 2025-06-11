"use client";

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { recommendPlaces, type RecommendPlacesInput, type RecommendPlacesOutput } from '@/ai/flows/geographic-recommendations';
import { Loader2, MapPin, LocateFixed } from 'lucide-react';

const geoSchema = z.object({
  latitude: z.coerce.number().min(-90, "Invalid latitude").max(90, "Invalid latitude"),
  longitude: z.coerce.number().min(-180, "Invalid longitude").max(180, "Invalid longitude"),
});

export default function GeographicRecommendationsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [geoResult, setGeoResult] = useState<RecommendPlacesOutput | null>(null);
  const { toast } = useToast();
  const [isLocating, setIsLocating] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<RecommendPlacesInput>({
    resolver: zodResolver(geoSchema),
  });

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue('latitude', position.coords.latitude);
          setValue('longitude', position.coords.longitude);
          setIsLocating(false);
          toast({
            title: "Location Acquired",
            description: "Your current location has been filled in.",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Could not get your location. Please enter manually.",
            variant: "destructive",
          });
          setIsLocating(false);
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser does not support geolocation. Please enter manually.",
        variant: "destructive",
      });
    }
  };


  const onSubmit: SubmitHandler<RecommendPlacesInput> = async (data) => {
    setIsLoading(true);
    setGeoResult(null);
    try {
      const result = await recommendPlaces(data);
      setGeoResult(result);
      toast({
        title: "Recommendations Found!",
        description: "Nearby gyms and healthy food stores are listed below.",
      });
      // Do not reset form here, user might want to adjust coordinates
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
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
          <MapPin className="h-6 w-6 text-primary" />
          Find Nearby Healthy Spots
        </CardTitle>
        <CardDescription>
          Enter your coordinates or use your current location to find gyms and healthy food stores.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                placeholder="e.g., 25.7749"
                {...register('latitude')}
                className={errors.latitude ? 'border-destructive' : ''}
              />
              {errors.latitude && (
                <p className="text-sm text-destructive">{errors.latitude.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                placeholder="e.g., -80.1918"
                {...register('longitude')}
                className={errors.longitude ? 'border-destructive' : ''}
              />
              {errors.longitude && (
                <p className="text-sm text-destructive">{errors.longitude.message}</p>
              )}
            </div>
          </div>
           <Button type="button" variant="outline" onClick={handleUseMyLocation} className="w-full" disabled={isLocating}>
            {isLocating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Location...
              </>
            ) : (
              <>
                <LocateFixed className="mr-2 h-4 w-4" />
                Use My Current Location
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              'Get Recommendations'
            )}
          </Button>
        </CardFooter>
      </form>

      {geoResult && (
        <CardContent className="mt-6 border-t pt-6 space-y-6">
          <div>
            <h3 className="font-headline text-xl font-semibold mb-3">Nearby Gyms:</h3>
            {geoResult.gyms && geoResult.gyms.length > 0 ? (
              <ul className="space-y-3">
                {geoResult.gyms.map((gym, index) => (
                  <li key={`gym-${index}`} className="p-3 bg-muted rounded-md text-sm">
                    <p className="font-semibold text-primary">{gym.name}</p>
                    <p className="text-muted-foreground">{gym.address}</p>
                    <p className="text-xs text-muted-foreground/80">{gym.distance} meters away</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No gyms found nearby.</p>
            )}
          </div>
          <div>
            <h3 className="font-headline text-xl font-semibold mb-3">Nearby Healthy Food Stores:</h3>
            {geoResult.healthyFoodStores && geoResult.healthyFoodStores.length > 0 ? (
              <ul className="space-y-3">
                {geoResult.healthyFoodStores.map((store, index) => (
                  <li key={`store-${index}`} className="p-3 bg-muted rounded-md text-sm">
                    <p className="font-semibold text-primary">{store.name}</p>
                    <p className="text-muted-foreground">{store.address}</p>
                    <p className="text-xs text-muted-foreground/80">{store.distance} meters away</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No healthy food stores found nearby.</p>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
