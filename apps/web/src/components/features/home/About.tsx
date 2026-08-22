import { Container } from "@/components/layout/Container"; 
import { Section } from "@/components/ui/Section";
import Image from "next/image";
import { VenueGallery } from "@/components/features/home/VenueGallery";
export function About(){
  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.5fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3rem] text-accent">
            Nuestra esencia
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-primary">
            Un lugar donde la comida y la tranquilidad se encuentran.
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/80">
          En Tía María creemos que disfrutar de una buena comida es mucho más que sentarse a la mesa. Es compartir momentos, conversar sin prisas y sentirse como en casa.
          </p>
          <p className="mt-4 text-lg leading-8 text-foreground/80">
          Nuestra terraza acristalada y nuestra cocina tradicional crean un ambiente acogedor para desayunar, comer, cenar o simplemente tomar algo en buena compañia.
          </p>
        </div>
        <div className="min-w-0 self-center">
          <VenueGallery/>
        </div>
      </Container>
    </Section>
  );
}