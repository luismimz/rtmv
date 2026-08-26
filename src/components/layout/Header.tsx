"use client";
import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { siteContent } from "@/app/data/site-content";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative border-b border-border bg-background">
      <Container className="flex h-20 items-center justify-between md:h-25">
        <Button href="/" className="flex min-w-0 flex-col leading-none">
          <span className="font-serif text-3xl font-bold uppercase tracking-tight text-primary sm:text-4xl md:text-5xl">
            {siteContent.identity.name}
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2rem] text-accent sm:text-xs sm:tracking-[0.3rem]">
            {siteContent.identity.tagline}
          </span>
        </Button>
        {/* Navegación de escritorio */}
        <nav
          aria-label="Navegación principal"
          className="hidden lg:block"
        >
          <ul className="flex items-center gap-8">
            <li>
              <Button
                href="/"
                className="font-medium text-foreground transition-colors hover:text-primary">
                Inicio
              </Button>
            </li>
            <li>
              <Button
                href="/carta"
                className="font-medium text-foreground transition-colors hover:text-primary">
                Carta
              </Button>
            </li>
            <li>
              <Button
                href="/contacto"
                className="font-medium text-foreground transition-colors hover:text-primary">
                Contacto
              </Button>
            </li>
            <li>
              <Button
                href="/reservas"
                icon={CalendarDays}
                className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary-hover">
                Reservar mesa
              </Button>
            </li>
          </ul>
        </nav>
        {/* Botón móvil */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          className="flex size-11 flex-col items-center justify-center gap-1.5 rounded-sm border border-border text-primary lg:hidden">
          <span className={`h-0.5 w-5 bg-current transition-transform 
              ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}/>
          <span className={`h-0.5 w-5 bg-current transition-opacity 
              ${isMenuOpen ? "opacity-0" : ""}`}/>
          <span className={`h-0.5 w-5 bg-current transition-transform 
              ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}/>
        </button>
      </Container>

      {/* Navegación móvil */}
      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navegación móvil"
          className="z-50 absolute left-0 top-full w-full border-b border-border bg-background shadow-lg lg:hidden">
          <Container className="py-5">
            <ul className="flex flex-col">
              <li>
                <Button
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full border-b border-border/60 py-4 font-medium text-foreground">
                  Inicio
                </Button>
              </li>
              <li>
                <Button
                  href="/carta"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full border-b border-border/60 py-4 font-medium text-foreground">
                  Carta
                </Button>
              </li>
              <li>
                <Button
                  href="/contacto"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full border-b border-border/60 py-4 font-medium text-foreground">
                  Contacto
                </Button>
              </li>
              <li className="pt-5">
                <Button
                  href="/reservas"
                  icon={CalendarDays}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full justify-center rounded-md bg-primary px-5 py-3 font-semibold text-background">
                  Reservar mesa
                </Button>
              </li>
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}