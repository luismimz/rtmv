"use client";
import Script from "next/script";
import { useCookieConsent } from "@/lib/cookie-consent/CookieConsentContext";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const saasScriptUrl = process.env.NEXT_PUBLIC_SAAS_SCRIPT_URL;

export function Analytics() {
  const { consent } = useCookieConsent();

  if (consent !== "accepted") {
    return null;
  }

  return (
    <>
      {gaMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}');
            `}
          </Script>
        </>
      )}
      {saasScriptUrl && <Script src={saasScriptUrl} strategy="afterInteractive" />}
    </>
  );
}
