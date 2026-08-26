import type { MenuCategory } from "@/app/data/menu";
import { AllergenBadges } from "@/components/features/menu/AllergenBadges";

type MenuCategorySectionProps = {category: MenuCategory;};

export function MenuCategorySection({
  category,
}: MenuCategorySectionProps) {
  return (
    <section
      id={category.id}
      className="mb-8 break-inside-avoid scroll-mt-32 rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-accent/40" />
        <h2 className="text-center font-serif text-2xl font-semibold text-primary sm:text-3xl">
          {category.title}
        </h2>
        <span className="h-px flex-1 bg-accent/40" />
      </div>
      <div className="mt-6 divide-y divide-border/70">
        {category.items.map((item) => (
          <article
            key={`${category.id}-${item.name}`}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-5 py-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="wrap-break-words font-medium leading-6 text-foreground">
                  {item.name}
                </h3>
                <AllergenBadges allergens={item.allergens} />
              </div>
              {item.description && (
                <p className="mt-1 text-sm italic leading-5 text-foreground/55">
                  {item.description}
                </p>
              )}
            </div>
            <p className="whitespace-nowrap font-serif text-lg font-semibold text-primary">
              {item.price}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}