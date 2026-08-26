"use client";
import { Button } from "@/components/ui/Button";
import { siteContent } from "@/app/data/site-content";
import { useCookieConsent } from "@/lib/cookie-consent/CookieConsentContext";

type MapEmbedProps = {
  className?: string;
  title?: string;
};

export function MapEmbed({ className = "", title }: MapEmbedProps) {
  const { consent, accept } = useCookieConsent();
  const { identity } = siteContent;
  const mapTitle =
    title ??
    `Restaurante ${identity.name}, ${identity.address.street}, ${identity.address.city}`;

  if (consent !== "accepted") {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-primary/5 p-6 text-center ${className}`}
      >
        <p className="text-sm leading-6 text-foreground/70">
          Para ver el mapa necesitamos cargar contenido de Google Maps, que usa
          cookies.
        </p>
        <Button
          type="button"
          onClick={accept}
          className="rounded-sm bg-primary px-5 py-2 text-sm font-semibold text-background transition-colors hover:bg-primary-hover"
        >
          Cargar mapa
        </Button>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-2xl border border-border ${className}`}>
      <iframe
        src={identity.mapEmbedUrl}
        width="100%"
        height="100%"
        className="size-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={mapTitle}
      />
    </div>
  );
}
