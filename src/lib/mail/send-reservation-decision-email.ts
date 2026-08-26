import { mailTransporter } from "@/lib/mail/transporter";
import { reservationConfirmedCustomerTemplate } from "@/lib/mail/templates/reservation-confirmed-customer";
import { reservationRejectedCustomerTemplate } from "@/lib/mail/templates/reservation-rejected-customer";
import { reservationDecisionReceiptTemplate } from "@/lib/mail/templates/reservation-decision-receipt";
import { siteContent } from "@/app/data/site-content";

import type { ReservationData } from "@/lib/reservations/reservation.schema";

export type ReservationDecision = "confirmed" | "rejected";

export async function sendReservationDecisionEmail(
  decision: ReservationDecision,
  reservation: ReservationData,
) {
  const smtpUser = process.env.SMTP_USER;
  const restaurantEmail = process.env.RESERVATION_TO_EMAIL;
  const ownerEmail = process.env.RESERVATION_OWNER_EMAIL;

  if (!smtpUser || !restaurantEmail) {
    throw new Error("Faltan variables de entorno para reservas.");
  }

  const restaurantName = siteContent.identity.name;
  const contactPhone = siteContent.identity.phone.display;
  const restaurantRecipients = ownerEmail
    ? [restaurantEmail, ownerEmail]
    : [restaurantEmail];

  const html =
    decision === "confirmed"
      ? reservationConfirmedCustomerTemplate({
          restaurantName,
          customerName: reservation.customer.fullName,
          date: reservation.date,
          time: reservation.time,
          guests: reservation.guests,
          zone: reservation.zone,
          service: reservation.service,
          contactEmail: restaurantEmail,
          contactPhone,
        })
      : reservationRejectedCustomerTemplate({
          restaurantName,
          customerName: reservation.customer.fullName,
          date: reservation.date,
          time: reservation.time,
          guests: reservation.guests,
          contactEmail: restaurantEmail,
          contactPhone,
        });

  await Promise.all([
    mailTransporter.sendMail({
      from: `"${restaurantName}" <${smtpUser}>`,
      to: reservation.customer.email,
      replyTo: restaurantEmail,
      subject:
        decision === "confirmed"
          ? `Reserva confirmada - ${reservation.date} ${reservation.time}`
          : `Sobre tu reserva - ${reservation.date} ${reservation.time}`,
      html,
    }),

    mailTransporter.sendMail({
      from: `"${restaurantName}" <${smtpUser}>`,
      to: restaurantRecipients,
      subject:
        decision === "confirmed"
          ? `Confirmada: reserva de ${reservation.customer.fullName}`
          : `Rechazada: reserva de ${reservation.customer.fullName}`,
      html: reservationDecisionReceiptTemplate({
        restaurantName,
        decision,
        customerName: reservation.customer.fullName,
        customerEmail: reservation.customer.email,
        date: reservation.date,
        time: reservation.time,
        guests: reservation.guests,
      }),
    }),
  ]);
}
