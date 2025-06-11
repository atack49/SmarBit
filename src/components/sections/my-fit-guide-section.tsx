import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AIDietPlanForm from "@/components/ai/ai-diet-plan-form";
import AIExercisePlanForm from "@/components/ai/ai-exercise-plan-form";
import GeographicRecommendationsForm from "@/components/ai/geographic-recommendations-form";
import { Lightbulb, DollarSign, Smartphone, CheckCircle } from "lucide-react";

export default function MyFitGuideSection() {
  return (
    <section id="myfitguide" className="py-16 md:py-24 bg-primary/5">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">Meet MyFitGuide</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            SmartBit's flagship AI-powered application designed to be your ultimate partner in achieving your health and wellness aspirations.
          </p>
        </div>

        <Tabs defaultValue="diet" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 max-w-2xl mx-auto h-auto sm:h-12 mb-8">
            <TabsTrigger value="diet" className="py-2.5">AI Diet Plan</TabsTrigger>
            <TabsTrigger value="exercise" className="py-2.5">AI Exercise Plan</TabsTrigger>
            <TabsTrigger value="geo" className="py-2.5">Local Spots</TabsTrigger>
          </TabsList>
          
          <TabsContent value="diet">
            <AIDietPlanForm />
          </TabsContent>
          <TabsContent value="exercise">
            <AIExercisePlanForm />
          </TabsContent>
          <TabsContent value="geo">
            <GeographicRecommendationsForm />
          </TabsContent>
        </Tabs>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-xl text-primary">
                <Lightbulb className="h-6 w-6" />
                AI-Powered Personalization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                MyFitGuide utilizes advanced artificial intelligence to create diet and exercise plans that are truly tailored to your individual needs, preferences, and goals. Experience a new level of personalization in your fitness journey.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-xl text-primary">
                <DollarSign className="h-6 w-6" />
                Budget-Friendly Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                We understand that budget is a key consideration. MyFitGuide is designed to help you adjust your plans according to your financial needs, ensuring that healthy living is accessible to everyone.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-xl text-primary">
                <Smartphone className="h-6 w-6" />
                Platform Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                MyFitGuide is planned for release on both iOS and Android devices, so you can access your personalized plans anytime, anywhere.
              </p>
            </CardContent>
          </Card>
           <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-xl text-primary">
                <CheckCircle className="h-6 w-6" />
                Access Model
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                Information about MyFitGuide's subscription model or one-time purchase options will be announced closer to launch. Stay tuned for updates!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
