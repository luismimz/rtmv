"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useCookieConsent } from "@/lib/cookie-consent/CookieConsentContext";

export function CookieBanner() {
  const { consent, accept, reject } = useCookieConsent();

  if (consent !== "pending") {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background p-4 shadow-lg sm:p-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm leading-6 text-foreground/75">
          Usamos cookies para cargar el mapa de Google Maps y para medir el
          uso de la web con Google Analytics, solo si las aceptas. Sin tu
          aceptación, ni el mapa ni la analítica se cargan. Más información en
          nuestra{" "}
          <Link
            href="/cookies"
            className="font-semibold text-primary underline underline-offset-2"
          >
            política de cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Button
            type="button"
            onClick={reject}
            className="rounded-sm border border-border px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary/5"
          >
            Rechazar
          </Button>
          <Button
            type="button"
            onClick={accept}
            className="rounded-sm bg-primary px-5 py-2 text-sm font-semibold text-background transition-colors hover:bg-primary-hover"
          >
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}
