import { mailTransporter } from "@/lib/mail/transporter";
import { contactCustomerTemplate } from "@/lib/mail/templates/contact-customer";
import { contactRestaurantTemplate } from "@/lib/mail/templates/contact-restaurant";
import { siteContent } from "@/app/data/site-content";

type ContactEmailData = {
  fullName: string;
  email: string;
  phone: string;
  subjectLabel: string;
  message: string;
};

export async function sendContactEmail(data: ContactEmailData) {
  const smtpUser = process.env.SMTP_USER;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const ownerEmail = process.env.CONTACT_OWNER_EMAIL;

  if (!smtpUser || !contactToEmail) {
    throw new Error("Faltan variables de entorno de contacto.");
  }

  const restaurantName = siteContent.identity.fullName;
  const contactPhone = siteContent.identity.phone.display;
  const restaurantRecipients = ownerEmail ? [contactToEmail, ownerEmail] : [contactToEmail];

  await Promise.all([
    mailTransporter.sendMail({
      from: `"${restaurantName}" <${smtpUser}>`,
      to: data.email,
      replyTo: contactToEmail,
      subject: "Hemos recibido tu mensaje",
      html: contactCustomerTemplate({
        restaurantName,
        customerName: data.fullName,
        subjectLabel: data.subjectLabel,
        message: data.message,
        contactEmail: contactToEmail,
        contactPhone,
      }),
    }),

    mailTransporter.sendMail({
      from: `"${restaurantName}" <${smtpUser}>`,
      to: restaurantRecipients,
      replyTo: data.email,
      subject: `Nuevo mensaje web: ${data.subjectLabel}`,
      html: contactRestaurantTemplate({
        restaurantName,
        customerName: data.fullName,
        customerEmail: data.email,
        customerPhone: data.phone,
        subjectLabel: data.subjectLabel,
        message: data.message,
      }),
    }),
  ]);
}
