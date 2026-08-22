"use client"
import { useState } from "react";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ReservationModal } from "@/components/features/reservations/ReservationModal";

export function ReservationCta(){
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  return (
    <>
    <Section className="py-10">
      <Container>
          <div className="relative overflow-hidden rounded-2xl">
            <Image
            src="/images/hero-terraza.png"
            alt="Terraza del restaurante Tía María preparada para recibir clientes"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-primary/85"/>
          <div className="relative z-10 flex min-h-44 flex-col justify-between gap-8 px-8 ppy-10 sm:px-12 lg:flex-row lg:items-center">
            <div>
              <p className="font-serif text-3xl font-semibold text-background">
                Reserva tu mesa y ven a disfrutar.
              </p>
              <p className="mt-2 text-base text-background/80">
              Haz tu reserva online en unos pocos pasos.
              </p>
              </div>
              <Button 
              onClick={() => setIsReservationOpen(true)}
              icon={CalendarDays}
              className="w-fit shrink-0 rounded-sm bg-background px-6 py-3 font-semibold text-primary transition-colors hover:bg-background/90">
                Reservar mesa
              </Button>            
          </div>
        </div>
      </Container>
    </Section>
    <ReservationModal
    isOpen={isReservationOpen}
    onClose={() => setIsReservationOpen(false)}
    />  
    </>
  );
}