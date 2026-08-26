import { NextResponse } from "next/server";
import { verifyReservationToken } from "@/lib/reservations/confirmation-token";
import { renderActionPage } from "@/lib/reservations/action-page";
import { sendReservationDecisionEmail } from "@/lib/mail/send-reservation-decision-email";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  const reservation = token ? verifyReservationToken(token) : null;

  if (!reservation || !token) {
    return htmlResponse(invalidTokenPage(), 400);
  }

  return htmlResponse(
    renderActionPage({
      title: "Confirmar reserva",
      message: `¿Confirmas la reserva de ${reservation.customer.fullName} para el ${reservation.date} a las ${reservation.time} (${reservation.guests} ${reservation.guests === 1 ? "persona" : "personas"})?`,
      tone: "info",
      form: {
        action: `/api/reservations/confirm?token=${encodeURIComponent(token)}`,
        buttonLabel: "Sí, confirmar reserva",
      },
    }),
  );
}

export async function POST(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  const reservation = token ? verifyReservationToken(token) : null;

  if (!reservation) {
    return htmlResponse(invalidTokenPage(), 400);
  }

  try {
    await sendReservationDecisionEmail("confirmed", reservation);
  } catch (error) {
    console.error("Error enviando confirmación al cliente:", error);
    return htmlResponse(
      renderActionPage({
        title: "No se pudo enviar la confirmación",
        message:
          "Ha fallado el envío del correo al cliente. Inténtalo de nuevo o contacta con el cliente directamente.",
        tone: "error",
      }),
      500,
    );
  }

  return htmlResponse(
    renderActionPage({
      title: "Reserva confirmada",
      message: `Hemos avisado a ${reservation.customer.fullName} de que su mesa para el ${reservation.date} a las ${reservation.time} está confirmada.`,
      tone: "success",
    }),
  );
}

function htmlResponse(html: string, status = 200) {
  return new NextResponse(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function invalidTokenPage() {
  return renderActionPage({
    title: "Enlace no válido",
    message:
      "Este enlace ha caducado o no es válido. Si necesitas confirmar esta reserva, contacta directamente con el cliente.",
    tone: "error",
  });
}
