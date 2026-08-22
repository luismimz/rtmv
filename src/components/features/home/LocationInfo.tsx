import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";

type OpeningHour = {
  days: string;
  hours: string[];
}
const openingHours : OpeningHour[]= [
  {
    days: "Lunes", 
    hours: ["Cerrado"],
  },
  {
    days: "Martes a domingo", 
    hours: ["12:00 - 23:30"],
  },
]

export function LocationInfo(){
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
              Calle Carlos Solé, 74
              <br/>
              28051 Vallecas, Madrid
            </address>
          </div>
          <a href="tel:+34911386700"
          className="flex items-center gap-3 transition-colors hover_text-primary">
            <Phone size={20} strokeWidth={1.7}/>
            911 386 700
          </a>
          <a href="mailito:info@tiamariavallecas.com"
          className="flex items-center gap-3 transition-colors hover:text-primary">
            <Mail size={20} strokeWidth={1.7} />
            info@tiamariavallecas.com
          </a>
          </div>
        </div>
        <div className="relative min-h-80 overflow-hidden rounded-2xl border border-border">
          <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d780.3131275504825!2d-3.647931425758394!3d40.3913443918124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4225315c13f3db%3A0x608365b9aeeeeca3!2sRestaurante%20T%C3%ADa%20Mar%C3%ADa!5e0!3m2!1ses!2ses!4v1787272029400!5m2!1ses!2ses"
          //src="https://maps.google.com/maps?q=Restaurante%20T%C3%ADa%20Mar%C3%ADa%2C%20Calle%20Carlos%20sol%C3%A9%2C%2074%2C%20%20Madrid&amp;t=m&amp;z=14&amp;output=embed&amp;iwloc=near"
          width="100%"
          height="100%"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Restaurante Tía María, Calle Carlos solé, 74,  Madrid" 
          aria-label="Restaurante Tía María, Calle Carlos solé, 74,  Madrid"
          />
          </div>
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
          {openingHours.map((item)=>(
            <div key={item.days}>
              <p className="font-semibold text-foreground">
                {item.days}
              </p>
              {item.hours.map((hour)=>(
                <p key={hour}
                className="mt-1 text-sm text-foreground/75">
                  {hour}
                </p>
              ))}
            </div>
          ))}
        </div>

        </div>
      </Container>
    </Section>
  );
}