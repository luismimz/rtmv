import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { CookieSettingsButton } from "@/components/features/cookies/CookieSettingsButton";
import { siteContent } from "@/app/data/site-content";

export const metadata: Metadata = {
  title: `Política de cookies | ${siteContent.identity.name}`,
  description: "Qué cookies usamos en esta web y cómo puedes gestionarlas.",
};

export default function CookiesPage() {
  const { identity } = siteContent;

  return (
    <Section className="py-16 lg:py-20">
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3rem] text-accent">
          Legal
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-primary">
          Política de cookies
        </h1>

        <div className="mt-8 space-y-6 text-sm leading-6 text-foreground/75">
          <p>
            Una cookie es un pequeño archivo que un sitio web guarda en tu
            navegador. En esta web usamos el menor número posible y solo las
            estrictamente necesarias para que funcione o para las que nos des
            tu permiso expresamente.
          </p>

          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              1. Cookie técnica propia
            </h2>
            <p className="mt-2">
              Guardamos en tu navegador (no en un servidor) tu elección sobre
              esta misma política de cookies, para no volver a preguntártelo en
              cada visita. Es estrictamente necesaria para el funcionamiento
              del aviso y no requiere tu consentimiento.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              2. Cookies de Google Maps
            </h2>
            <p className="mt-2">
              Mostramos la ubicación de {identity.name} con un mapa
              incrustado de Google Maps. Google puede instalar sus propias
              cookies al cargar ese mapa. Por eso el mapa no se carga hasta
              que aceptas expresamente las cookies desde el aviso o desde el
              propio bloque del mapa. Puedes consultar la política de
              privacidad de Google en{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary underline underline-offset-2"
              >
                policies.google.com/privacy
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              3. Cookies de analítica (Google Analytics)
            </h2>
            <p className="mt-2">
              Usamos Google Analytics para saber cuánta gente visita la web y
              qué páginas consulta más, de forma agregada. Igual que el mapa,
              solo se carga si aceptas las cookies. Puedes consultar cómo
              trata Google esos datos en{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary underline underline-offset-2"
              >
                policies.google.com/privacy
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              4. Cómo gestionar las cookies
            </h2>
            <p className="mt-2">
              Puedes aceptar o rechazar las cookies desde el aviso que aparece
              al entrar en la web, o cambiar tu elección en cualquier momento
              desde este mismo bloque:
            </p>
            <CookieSettingsButton />
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              5. Contacto
            </h2>
            <p className="mt-2">
              Si tienes cualquier duda sobre esta política, puedes escribirnos
              a{" "}
              <a
                href={`mailto:${identity.email}`}
                className="font-semibold text-primary underline underline-offset-2"
              >
                {identity.email}
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
