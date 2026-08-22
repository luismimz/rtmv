import { Hero } from "@/components/features/home/Hero";
import { About } from "@/components/features/home/About";
import { MenuPreview } from "@/components/features/home/MenuPreview";
import { ReservationCta } from "@/components/features/home/ReservationCta";
import { LocationInfo } from "@/components/features/home/LocationInfo";
export default function Home() {
  return (
    <main className="flex-1">
      <Hero/>
      <About/>
      <MenuPreview/>
      <ReservationCta/>
      <LocationInfo/>
    </main>
  );
}
