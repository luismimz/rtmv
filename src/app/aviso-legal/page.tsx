import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { siteContent } from "@/app/data/site-content";

export const metadata: Metadata = {
  title: `Aviso legal | ${siteContent.identity.name}`,
  description: "Aviso legal del sitio web.",
};

export default function AvisoLegalPage() {
  const { identity, legal } = siteContent;

  return (
    <Section className="py-16 lg:py-20">
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3rem] text-accent">
          Legal
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-primary">
          Aviso legal
        </h1>

        <div className="mt-8 space-y-6 text-sm leading-6 text-foreground/75">
          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              1. Datos identificativos del titular
            </h2>
            <p className="mt-2">
              Titular: {identity.name}
              <br />
              Razón social: {legal.companyName} ({legal.legalForm})
              <br />
              NIF/CIF: {legal.cif}
              <br />
              Actividad (CNAE): {legal.cnae}
              <br />
              Domicilio: {identity.address.street}, {identity.address.postalCode}{" "}
              {identity.address.city}
              <br />
              Inscripción registral: {legal.registryInfo}, fecha de
              constitución {legal.incorporationDate}
              <br />
              Contacto: {identity.email} · {identity.phone.display}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              2. Objeto
            </h2>
            <p className="mt-2">
              Este sitio web tiene como finalidad informar sobre {identity.name}{" "}
              (carta, horarios, ubicación) y permitir la solicitud de reservas
              y el contacto con el restaurante.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              3. Condiciones de uso
            </h2>
            <p className="mt-2">
              El acceso a este sitio web es gratuito y no requiere registro
              previo. El usuario se compromete a hacer un uso adecuado de los
              contenidos y a no emplearlos para actividades ilícitas.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              4. Propiedad intelectual
            </h2>
            <p className="mt-2">
              Los textos, imágenes y demás contenidos de este sitio son
              propiedad de {identity.name} o se usan con la autorización
              correspondiente, salvo que se indique lo contrario.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              5. Enlaces externos
            </h2>
            <p className="mt-2">
              Este sitio puede incluir enlaces a páginas de terceros (por
              ejemplo, Google Maps). {identity.name} no se hace responsable
              del contenido de esas páginas externas.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              6. Legislación aplicable y jurisdicción
            </h2>
            <p className="mt-2">
              Este aviso legal se rige por la legislación española. Para
              cualquier controversia relacionada con este sitio web, las
              partes se someten a los juzgados y tribunales que correspondan
              conforme a la normativa vigente.
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
