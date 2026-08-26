import { emailHeader } from "@/lib/mail/templates/email-header";

type ReservationDecisionReceiptData = {
  restaurantName: string;
  decision: "confirmed" | "rejected";
  customerName: string;
  customerEmail: string;
  date: string;
  time: string;
  guests: number;
};

export function reservationDecisionReceiptTemplate(
  data: ReservationDecisionReceiptData,
) {
  const decisionLabel = data.decision === "confirmed" ? "confirmada" : "rechazada";
  const accentColor = data.decision === "confirmed" ? "#1e6d41" : "#b42318";

  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reserva ${decisionLabel}</title>
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
                    <h1 style="margin:0 0 16px;font-size:24px;color:${accentColor};">
                      Reserva ${decisionLabel}
                    </h1>

                    <p style="margin:0 0 24px;line-height:1.6;">
                      Este es un recibo interno: habéis marcado como
                      <strong>${decisionLabel}</strong> la reserva de
                      <strong>${data.customerName}</strong> y ya se le ha
                      avisado por correo. No hace falta que hagáis nada más
                      con este enlace.
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
                        <td style="padding:6px 0;"><strong>Email del cliente:</strong></td>
                        <td style="padding:6px 0;">${data.customerEmail}</td>
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
                    </table>
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
