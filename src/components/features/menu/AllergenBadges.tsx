import { allergenCatalog, type AllergenId } from "@/app/data/menu";

type AllergenBadgesProps = {
  allergens?: AllergenId[];
};

export function AllergenBadges({ allergens }: AllergenBadgesProps) {
  if (!allergens || allergens.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1">
      {allergens.map((allergenId) => {
        const allergen = allergenCatalog.find((item) => item.id === allergenId);
        if (!allergen) {
          return null;
        }

        return (
          <span
            key={allergenId}
            title={allergen.label}
            aria-label={allergen.label}
            className="flex size-5 shrink-0 items-center justify-center rounded-full border border-accent/50 text-[10px] font-semibold text-accent"
          >
            {allergen.number}
          </span>
        );
      })}
    </div>
  );
}
