import { mailTransporter } from "@/lib/mail/transporter";
import { reservationCustomerTemplate } from "@/lib/mail/templates/reservation-customer";
import { reservationRestaurantTemplate } from "@/lib/mail/templates/reservation-restaurant";
import { createReservationToken } from "@/lib/reservations/confirmation-token";
import { siteContent } from "@/app/data/site-content";

import type { ReservationData } from "@/lib/reservations/reservation.schema";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function sendReservationEmail(data: ReservationData) {
  const smtpUser = process.env.SMTP_USER;
  const restaurantEmail = process.env.RESERVATION_TO_EMAIL;
  const ownerEmail = process.env.RESERVATION_OWNER_EMAIL;

  if (!smtpUser || !restaurantEmail) {
    throw new Error("Faltan variables de entorno para reservas.");
  }

  const restaurantRecipients = ownerEmail
    ? [restaurantEmail, ownerEmail]
    : [restaurantEmail];

  const restaurantName = siteContent.identity.name;
  const contactPhone = siteContent.identity.phone.display;
  const contactEmail = restaurantEmail;
  const token = createReservationToken(data);
  const confirmUrl = `${siteUrl}/api/reservations/confirm?token=${encodeURIComponent(token)}`;
  const rejectUrl = `${siteUrl}/api/reservations/reject?token=${encodeURIComponent(token)}`;

  await Promise.all([
    mailTransporter.sendMail({
      from: `"${restaurantName}" <${smtpUser}>`,
      to: data.customer.email,
      replyTo: restaurantEmail,
      subject: "Hemos recibido tu solicitud de reserva",
      html: reservationCustomerTemplate({
        restaurantName,
        customerName: data.customer.fullName,
        date: data.date,
        time: data.time,
        guests: data.guests,
        zone: data.zone,
        service: data.service,
        notes: data.notes,
        contactEmail,
        contactPhone,
      }),
    }),

    mailTransporter.sendMail({
      from: `"Reservas ${restaurantName}" <${smtpUser}>`,
      to: restaurantRecipients,
      replyTo: data.customer.email,
      subject: `Nueva reserva - ${data.date} ${data.time}`,
      html: reservationRestaurantTemplate({
        restaurantName,
        customerName: data.customer.fullName,
        customerEmail: data.customer.email,
        customerPhone: data.customer.phone,
        date: data.date,
        time: data.time,
        guests: data.guests,
        zone: data.zone,
        service: data.service,
        notes: data.notes,
        confirmUrl,
        rejectUrl,
      }),
    }),
  ]);
}