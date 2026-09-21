import { NextResponse } from "next/server";
import { getAvailability, type Availability } from "@/lib/directus/booking";

const CACHE_TTL_MS = 30_000;
const MAX_CACHE_ENTRIES = 200;
const cache = new Map<string, { expiresAt: number; value: Availability }>();

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date") ?? "";

  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Fecha no válida." }, { status: 400 });
  }

  const cached = cache.get(date);
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json(cached.value);
  }

  try {
    const availability = await getAvailability(date || undefined);
    if (cache.size >= MAX_CACHE_ENTRIES) {
      cache.clear();
    }
    cache.set(date, { expiresAt: Date.now() + CACHE_TTL_MS, value: availability });
    return NextResponse.json(availability);
  } catch (error) {
    console.error("Error consultando la disponibilidad:", error);
    return NextResponse.json(
      { error: "No se pudo consultar la disponibilidad." },
      { status: 502 },
    );
  }
}
