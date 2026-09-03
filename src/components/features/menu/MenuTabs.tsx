"use client";
import { useState } from "react";
import Image from "next/image";
import type { MenuCategory } from "@/app/data/menu";
import { MenuCategoryNav } from "@/components/features/menu/MenuCategoryNav";
import { MenuCategorySection } from "@/components/features/menu/MenuCategorySection";
import { AllergenLegend } from "@/components/features/menu/AllergenLegend";
import { ReservationTrigger } from "@/components/features/reservations/ReservationTigger";
import { siteContent } from "@/app/data/site-content";

type MenuTabsProps = {
  foodCategories: MenuCategory[];
  drinkCategories: MenuCategory[];
  notes: string[];
  exploreLabel: string;
  allergenNote: string;
};

const tabs = [
  { id: "comida", label: "Comida" },
  { id: "bebidas", label: "Bebidas" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function MenuTabs({
  foodCategories,
  drinkCategories,
  notes,
  exploreLabel,
  allergenNote,
}: MenuTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("comida");
  const activeCategories = activeTab === "comida" ? foodCategories : drinkCategories;
  const hasAllergenData = activeCategories.some((category) =>
    category.items.some((item) => item.allergens && item.allergens.length > 0),
  );

  return (
    <div>
      <div className="mb-10 flex gap-3" role="tablist" aria-label="Tipo de carta">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-sm px-6 py-2.5 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-primary text-background"
                  : "border border-border bg-background text-foreground/70 hover:border-primary/50"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "bebidas" && (
        <div className="relative mb-10 h-48 overflow-hidden rounded-2xl sm:h-64">
          <Image
            src={siteContent.images.bebidasHeader.src}
            alt={siteContent.images.bebidasHeader.alt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 900px, 100vw"
          />
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[250px_minmax(0,1fr)] lg:items-start">
        <aside className="min-w-0 lg:sticky lg:top-28">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25rem] text-accent">
            {exploreLabel}
          </p>
          <MenuCategoryNav categories={activeCategories} />
          <div className="mt-8 border-l-2 border-accent pl-5">
            <p className="text-sm leading-6 text-foreground/65">{allergenNote}</p>
            {hasAllergenData && <AllergenLegend />}
          </div>
          <ReservationTrigger className="mt-8 w-full justify-center rounded-sm bg-primary px-6 py-3 font-semibold text-background transition-colors hover:bg-primary-hover">
            Reservar mesa
          </ReservationTrigger>
        </aside>
        <main className="min-w-0">
          <div className="mb-10 grid gap-4 sm:grid-cols">
            {notes.map((note) => (
              <div key={note} className="rounded-2xl border border-border bg-primary/5 p-5">
                <p className="text-sm leading-6 text-foreground/70">{note}</p>
              </div>
            ))}
          </div>
          <div className="columns-1 gap-8 xl:columns-2">
            {activeCategories.map((category) => (
              <MenuCategorySection key={category.id} category={category} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
