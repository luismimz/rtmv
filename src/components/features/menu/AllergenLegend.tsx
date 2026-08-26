import { allergenCatalog } from "@/app/data/menu";

export function AllergenLegend() {
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2rem] text-foreground/60">
        Leyenda de alérgenos
      </p>
      <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1.5 text-xs text-foreground/65 sm:grid-cols-2">
        {allergenCatalog.map((allergen) => (
          <li key={allergen.id} className="flex items-center gap-2">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-accent/50 text-[10px] font-semibold text-accent">
              {allergen.number}
            </span>
            {allergen.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
