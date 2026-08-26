import { emailHeader } from "@/lib/mail/templates/email-header";

type ContactRestaurantTemplateData = {
  restaurantName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subjectLabel: string;
  message: string;
};

export function contactRestaurantTemplate(data: ContactRestaurantTemplateData) {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nuevo mensaje de contacto</title>
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
                      Nuevo mensaje de contacto
                    </h1>

                    <p style="margin:0 0 24px;line-height:1.6;">
                      Se ha recibido un nuevo mensaje a través del formulario de
                      contacto de <strong>${data.restaurantName}</strong>.
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
                        <td style="padding:6px 0;"><strong>Nombre:</strong></td>
                        <td style="padding:6px 0;">${data.customerName}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;"><strong>Email:</strong></td>
                        <td style="padding:6px 0;">${data.customerEmail}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;"><strong>Teléfono:</strong></td>
                        <td style="padding:6px 0;">${data.customerPhone || "No indicado"}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;"><strong>Asunto:</strong></td>
                        <td style="padding:6px 0;">${data.subjectLabel}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;vertical-align:top;"><strong>Mensaje:</strong></td>
                        <td style="padding:6px 0;white-space:pre-line;">${data.message}</td>
                      </tr>
                    </table>

                    <p style="margin:24px 0 0;line-height:1.6;">
                      Puedes responder directamente a este correo para contactar
                      con la persona interesada.
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
