import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { BookOpen } from "lucide-react";
import { foodMenuCategories } from "@/app/data/menu";
import { siteContent } from "@/app/data/site-content";

export function MenuPreview(){
  const { menuPreview } = siteContent.copy;
  const menuHighlights = menuPreview.highlightCategoryIds
    .map((id) => foodMenuCategories.find((category) => category.id === id))
    .filter((category) => category !== undefined)
    .map((category) => ({
      id: category.id,
      title: category.title,
      sample: category.items.slice(0, 3).map((item) => item.name).join(" · "),
    }));

  return (
    <Section className="bg-primary text-background">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3rem] text-accent">
              {menuPreview.eyebrow}
            </p>
            <h2 className="mt-4 max-w-lg font-serif text-4xl font-semibold leading-tight">
              {menuPreview.headline}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-background/75">
            {menuPreview.subheadline}</p>
            <Button href="/carta" icon={BookOpen}
            className="mt-8 rounded-sm border border-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:text-primary">
              Ver nuestra carta
            </Button>
          </div>
          <div className="grid gap-12 sm:grid-cols-3 my-auto">
            {menuHighlights.map((item)=>(
              <article
              key={item.id}
              className="border-t border-background/25 pt-5">
                <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-background">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-backgound/70">{item.sample}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}