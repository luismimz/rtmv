import { siteContent } from "@/app/data/site-content";

type ActionPageOptions = {
  title: string;
  message: string;
  tone: "success" | "error" | "info";
  form?: { action: string; buttonLabel: string; buttonColor?: string };
};

export function renderActionPage({ title, message, tone, form }: ActionPageOptions) {
  const { identity, theme } = siteContent;
  const toneColor =
    tone === "success" ? "#1e6d41" : tone === "error" ? "#b42318" : theme.primary;

  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
      </head>
      <body style="margin:0;padding:24px;background:${theme.background};font-family:Arial,sans-serif;color:#2b2b2b;display:flex;min-height:100vh;align-items:center;justify-content:center;box-sizing:border-box;">
        <div style="max-width:480px;width:100%;background:#ffffff;border-radius:12px;padding:40px 32px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
          <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:${theme.primary};text-transform:uppercase;">
            ${identity.name}
          </p>
          <h1 style="margin:20px 0 12px;font-size:22px;color:${toneColor};">${title}</h1>
          <p style="margin:0;line-height:1.6;color:#444;">${message}</p>
          ${
            form
              ? `
            <form method="POST" action="${form.action}" style="margin-top:28px;">
              <button type="submit" style="background:${form.buttonColor ?? theme.primary};color:#ffffff;border:none;font-weight:bold;padding:12px 28px;border-radius:6px;font-size:15px;cursor:pointer;">
                ${form.buttonLabel}
              </button>
            </form>
          `
              : ""
          }
        </div>
      </body>
    </html>
  `;
}
