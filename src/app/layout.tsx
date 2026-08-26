import type { Metadata } from "next";
import { Cormorant_Garamond, Inter} from "next/font/google";
import "./globals.css";
import { Header} from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Analytics } from "@/components/layout/Analytics";
import { RestaurantJsonLd } from "@/components/layout/RestaurantJsonLd";
import { CookieConsentProvider } from "@/lib/cookie-consent/CookieConsentContext";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { siteContent } from "@/app/data/site-content";

const cormorant = Cormorant_Garamond({
  variable : "--font-cormorant",
  subsets : ["latin"],
  weight : ["400", "500", "600", "700"],
  display : "swap",
});
const inter = Inter({
  variable : "--font-inter",
  subsets : ["latin"],
  display : "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...buildPageMetadata(siteContent.seo.pages.home, "/"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${inter.variable} min-h-screen flex flex-col antialiased`}>
        <RestaurantJsonLd />
        <CookieConsentProvider>
          <Header/>
          <main className="flex-1">
            {children}
          </main>
          <Footer/>
          <CookieBanner/>
          <Analytics/>
        </CookieConsentProvider>
        </body>
    </html>
  );
}
