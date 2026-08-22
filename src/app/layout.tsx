import type { Metadata } from "next";
import { Cormorant_Garamond, Inter} from "next/font/google";
import "./globals.css";
import { Header} from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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

export const metadata: Metadata = {
  title: "Tía María | Restaurante y Terraza en Vallecas",
  description: "Cocina tradicional, tapas, raciones y terraza en Vallecas, Madrid.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${inter.variable} min-h-screen flex flex-col antialiased`}>
        <Header/>
        <main className="flex-1">
          {children}
        </main>        
        <Footer/>
        </body>
    </html>
  );
}
