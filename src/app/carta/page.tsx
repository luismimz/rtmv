import type { Metadata } from "next";
import Image from "next/image";
import { foodMenuCategories, foodMenuNotes, drinkMenuCategories } from "@/app/data/menu";
import { MenuTabs } from "@/components/features/menu/MenuTabs";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { siteContent } from "@/app/data/site-content";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

export const metadata: Metadata = buildPageMetadata(
  siteContent.seo.pages.carta,
  "/carta",
);

export default function MenuPage() {
  const { cartaPage } = siteContent.copy;
  const { cartaHeader } = siteContent.images;
  return (
    <>
      <section className="relative overflow-hidden bg-primary text-background">
        <Image
          src={cartaHeader.src}
          alt={cartaHeader.alt}
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-primary/65" />
        <Container className="relative py-14 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3rem] text-accent">
              {cartaPage.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {cartaPage.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-background/75">
              {cartaPage.subheadline}
            </p>
          </div>
        </Container>
      </section>
      <Section id="menu-comida" className="py-12 sm:py-16 lg:py-20">
        <Container>
          <MenuTabs
            foodCategories={foodMenuCategories}
            drinkCategories={drinkMenuCategories}
            notes={foodMenuNotes}
            exploreLabel={cartaPage.exploreLabel}
            allergenNote={cartaPage.allergenNote}
          />
        </Container>
      </Section>
    </>
  );
}