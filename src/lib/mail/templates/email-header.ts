import { siteContent } from "@/app/data/site-content";

export function emailHeader() {
  const { identity, theme } = siteContent;

  return `
    <tr>
      <td style="padding:28px 32px 20px;text-align:center;background:${theme.background};">
        <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:${theme.primary};text-transform:uppercase;letter-spacing:0.5px;">
          ${identity.name}
        </p>
        <p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:11px;font-weight:700;color:${theme.accent};text-transform:uppercase;letter-spacing:3px;">
          ${identity.tagline}
        </p>
      </td>
    </tr>
  `;
}
