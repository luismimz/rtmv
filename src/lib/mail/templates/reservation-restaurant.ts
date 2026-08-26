import { emailHeader } from "@/lib/mail/templates/email-header";

type ReservationRestaurantTemplateData = {
  restaurantName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  guests: number;
  zone: string;
  service: string;
  notes?: string | null;
  confirmUrl: string;
  rejectUrl: string;
};

export function reservationRestaurantTemplate(
  data: ReservationRestaurantTemplateData,
) {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nueva solicitud de reserva</title>
      </head>

      <body style="margin:0;padding:0;background:#f5f3ef;font-family:Arial,sans-serif;color:#2b2b2b;">
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="background:#f5f3ef;padding:32px 16px;"
        >
          <tr>
            <td align="center">
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;"
              >
                ${emailHeader()}
                <tr>
                  <td style="padding:32px;">
                    <h1 style="margin:0 0 16px;font-size:28px;">
                      Nueva solicitud de reserva
                    </h1>

                    <p style="margin:0 0 24px;line-height:1.6;">
                      Se ha recibido una nueva solicitud de reserva para
                      <strong>${data.restaurantName}</strong>.
                    </p>

                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="background:#f7f7f7;border-radius:8px;padding:20px;"
                    >
                      <tr>
                        <td style="padding:6px 0;"><strong>Cliente:</strong></td>
                        <td style="padding:6px 0;">${data.customerName}</td>
                      </tr>

                      <tr>
                        <td style="padding:6px 0;"><strong>Email:</strong></td>
                        <td style="padding:6px 0;">${data.customerEmail}</td>
                      </tr>

                      <tr>
                        <td style="padding:6px 0;"><strong>Teléfono:</strong></td>
                        <td style="padding:6px 0;">${data.customerPhone}</td>
                      </tr>

                      <tr>
                        <td style="padding:6px 0;"><strong>Fecha:</strong></td>
                        <td style="padding:6px 0;">${data.date}</td>
                      </tr>

                      <tr>
                        <td style="padding:6px 0;"><strong>Hora:</strong></td>
                        <td style="padding:6px 0;">${data.time}</td>
                      </tr>

                      <tr>
                        <td style="padding:6px 0;"><strong>Personas:</strong></td>
                        <td style="padding:6px 0;">${data.guests}</td>
                      </tr>

                      <tr>
                        <td style="padding:6px 0;"><strong>Servicio:</strong></td>
                        <td style="padding:6px 0;">${data.service}</td>
                      </tr>

                      <tr>
                        <td style="padding:6px 0;"><strong>Zona:</strong></td>
                        <td style="padding:6px 0;">${data.zone}</td>
                      </tr>

                      ${
                        data.notes
                          ? `
                            <tr>
                              <td style="padding:6px 0;"><strong>Observaciones:</strong></td>
                              <td style="padding:6px 0;">${data.notes}</td>
                            </tr>
                          `
                          : ""
                      }
                    </table>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
                      <tr>
                        <td align="center" style="padding:0 8px 0 0;">
                          <a href="${data.confirmUrl}" style="display:inline-block;background:#1e3023;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:6px;">
                            Confirmar reserva
                          </a>
                        </td>
                        <td align="center" style="padding:0 0 0 8px;">
                          <a href="${data.rejectUrl}" style="display:inline-block;background:#ffffff;color:#b42318;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:6px;border:1px solid #b42318;">
                            Rechazar reserva
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:24px 0 0;line-height:1.6;">
                      Al confirmar o rechazar, el cliente recibirá un correo
                      automático con la respuesta. También puedes responder
                      directamente a este correo para contactar con el cliente.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}