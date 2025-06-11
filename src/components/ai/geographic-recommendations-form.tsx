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
            title: "Ubicación adquirida",
            description: "Tu ubicación actual ha sido completada.",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Error de ubicación",
            description: "No se pudo obtener su ubicación. Por favor, introdúzcala manualmente..",
            variant: "destructive",
          });
          setIsLocating(false);
        }
      );
    } else {
      toast({
        title: "Geolocalización no compatible",
        description: "Su navegador no admite la geolocalización. ¡Introdúzcala manualmente!.",
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
        title: "¡Recomendaciones encontradas!",
        description: "A continuación se enumeran los gimnasios y tiendas de alimentos saludables cercanos.",
      });
      // Do not reset form here, user might want to adjust coordinates
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast({
        title: "Error",
        description: "No se pudieron obtener las recomendaciones. Inténtalo de nuevo..",
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
          Encuentre lugares saludables cercanos
        </CardTitle>
        <CardDescription>
        Ingresa tus coordenadas o utiliza tu ubicación actual para encontrar gimnasios y tiendas de comida saludable.        </CardDescription>
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
                Obtener ubicación...
              </>
            ) : (
              <>
                <LocateFixed className="mr-2 h-4 w-4" />
                Usar mi ubicación actual
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Buscando...
              </>
            ) : (
              'Obtener recomendaciones'
            )}
          </Button>
        </CardFooter>
      </form>

      {geoResult && (
        <CardContent className="mt-6 border-t pt-6 space-y-6">
          <div>
            <h3 className="font-headline text-xl font-semibold mb-3">Gimnasios cercanos:</h3>
            {geoResult.gyms && geoResult.gyms.length > 0 ? (
              <ul className="space-y-3">
                {geoResult.gyms.map((gym, index) => (
                  <li key={`gym-${index}`} className="p-3 bg-muted rounded-md text-sm">
                    <p className="font-semibold text-primary">{gym.name}</p>
                    <p className="text-muted-foreground">{gym.address}</p>
                    <p className="text-xs text-muted-foreground/80">{gym.distance} a metros de distancia</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No se encontraron gimnasios cerca.</p>
            )}
          </div>
          <div>
            <h3 className="font-headline text-xl font-semibold mb-3">Tiendas de alimentos saludables cercanas:</h3>
            {geoResult.healthyFoodStores && geoResult.healthyFoodStores.length > 0 ? (
              <ul className="space-y-3">
                {geoResult.healthyFoodStores.map((store, index) => (
                  <li key={`store-${index}`} className="p-3 bg-muted rounded-md text-sm">
                    <p className="font-semibold text-primary">{store.name}</p>
                    <p className="text-muted-foreground">{store.address}</p>
                    <p className="text-xs text-muted-foreground/80">{store.distance} a metros de distancia</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No se encontraron tiendas de alimentos saludables cerca.</p>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
