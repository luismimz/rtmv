"use client"
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { CancelSquareIcon } from "@hugeicons/core-free-icons";
import { siteContent } from "@/app/data/site-content";

const venueImages = [
  siteContent.images.galleryTerrazaAcristalada,
  siteContent.images.galleryTerraza,
  siteContent.images.galleryComedor,
  siteContent.images.galleryMiniTerraza,
  siteContent.images.galleryMesaGrupos,
  siteContent.images.galleryTerrazaExterior,
].map((image) => ({ ...image, title: image.alt }));

export function VenueGallery(){
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  return (
    <>
    <Swiper 
    modules={[Navigation]}
    navigation
    spaceBetween={16}
    slidesPerView={1.2}
    breakpoints={{
      640: {
        slidesPerView:2,
      },
      1024:{
        slidesPerView:3,
      },
    }}
    className="w-full [--swiper-navigation-color:var(--background)] [--swiper-navigation-size:26px]"
    >
      {venueImages.map((image, index)=>(
        <SwiperSlide key={`${image.src}-${index}`}>
          <button
          type="button" onClick={()=> setSelectedImage(index)}
          className="block w-full text-left"
          aria-label={`Ampliar imagen: ${image.title}`}
          >
          <div className="relative aspect-5/6 overflow-hidden rounded-2xl">
            <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 80vw"
            />
          </div>
          <p className="mt-3 text-center text-sm font-medium text-foreground">
            {image.title}
          </p>
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
    {selectedImage !== null && (
      <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Galería de Tía María"
      >
      <button 
      type="button"
      onClick={()=> setSelectedImage(null)}
      className="absolute right-5 top-5 z-50 flex size-11 items-center justify-center rounded-sm bg-background/10 text-background transition-colors hover:bg-background/20"
      aria-label="Cerrar galería"
      >
      <HugeiconsIcon icon={CancelSquareIcon} size={24} strokeWidth={1.8} />
      </button>
      <div className="w-full max-w-6xl">
        <Swiper
        modules={[Navigation]}
        navigation
        initialSlide={selectedImage}
        spaceBetween={24}
        slidesPerView={1}
        className="[--swiper-navigation-color:var(--background)] [--swiper-navigation-size:32px]"
        >
        {venueImages.map((image, index)=>(
          <SwiperSlide key={`lightbox-${image.src}-${index}`}>
          <div className="flex flex-col items-center">
            <div className="relative h-[75vh] w-full">
              <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="100vw"
              />
            </div>
            <p className="mt-4 text-center text-sm txt-background/80 ">
            {image.title}
            </p>
          </div>
          </SwiperSlide>
        ))}
        </Swiper>
      </div>
      </div>
    )}
    </>
  );
}