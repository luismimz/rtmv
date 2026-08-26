import { NextResponse } from "next/server";
import { sendReservationEmail } from "@/lib/mail/send-reservation-email";
import { reservationSchema } from "@/lib/reservations/reservation.schema";
import { isLikelySpam } from "@/lib/spam-protection";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      website?: unknown;
      formRenderedAt?: unknown;
    };

    if (isLikelySpam({ honeypot: body.website, formRenderedAt: body.formRenderedAt })) {
      return NextResponse.json({ message: "Reserva enviada correctamente." });
    }

    const result = reservationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Los datos de la reserva no son válidos." },
        { status: 400 },
      );
    }

    const reservation = result.data;

    await sendReservationEmail(reservation);

    return NextResponse.json({
      message: "Reserva enviada correctamente.",
    });
  } catch (error) {
    console.error("Error enviando reserva:", error);

    return NextResponse.json(
      { error: "No se pudo enviar la reserva." },
      { status: 500 },
    );
  }
}