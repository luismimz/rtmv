"use client";
import { useState } from "react";
import { Container} from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { CalendarDays, UtensilsCrossed, Wheat} from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { WheatIcon } from "@hugeicons/core-free-icons";
import { ReservationModal } from "@/components/features/reservations/ReservationModal";


export function Hero(){
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  return (
    <>
    <Section className="relative min-h-97.5 overflow-hidden">
      <Image 
          src="/images/hero-terraza.png"
          alt="Terraza del restaurante Tía María en Vallecas"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw" 
          />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/45 to-transparent" />

            <Container className="relative z-10 flex min-h-97.5 items-center">
              <div className="max-w-120 py-12">
                <h1 className="uppercase font-serif text-5xl font-semibold leading-[0.9] text-primary tracking-tight sm:text-6xl lg:text-7xl">
                  Tía María
                   <span className="mt-2 block font-serif text-2xl font-medium normal-case tracking-wide leading-none  text-accent sm:text-3xl lg:text-4xl">
                    Restaurante & Terraza
                    </span>
                </h1>
                <div aria-hidden="true"
                    className="mt-8 flex items-center justify-center gap-5 text-accent">
                      <span className="h-px w-20 bg-accent/70"/>
                      <HugeiconsIcon
                      icon={WheatIcon}
                      size={30}
                      strokeWidth={1.6}
                      className="rotate-12 text-accent"/>
                      <span className="h-px w-20 bg-accent/70"/>
                    </div>
                <p className="mt-6 max-w-xl text-lg leading-8 text-foreground/80">
                Tapas, raciones y cocina tradicional 
                <span className="block">
                  en un espacio para disfrutar.
                </span></p>
                <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                  <Button 
                  onClick={() => setIsReservationOpen(true)}
                  icon={CalendarDays}
                  className="inline-flex gap-2 rounded-md bg-primary px-6 py-3 text-center text-sm font-semibold text-background transition-colors hover:bg-primary-hover">
                   Reservar mesa
                  </Button>
                  <Button href="/carta"
                  className="inline-flex rounded-sm border border-green-900/40 bg-background/65 px-6 py-3 text-center text-sm font-semibold backdrop-blur-sm  transition-colors hover:bg-background"
                  icon={UtensilsCrossed}>
                    Ver la carta
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