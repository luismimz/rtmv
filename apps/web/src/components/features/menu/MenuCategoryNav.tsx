import type { MenuCategory } from "@/app/data/menu";

type MenuCategoryNavProps = {categories: MenuCategory[];};

export function MenuCategoryNav({
  categories,
}: MenuCategoryNavProps) {
  return (
    <nav
      aria-label="Categorías de la carta"
      className="min-w-0">
      <div className="flex gap-3 overflow-x-auto pb-3 lg:flex-col lg:overflow-visible">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className="shrink-0 whitespace-nowrap rounded-sm border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground/75 transition-colors hover:bg-accent/10 hover:text-primary">
            {category.title}
          </a>
        ))}
      </div>
    </nav>
  );
}