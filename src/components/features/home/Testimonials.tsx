import { Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { siteContent } from "@/app/data/site-content";

export function Testimonials() {
  const { reviews } = siteContent;

  return (
    <Section>
      <Container>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3rem] text-accent">
            Opiniones
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-primary">
            Lo que dicen de nosotros
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {reviews.items.map((review) => (
            <div
              key={review.author}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8"
            >
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill={index < review.rating ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-foreground/75">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-primary">
                {review.author}{" "}
                <span className="font-normal text-foreground/50">· Google</span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={reviews.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary-hover"
          >
            Danos tu opinión en Google
          </a>
        </div>
      </Container>
    </Section>
  );
}
