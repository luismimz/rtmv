import { Container } from "@/components/layout/Container"; 
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { BookOpen } from "lucide-react";

const menuHighlights = [
  {
    category: "Para compartir",
    name: "Raciones y entrantes",
    description:
      "Propuestas tradicionales para comenzar y disfrutar en buena compañía.",
  },
  {
    category: "Nuestra cocina",
    name: "Platos de siempre",
    description:
      "Cocina cercana, sabores reconocibles y productos seleccionados.",
  },
  {
    category: "Para terminar",
    name: "Postres caseros",
    description:
      "El final perfecto para una comida tranquila en Tía María.",
  },
];

export function MenuPreview(){
  return (
    <Section className="bg-primary text-background">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3rem] text-accent">
              Nuestra carta
            </p>
            <h2 className="mt-4 max-w-lg font-serif text-4xl font-semibold leading-tight">
              Cocina tradicional para disfrutar sin prisas.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-background/75">
            Una carta pensada para compartir, descubrir sabores de siempre y disfrutar alrededor de la mesa.</p>
            <Button href="/carta" icon={BookOpen} 
            className="mt-8 rounded-sm border border-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:text-primary">
              Ver nuestra carta
            </Button>
          </div>
          <div className="grid gap-12 sm:grid-cols-3 my-auto">
            {menuHighlights.map((item)=>(
              <article
              key={item.name}
              className="border-t border-background/25 pt-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2rem] text-accent">
                  {item.category}
                </p>
                <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-background">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-backgound/70">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}