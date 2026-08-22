import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { ReservationFlow } from "@/components/features/reservations/ReservationFlow";

export const metadata: Metadata = {
  title: "Reservar mesa | Tía María Vallecas",
  description: "Reserva tu mesa en Tía María y disfruta de nuestra cocina tradicional, terraza acristalada, zona para eventos y ambiente acogedor en Vallecas. ¡Haz tu reserva online ahora!",
};

export default function ReservasPage() {
  return (
    <Section className="py-6 lg_py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-semibold uppercase tracking-[0.3rem] text-accent">Reservas</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight text-primary">
            Reserva tu mesa en Tía María
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/75">
          Elige el número de personas, la zona del restaurante y el horario que prefiersa. Después solo necesitaremos tus datos de contacto.
          </p>
          <div className="mt-8 border-l-2 border-accent pl-5">
            <p className="text-sm leading-6 text-foreground/70">
            Recibirás un correo con los detalles de la solicitud y un enlace privado para consultar, modificar o cancelar la reserva.
            </p>
          </div>
          <div className="mt-8 rounded-md border border-border bg-primary/5 p-5">
          <p className="font-semibold text-primary">
            La reserva quedará pendiente
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground/65">
          El restaurante comprobará la disponibilidad y te enviará la confirmación definitiva por correo electrónico.
          </p>
          </div>
          </div>
          <div className="min-w-0 rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8 lg:p-10">
            <ReservationFlow />
          </div>
        </div>
      </Container>
    </Section>
  )}