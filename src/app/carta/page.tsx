import type { Metadata } from "next";
import Image from "next/image";
import { foodMenuCategories, foodMenuNotes } from "@/app/data/menu";
import { MenuCategoryNav } from "@/components/features/menu/MenuCategoryNav";
import { MenuCategorySection } from "@/components/features/menu/MenuCategorySection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { ReservationTrigger } from "@/components/features/reservations/ReservationTigger";
export const metadata: Metadata = {
  title: "Carta | Tía María Vallecas",
  description:
    "Consulta la carta de Tía María en Vallecas: tapas, croquetas, raciones, bocadillos, pescados, postres y platos combinados.",
};

export default function MenuPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary text-background">
        <Image
          src="/images/hero-terraza.png"
          alt=""
          fill
          priority
          className="object-cover opacity-25" 
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-primary/65" />
        <Container className="relative py-14 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3rem] text-accent">
              Nuestra carta
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Cocina de siempre para compartir y disfrutar.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-background/75">
              Tapas, croquetas, raciones y platos preparados para disfrutar
              alrededor de la mesa, sin prisas y en buena compañía.
            </p>
          </div>
        </Container>
      </section>
      <Section id="menu-comida" className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[250px_minmax(0,1fr)] lg:items-start">
            <aside className="min-w-0 lg:sticky lg:top-28">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25rem] text-accent">
                Explora la carta
              </p>
              <MenuCategoryNav categories={foodMenuCategories} />
              <div className="mt-8 border-l-2 border-accent pl-5">
                <p className="text-sm leading-6 text-foreground/65">
                  Consulta con nuestro personal cualquier duda sobre alérgenos
                  o ingredientes.
                </p>
              </div>
              <ReservationTrigger
              className="mt-8 w-full justify-center rounded-sm bg-primary px-6 py-3 font-semibold text-background transition-colors hover:bg-primary-hover">
                Reservar mesa
              </ReservationTrigger>
            </aside>
            <main className="min-w-0">
              <div className="mb-10 grid gap-4 sm:grid-cols-2">
                {foodMenuNotes.map((note) => (
                  <div
                    key={note}
                    className="rounded-2xl border border-border bg-primary/5 p-5">
                    <p className="text-sm leading-6 text-foreground/70">
                      {note}
                    </p>
                  </div>
                ))}
              </div>
              <div className="columns-1 gap-8 xl:columns-2">
                {foodMenuCategories.map((category) => (
                  <MenuCategorySection
                    key={category.id}
                    category={category}
                  />
                ))}
              </div>
            </main>
          </div>
        </Container>
      </Section>
    </>
  );
}