import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Lightbulb } from 'lucide-react';
import logo from '@/app/assets/logo.png';

const projectsData = [
  {
    slug: '/projects/myfitguide',
    title: 'MyFitGuide',
    description: 'Aplicación que genera planes de dieta y rutinas de ejercicio personalizados para alcanzar tus objetivos de fitness.',
    tags: ['App Móvil', 'IA', 'Salud', 'Fitness'],
    status: 'published',
  },
  {
    slug: '#',
    title: 'Próximamente',
    description: 'Estamos trabajando en nuevas soluciones de IA para revolucionar el monitoreo de la salud y el bienestar.',
    tags: ['IA', 'Salud', 'Web App'],
    status: 'coming-soon',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h3 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">Nuestros Proyectos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-4xl">
          
          {projectsData.map((project) => (
            project.status === 'published' ? (
              <Link key={project.title} href={project.slug} className="group block">
                <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-primary/10 border-primary/20 p-6">
                  <CardHeader className="p-0">
                      <div className="flex items-center gap-4 mb-2">
                        <Image src={logo} alt="MyFitGuide Logo" width={56} height={56} className="rounded-md" />
                        <CardTitle className="text-2xl text-foreground">{project.title}</CardTitle>
                      </div>
                    <CardDescription className="text-foreground/80">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow mt-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => <Badge key={tag} className="bg-primary/80 text-primary-foreground hover:bg-primary">{tag}</Badge>)}
                    </div>
                  </CardContent>
                  <CardFooter className="p-0 pt-6">
                    <span className="text-sm font-semibold text-primary flex items-center gap-2">
                      Ver Proyecto <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ) : (
              <Card key={project.title} className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50 border-2 border-dashed border-gray-200">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {project.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                    </div>
                </CardContent>
              </Card>
            )
          ))}

        </div>
      </div>
    </section>
  );
}

