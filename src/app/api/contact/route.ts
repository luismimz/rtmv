import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mail/send-contact-email";
import { isLikelySpam } from "@/lib/spam-protection";

type ContactRequest = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
  formRenderedAt?: unknown;
};

const subjectLabels: Record<string, string> = {
  informacion: "Información general",
  eventos: "Celebraciones y eventos",
  reservas: "Consulta sobre una reserva",
  carta: "Carta y alérgenos",
  otros: "Otros",
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequest;

    if (isLikelySpam({ honeypot: body.website, formRenderedAt: body.formRenderedAt })) {
      return NextResponse.json(
        { message: "Mensaje enviado correctamente." },
        { status: 200 },
      );
    }

    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (
      !fullName ||
      !email ||
      !phone ||
      !subject ||
      !message ||
      !subjectLabels[subject] ||
      message.length > 1500
    ) {
      return NextResponse.json(
        { error: "Los datos proporcionados no son válidos." },
        { status: 400 },
      );
    }

    await sendContactEmail({
      fullName,
      email,
      phone,
      subjectLabel: subjectLabels[subject],
      message,
    });

    return NextResponse.json(
      { message: "Mensaje enviado correctamente." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error enviando el formulario de contacto:", error);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje." },
      { status: 500 },
    );
  }
}
