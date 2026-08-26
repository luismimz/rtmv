import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { ReservationFlow } from "@/components/features/reservations/ReservationFlow";
import { siteContent } from "@/app/data/site-content";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

export const metadata: Metadata = buildPageMetadata(
  siteContent.seo.pages.reservas,
  "/reservas",
);

export default function ReservasPage() {
  const { reservasPage } = siteContent.copy;
  return (
    <Section className="py-6 lg:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-semibold uppercase tracking-[0.3rem] text-accent">{reservasPage.eyebrow}</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight text-primary">
            {reservasPage.headline}
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/75">
          {reservasPage.subheadline}
          </p>
          <div className="mt-8 border-l-2 border-accent pl-5">
            <p className="text-sm leading-6 text-foreground/70">
            {reservasPage.noteConfirmation}
            </p>
          </div>
          <div className="mt-8 rounded-md border border-border bg-primary/5 p-5">
          <p className="font-semibold text-primary">
            {reservasPage.pendingTitle}
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground/65">
          {reservasPage.pendingBody}
          </p>
          </div>
          </div>
          <div className="min-w-0 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <ReservationFlow />
          </div>
        </div>
      </Container>
    </Section>
  )}