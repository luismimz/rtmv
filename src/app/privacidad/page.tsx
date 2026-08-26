import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { siteContent } from "@/app/data/site-content";

export const metadata: Metadata = {
  title: `Política de privacidad | ${siteContent.identity.name}`,
  description: "Política de privacidad del sitio web.",
};

export default function PrivacidadPage() {
  const { identity, legal } = siteContent;

  return (
    <Section className="py-16 lg:py-20">
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3rem] text-accent">
          Legal
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-primary">
          Política de privacidad
        </h1>

        <div className="mt-8 space-y-6 text-sm leading-6 text-foreground/75">
          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              1. Responsable del tratamiento
            </h2>
            <p className="mt-2">
              {identity.name} ({legal.companyName})
              <br />
              NIF/CIF: {legal.cif}
              <br />
              Domicilio: {identity.address.street}, {identity.address.postalCode}{" "}
              {identity.address.city}
              <br />
              Contacto: {identity.email}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              2. Finalidad del tratamiento
            </h2>
            <p className="mt-2">
              Tratamos los datos que nos facilitas en los formularios de
              contacto y de reserva (nombre, teléfono, email y, en su caso,
              peticiones especiales) únicamente para responder a tu consulta o
              gestionar tu reserva.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              3. Legitimación
            </h2>
            <p className="mt-2">
              La base legal es tu consentimiento, otorgado al rellenar y
              enviar voluntariamente el formulario correspondiente.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              4. Conservación de los datos
            </h2>
            <p className="mt-2">
              Conservamos los datos el tiempo necesario para atender tu
              consulta o reserva y, como máximo, durante 2 años desde el
              último contacto, salvo que la normativa aplicable exija un
              plazo mayor.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              5. Destinatarios
            </h2>
            <p className="mt-2">
              Los datos no se ceden a terceros, salvo obligación legal. Para
              el envío de correos electrónicos utilizamos como encargado del
              tratamiento a nuestro proveedor de correo (IONOS), y para alojar
              esta web, a nuestro proveedor de hosting.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              6. Tus derechos
            </h2>
            <p className="mt-2">
              Puedes ejercer tus derechos de acceso, rectificación,
              supresión, oposición, limitación y portabilidad escribiendo a{" "}
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

        <p className="mt-10 text-xs text-foreground/50">
          Última revisión de contenido: agosto de 2026. Este documento incluye
          los datos identificativos reales de la empresa; se recomienda una
          revisión final por un asesor legal antes de considerarlo definitivo.
        </p>
      </Container>
    </Section>
  );
}
