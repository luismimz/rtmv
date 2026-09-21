import { NextResponse } from "next/server";
import { createReservation } from "@/lib/directus/booking";
import { reservationSchema } from "@/lib/reservations/reservation.schema";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { isLikelySpam } from "@/lib/spam-protection";
import { siteContent } from "@/app/data/site-content";

const RESERVATIONS_PER_HOUR = 5;
const ONE_HOUR_MS = 60 * 60 * 1000;

const successResponse = () =>
  NextResponse.json({ message: "Reserva enviada correctamente." });

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      website?: unknown;
      formRenderedAt?: unknown;
    };

    if (isLikelySpam({ honeypot: body.website, formRenderedAt: body.formRenderedAt })) {
      return successResponse();
    }

    const result = reservationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Los datos de la reserva no son válidos." },
        { status: 400 },
      );
    }

    const rateLimit = checkRateLimit(
      `reservations:${getClientIp(request)}`,
      RESERVATIONS_PER_HOUR,
      ONE_HOUR_MS,
    );

    if (rateLimit.limited) {
      return NextResponse.json(
        {
          error: `Has enviado demasiadas solicitudes. Inténtalo más tarde o llámanos al ${siteContent.identity.phone.display}.`,
        },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const reservation = result.data;
    const elapsedMs = Math.max(0, Date.now() - Number(body.formRenderedAt));

    const created = await createReservation({
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      zone: reservation.zone,
      service: reservation.service,
      customer_name: reservation.customer.fullName,
      customer_phone: reservation.customer.phone,
      customer_email: reservation.customer.email,
      notes: reservation.notes ?? null,
      website: typeof body.website === "string" ? body.website : "",
      elapsed_ms: elapsedMs,
    });

    if (!created.ok) {
      return NextResponse.json({ error: created.reason }, { status: 422 });
    }

    return successResponse();
  } catch (error) {
    console.error("Error enviando reserva a Control de Reservas:", error);

    return NextResponse.json(
      { error: "No se pudo enviar la reserva. Inténtalo de nuevo o llámanos." },
      { status: 502 },
    );
  }
}
