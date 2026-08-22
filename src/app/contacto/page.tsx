import type { Metadata } from "next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon, Mail01Icon,TelephoneIcon,} from "@hugeicons/core-free-icons";
import { ContactForm } from "@/components/features/contact/ContactForm";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Contacto | Tía María Vallecas",
  description:
    "Contacta con el restaurante Tía María en Vallecas. Consulta nuestra ubicación, horarios, teléfono y formulario de contacto.",
};
export default function ContactPage() {
  return (
    <>
      <Section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3rem] text-accent">
                Contacto
              </p>
              <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight text-primary">
                Estamos aquí para ayudarte.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-foreground/75">
                Escríbenos para resolver cualquier consulta sobre el restaurante, celebraciones, alérgenos o reservas.
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
                      Calle Carlos Solé, 74
                      <br />
                      Vallecas, Madrid
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
                    <a href="tel:+34911386700"
                      className="mt-1 block text-foreground/70 transition-colors hover:text-primary">
                      911 386 700
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
                    <a href="mailto:info@tiamariavallecas.com"
                      className="mt-1 block text-foreground/70 transition-colors hover:text-primary">
                      info@tiamariavallecas.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-10 border-l-2 border-accent pl-5">
                <p className="font-semibold text-primary">Horario habitual</p>
                <p className="mt-2 text-sm leading-6 text-foreground/70">
                  Lunes cerrado
                  <br />
                  Martes a domingo: 12:00 hasta 23:30
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8 lg:p-10">
              <h2 className="font-serif text-3xl font-semibold text-primary">
                Envíanos un mensaje
              </h2>
              <p className="mt-3 text-sm leading-6 text-foreground/65">
                Completa el formulario y nos pondremos en contacto contigo.
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
          <div className="h-96 overflow-hidden rounded-2xl border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d780.3131275504825!2d-3.647931425758394!3d40.3913443918124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4225315c13f3db%3A0x608365b9aeeeeca3!2sRestaurante%20T%C3%ADa%20Mar%C3%ADa!5e0!3m2!1ses!2ses!4v1787272029400!5m2!1ses!2ses"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del restaurante Tía María en Vallecas"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}