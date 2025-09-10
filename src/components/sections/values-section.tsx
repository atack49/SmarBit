export default function ValuesSection() {
  const values = [
    { title: "Innovación", description: "Siempre buscamos formas creativas y eficientes de resolver problemas complejos." },
    { title: "Inteligencia", description: "Aplicamos IA para ofrecer soluciones personalizadas y efectivas." },
    { title: "Integridad", description: "Trabajo ético y transparente en todos nuestros proyectos." },
    { title: "Colaboración", description: "El éxito se construye en equipo." },
  ];

  return (
    <div className="py-16 md:py-24  text-center">
      <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl mb-8">Nuestros Valores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {values.map((val, idx) => (
          <div key={idx} className="bg-background p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-primary mb-2">{val.title}</h3>
            <p className="text-foreground/80">{val.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
