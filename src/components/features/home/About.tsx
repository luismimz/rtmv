import { Container } from "@/components/layout/Container"; 
import { Section } from "@/components/ui/Section";
import { VenueGallery } from "@/components/features/home/VenueGallery";
import { siteContent } from "@/app/data/site-content";
export function About(){
  const { about } = siteContent.copy;
  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.5fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3rem] text-accent">
            {about.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-primary">
            {about.headline}
          </h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-lg leading-8 text-foreground/80">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="min-w-0 self-center">
          <VenueGallery/>
        </div>
      </Container>
    </Section>
  );
}