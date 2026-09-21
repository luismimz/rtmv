const REQUEST_TIMEOUT_MS = 8000;

export class BookingServiceError extends Error {}

export type Availability = {
  restaurante: {
    name: string;
    phone: string;
    min_guests: number;
    max_guests: number;
    tagline?: string;
    brand_primary?: string;
  };
  zones: { slug: string; name: string; description?: string }[];
  services: { slug: string; name: string }[];
  times: string[];
  hoy: string;
  fecha?: string;
  dias_cerrados: string[];
  cierres: { desde: string; hasta: string; motivo: string | null }[];
};

export type CreateReservationInput = {
  date: string;
  time: string;
  guests: number;
  zone: string;
  service: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  notes: string | null;
  website: string;
  elapsed_ms: number;
};

export type CreateReservationResult =
  | { ok: true; id?: string[] }
  | { ok: false; reason: string };

type FlowBody = { ok?: boolean; reason?: string } & Record<string, unknown>;

async function triggerFlow(
  flowId: string | undefined,
  flowName: string,
  payload: Record<string, unknown>,
): Promise<{ status: number; body: FlowBody | null }> {
  const baseUrl = process.env.DIRECTUS_URL;

  if (!baseUrl || !flowId) {
    throw new BookingServiceError(`Falta configurar DIRECTUS_URL o el flow ${flowName}.`);
  }

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/flows/trigger/${flowId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  let body: FlowBody | null = null;
  try {
    body = (await response.json()) as FlowBody;
  } catch {
    body = null;
  }

  return { status: response.status, body };
}

function getSlug() {
  const slug = process.env.RESTAURANT_SLUG;

  if (!slug) {
    throw new BookingServiceError("Falta RESTAURANT_SLUG.");
  }

  return slug;
}

export async function getAvailability(date?: string): Promise<Availability> {
  const { status, body } = await triggerFlow(
    process.env.BOOKING_FLOW_AVAILABILITY,
    "de disponibilidad",
    { slug: getSlug(), ...(date ? { date } : {}) },
  );

  if (status >= 400 || !body || body.ok === false) {
    throw new BookingServiceError(
      `Disponibilidad no disponible (${status}${body?.reason ? `: ${body.reason}` : ""}).`,
    );
  }

  const availability = body as unknown as Partial<Availability>;

  return {
    restaurante: availability.restaurante as Availability["restaurante"],
    zones: availability.zones ?? [],
    services: availability.services ?? [],
    times: availability.times ?? [],
    hoy: availability.hoy as string,
    fecha: availability.fecha,
    dias_cerrados: availability.dias_cerrados ?? [],
    cierres: availability.cierres ?? [],
  };
}

export async function createReservation(
  input: CreateReservationInput,
): Promise<CreateReservationResult> {
  const { status, body } = await triggerFlow(
    process.env.BOOKING_FLOW_CREATE,
    "de crear reserva",
    { slug: getSlug(), ...input, notes: input.notes ?? "" },
  );

  if (body?.ok === false && typeof body.reason === "string") {
    return { ok: false, reason: body.reason };
  }

  if (status >= 400 || !body || body.ok !== true) {
    throw new BookingServiceError(`No se pudo crear la reserva (${status}).`);
  }

  return { ok: true, id: body.id as string[] | undefined };
}
