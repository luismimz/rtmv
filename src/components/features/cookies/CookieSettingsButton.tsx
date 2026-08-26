"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCookieConsent } from "@/lib/cookie-consent/CookieConsentContext";

const statusLabel = {
  pending: "Todavía no has elegido",
  accepted: "Has aceptado las cookies",
  rejected: "Has rechazado las cookies",
} as const;

export function CookieSettingsButton() {
  const { consent, resetConsent } = useCookieConsent();
  const [justReset, setJustReset] = useState(false);

  return (
    <div className="mt-4 rounded-2xl border border-border bg-primary/5 p-5">
      <p className="text-sm font-semibold text-primary">{statusLabel[consent]}</p>
      <p className="mt-1 text-sm leading-6 text-foreground/70">
        Puedes cambiar tu elección cuando quieras. Volverás a ver el aviso de
        cookies en cuanto lo hagas.
      </p>
      <Button
        type="button"
        onClick={() => {
          resetConsent();
          setJustReset(true);
        }}
        className="mt-4 rounded-sm border border-primary px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-background"
      >
        Cambiar mi elección de cookies
      </Button>
      {justReset && (
        <p className="mt-3 text-sm text-foreground/60">
          Listo. El aviso de cookies volverá a aparecer.
        </p>
      )}
    </div>
  );
}
