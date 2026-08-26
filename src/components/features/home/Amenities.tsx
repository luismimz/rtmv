"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { siteContent } from "@/app/data/site-content";

const swiperNavigationClass =
  "[--swiper-navigation-color:var(--background)] [--swiper-navigation-size:20px]";

export function Amenities() {
  const { football, events } = siteContent.copy.amenities;
  const { footballPosterWhite, footballPosterBlue } = siteContent.images;
  const { eventsVideos } = siteContent.media;
  const footballSlides = [footballPosterWhite, footballPosterBlue];

  return (
    <Section>
      <Container>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
            <Swiper modules={[Navigation]} navigation className={`w-full ${swiperNavigationClass}`}>
              {footballSlides.map((slide) => (
                <SwiperSlide key={slide.src}>
                  <div className="relative aspect-square overflow-hidden bg-primary/5">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-contain"
                      sizes="(min-width: 640px) 45vw, 90vw"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
              <h3 className="font-serif text-2xl font-semibold text-primary">
                {football.headline}
              </h3>
              <p className="mt-3 text-sm leading-6 text-foreground/70">
                {football.text}
              </p>
            </div>
          </div>

          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
            <Swiper modules={[Navigation]} navigation className={`w-full ${swiperNavigationClass}`}>
              {eventsVideos.map((video) => (
                <SwiperSlide key={video.src}>
                  <div className="relative aspect-square overflow-hidden bg-primary/5">
                    <video
                      src={video.src}
                      controls
                      preload="metadata"
                      onLoadedMetadata={(event) => {
                        event.currentTarget.currentTime = 0.1;
                      }}
                      className="absolute inset-0 size-full object-contain"
                    >
                      <track kind="captions" />
                    </video>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
              <h3 className="font-serif text-2xl font-semibold text-primary">
                {events.headline}
              </h3>
              <p className="mt-3 text-sm leading-6 text-foreground/70">
                {events.text}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
