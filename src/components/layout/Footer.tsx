import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { InstagramIcon, Mail01Icon, Location01Icon, TelephoneIcon } from "@hugeicons/core-free-icons";
import { Container } from "@/components/layout/Container";
import { siteContent } from "@/app/data/site-content";

export function Footer(){
  const { identity } = siteContent;
  return(
    <footer className="bg-primary text-background">
      <Container className="py-12">
        <div className="grid gap-10 border-b border-background/15 pb-10 md:grid-cols-3">
          <div>
            <Link href="/" className="inline-flex flex-col leading-none">
              <span className="font-serif text-4xl font-bold uppercase tracking-tight">
                {identity.name}
              </span>
              <span className="mt-1 text-sm font-semibold uppercase tracking-[0.3rem] text-accent">
                {identity.tagline}
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-background/70">
            Cocina tradicional, ambiente acogedor y terraza para disfrutar sin prisas.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25rem] text-accent">
              Navegación
            </p>
            <nav className="mt-5">
              <ul className="space-y-3 text-sm text-background/75">
                <li>
                  <Link href="/" className="transition-colors hover:text-accent">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/carta" className="transition-colors hover:text-accent">
                  Carta
                  </Link>
                </li>
                <li>
                  <Link href="/reservas" className="transition-colors hover:text-accent">
                  Reservas
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="transition-colors hover:text-accent">
                  Contacto
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25rem] text-accent">
              Contacto
            </p>
          <div className="mt-5 space-y-4 text-sm text-background/75">
          <div className="flex item-start gap-3">
           <HugeiconsIcon
           icon={Location01Icon} size={18} className="mt-0.5 shrink-0 text-accent"/>
            <span>
              {identity.address.street}
              <br/>
              {identity.address.postalCode} {identity.address.city}
            </span>
          </div>
          <a href={`tel:${identity.phone.e164}`}
          className="flex items-center gap-3 transition-colors hover:text-accent">
            <HugeiconsIcon
            icon={TelephoneIcon} size={18} className="text-accent"/>
            {identity.phone.display}
          </a>
          <a href={`mailto:${identity.email}`}
          className="flex items-center gap-3 transition-colors hover:text-accent">
            <HugeiconsIcon
            icon={Mail01Icon} size={18} className="text-accent"/>
            {identity.email}
          </a>
          <a href="#"
          className="flex items-center gap-3 transition-colors hover:text-accent">
            <HugeiconsIcon 
            icon={InstagramIcon}
            size={18}
            strokeWidth={1.5}
            className="text-accent" />
            Instagram
          </a>
          </div>
        </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
           © {new Date().getFullYear()} {identity.name}. Todos los derechos reservados. {identity.footerCredit.label}: <a href={identity.footerCredit.url}>{identity.footerCredit.name}</a>
        </p>
        <div className="flex gap-5">
          <Link href="/aviso-legal" className="hover:text-background">
          Aviso legal
          </Link>
          <Link href="/privacidad" className="hover:text-background">
          Privacidad
          </Link>
          <Link href="/cookies" className="hover:text-background">
          Cookies
          </Link>
        </div>
        </div>
      </Container>
    </footer>
  );
}
