import { Hero } from "@/components/features/home/Hero";
import { About } from "@/components/features/home/About";
import { MenuPreview } from "@/components/features/home/MenuPreview";
import { Amenities } from "@/components/features/home/Amenities";
import { Testimonials } from "@/components/features/home/Testimonials";
import { ReservationCta } from "@/components/features/home/ReservationCta";
import { LocationInfo } from "@/components/features/home/LocationInfo";
export default function Home() {
  return (
    <main className="flex-1">
      <Hero/>
      <About/>
      <MenuPreview/>
      <Amenities/>
      <Testimonials/>
      <ReservationCta/>
      <LocationInfo/>
    </main>
  );
}
