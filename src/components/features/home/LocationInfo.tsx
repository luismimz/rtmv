import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { MapEmbed } from "@/components/features/home/MapEmbed";
import { siteContent } from "@/app/data/site-content";

export function LocationInfo(){
  const { identity, hours } = siteContent;
  return (
    <Section className="pt-8">
      <Container className="grid gap-12 border-b border-border pb-16 lg:grid-cols-[0.75fr_1.5fr_0.75fr]">
        <div>
          <p className="text.sm font-semibold uppercase tracking-[0.2rem] text-primary">
            Dónde estamos
          </p>
          <div className="mt-6 space-y-5 text-foreground/80">
          <div className="flex items-start gap-3">
            <MapPin
            className="mt-1 shrink-0 text-primary"
            size={20}
            strokeWidth={1.7}
            />
            <address className="not-italic leading-7">
              {identity.address.street}
              <br/>
              {identity.address.postalCode} {identity.address.city}
            </address>
          </div>
          <a href={`tel:${identity.phone.e164}`}
          className="flex items-center gap-3 transition-colors hover_text-primary">
            <Phone size={20} strokeWidth={1.7}/>
            {identity.phone.display}
          </a>
          <a href={`mailto:${identity.email}`}
          className="flex items-center gap-3 transition-colors hover:text-primary">
            <Mail size={20} strokeWidth={1.7} />
            {identity.email}
          </a>
          </div>
        </div>
        <MapEmbed className="min-h-80" />
        <div>
        <div className="flex items-center gap-3">
          <Clock3
          size={20}
          strokeWidth={1.7}
          className="text-primary"
          />
          <p className="text-sm font-semibold uppercase tracking-[0.25rem] text-primary">
            Horario
          </p>
        </div>
        <div className="mt-6 space-y-5">
          {hours.openingHours.map((item)=>(
            <div key={item.days}>
              <p className="font-semibold text-foreground">
                {item.days}
              </p>
              <p className="mt-1 text-sm text-foreground/75">
                {item.hours}
              </p>
            </div>
          ))}
        </div>

        </div>
      </Container>
    </Section>
  );
}
