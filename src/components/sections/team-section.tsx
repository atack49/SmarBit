import Image from 'next/image';
import teamImage from '@/app/assets/team.jpg';

export default function TeamSection() {
  const team = [
    { name: 'Osorio Lopez Diego Alberto', role: 'Líder de proyecto y Desarrollador móvil' },
    { name: 'Rodríguez Albarrán Zereh Alondra', role: 'Project Manager' },
    { name: 'Rueda Hernández Paola Itzel', role: 'Desarrollador backend' },
    { name: 'Rosales García Kevin Yael', role: 'Desarrollador web' },
    { name: 'Vélez Méndez Jorge Alberto', role: 'Administrador de base de datos' },
    { name: 'Mercado Sierra Francisco Axel', role: 'Auxiliar desarrollador web' },
    { name: 'Esquivel Reyes Luis Angel', role: 'Auxiliar administrador de base de datos' },
  ];

  return (
    <div className="mt-16 text-center py-16 md:py-24">
      <h3 className="text-2xl font-headline font-bold text-primary mb-8">Nuestro Equipo</h3>
      <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-10">
        Un equipo de estudiantes apasionados por la tecnología y la innovación, dedicados a crear soluciones que marcan la diferencia.
      </p>
      <div className="flex justify-center mb-10">
        <Image
          src={teamImage}
          alt="MyFitGuide Team"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
        {team.map((member, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <p className="font-semibold text-foreground">{member.name}</p>
            <p className="text-sm text-foreground/70">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
