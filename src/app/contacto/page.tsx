import type { Metadata } from "next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon, Mail01Icon,TelephoneIcon,} from "@hugeicons/core-free-icons";
import { ContactForm } from "@/components/features/contact/ContactForm";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { MapEmbed } from "@/components/features/home/MapEmbed";
import { siteContent } from "@/app/data/site-content";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

export const metadata: Metadata = buildPageMetadata(
  siteContent.seo.pages.contacto,
  "/contacto",
);
export default function ContactPage() {
  const { identity, hours, copy } = siteContent;
  return (
    <>
      <Section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3rem] text-accent">
                {copy.contactPage.eyebrow}
              </p>
              <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight text-primary">
                {copy.contactPage.headline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-foreground/75">
                {copy.contactPage.subheadline}
              </p>
              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <HugeiconsIcon
                    icon={Location01Icon}
                    size={22}
                    strokeWidth={1.7}
                    className="mt-1 shrink-0 text-accent"
                  />
                  <div>
                    <p className="font-semibold text-primary">Dirección</p>
                    <address className="mt-1 not-italic leading-6 text-foreground/70">
                      {identity.address.street}
                      <br />
                      {identity.address.postalCode} {identity.address.city}
                    </address>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <HugeiconsIcon
                    icon={TelephoneIcon}
                    size={22}
                    strokeWidth={1.7}
                    className="mt-1 shrink-0 text-accent"
                  />
                  <div>
                    <p className="font-semibold text-primary">Teléfono y WhatsApp</p>
                    <a href={`tel:${identity.phone.e164}`}
                      className="mt-1 block text-foreground/70 transition-colors hover:text-primary">
                      {identity.phone.display}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    size={22}
                    strokeWidth={1.7}
                    className="mt-1 shrink-0 text-accent"/>
                  <div>
                    <p className="font-semibold text-primary">Email</p>
                    <a href={`mailto:${identity.email}`}
                      className="mt-1 block text-foreground/70 transition-colors hover:text-primary">
                      {identity.email}
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-10 border-l-2 border-accent pl-5">
                <p className="font-semibold text-primary">Horario habitual</p>
                <p className="mt-2 text-sm leading-6 text-foreground/70">
                  {hours.openingHours.map((item, index) => (
                    <span key={item.days}>
                      {item.hours === "Cerrado"
                        ? `${item.days} cerrado`
                        : `${item.days}: ${item.hours}`}
                      {index < hours.openingHours.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8 lg:p-10">
              <h2 className="font-serif text-3xl font-semibold text-primary">
                {copy.contactPage.formHeadline}
              </h2>
              <p className="mt-3 text-sm leading-6 text-foreground/65">
                {copy.contactPage.formSubheadline}
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          <MapEmbed
            className="h-96"
            title={`Ubicación del restaurante ${identity.name} en ${identity.address.city}`}
          />
        </Container>
      </Section>
    </>
  );
}