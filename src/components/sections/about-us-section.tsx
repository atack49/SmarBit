import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Target, Brain } from 'lucide-react';

export default function AboutUsSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">About SmartBit</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Pioneering AI-driven solutions to transform the health and wellness landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-foreground/90 leading-relaxed">
              SmartBit is a dynamic technology company laser-focused on crafting innovative AI-based software for the health and wellness sector. Our core mission is to develop, commercialize, and meticulously maintain cutting-edge AI software that empowers individuals to achieve their health objectives.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              We believe in the transformative power of artificial intelligence to deliver personalized, effective, and accessible wellness solutions. MyFitGuide is our flagship project, embodying this vision.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <Zap className="w-6 h-6 text-primary" />
                  <CardTitle className="text-lg font-headline">Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/70">Driving health tech forward with AI.</p>
                </CardContent>
              </Card>
              <Card className="bg-accent/10 border-accent/20">
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <Brain className="w-6 h-6 text-accent" />
                  <CardTitle className="text-lg font-headline">Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/70">Personalized plans through smart algorithms.</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/500x350.png"
              alt="SmartBit Team Collaboration"
              width={500}
              height={350}
              className="rounded-xl shadow-lg"
              data-ai-hint="team collaboration"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
