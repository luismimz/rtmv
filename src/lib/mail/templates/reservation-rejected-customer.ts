import { emailHeader } from "@/lib/mail/templates/email-header";

type ReservationRejectedTemplateData = {
  restaurantName: string;
  customerName: string;
  date: string;
  time: string;
  guests: number;
  contactEmail: string;
  contactPhone: string;
};

export function reservationRejectedCustomerTemplate(
  data: ReservationRejectedTemplateData,
) {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>No hemos podido confirmar tu reserva</title>
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
                    <h1 style="margin:0 0 16px;font-size:26px;color:#1e3023;">
                      No hemos podido confirmar tu reserva
                    </h1>

                    <p style="margin:0 0 20px;line-height:1.6;">
                      Hola ${data.customerName}, sentimos decirte que no
                      podemos confirmar tu solicitud para el
                      <strong>${data.date}</strong> a las
                      <strong>${data.time}</strong> (${data.guests}
                      ${data.guests === 1 ? "persona" : "personas"}) en
                      <strong>${data.restaurantName}</strong>, ya que no
                      tenemos disponibilidad en ese horario.
                    </p>

                    <p style="margin:0 0 24px;line-height:1.6;">
                      Escríbenos o llámanos y te ayudamos a encontrar otro
                      horario disponible.
                    </p>

                    <hr style="margin:28px 0;border:none;border-top:1px solid #e5e5e5;" />

                    <p style="margin:0;font-size:14px;line-height:1.6;color:#666;">
                      ${data.restaurantName}<br />
                      ${data.contactPhone}<br />
                      ${data.contactEmail}
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
