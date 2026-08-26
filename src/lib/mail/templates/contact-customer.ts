import { emailHeader } from "@/lib/mail/templates/email-header";

type ContactCustomerTemplateData = {
  restaurantName: string;
  customerName: string;
  subjectLabel: string;
  message: string;
  contactEmail: string;
  contactPhone: string;
};

export function contactCustomerTemplate(data: ContactCustomerTemplateData) {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mensaje recibido</title>
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
                      Hemos recibido tu mensaje
                    </h1>

                    <p style="margin:0 0 20px;line-height:1.6;">
                      Hola ${data.customerName},
                    </p>

                    <p style="margin:0 0 24px;line-height:1.6;">
                      Gracias por escribir a <strong>${data.restaurantName}</strong>.
                      Te responderemos lo antes posible.
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
                        <td style="padding:6px 0;"><strong>Asunto:</strong></td>
                        <td style="padding:6px 0;">${data.subjectLabel}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;vertical-align:top;"><strong>Mensaje:</strong></td>
                        <td style="padding:6px 0;white-space:pre-line;">${data.message}</td>
                      </tr>
                    </table>

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
