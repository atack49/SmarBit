"use client";
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Props {
  initialTab: 'terms' | 'privacy';
  legalContent: any;
}

export default function TermsClient({ initialTab, legalContent }: Props) {
  const [activeTab, setActiveTab] = React.useState<'terms' | 'privacy'>(initialTab);
  const content = legalContent[activeTab];

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-primary mt-1" />
              <div>
                <CardTitle className="text-2xl">{content.title}</CardTitle>
              </div>
            </div>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'terms' | 'privacy')}>
              <TabsList className="grid grid-cols-2 mt-4">
                <TabsTrigger value="terms">Términos y Condiciones</TabsTrigger>
                <TabsTrigger value="privacy">Política de Privacidad</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent className="prose max-w-none">
            <div className="whitespace-pre-wrap text-foreground/90" style={{ textAlign: 'justify' }}>
              {content.fullText}
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={() => window.close()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cerrar
              </Button>
              <div />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
