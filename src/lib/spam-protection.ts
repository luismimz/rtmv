const MIN_SUBMIT_MS = 1500;

type SpamCheckInput = {
  honeypot: unknown;
  formRenderedAt: unknown;
};

export function isLikelySpam({ honeypot, formRenderedAt }: SpamCheckInput) {
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return true;
  }

  const renderedAt = typeof formRenderedAt === "number" ? formRenderedAt : Number(formRenderedAt);
  if (!Number.isFinite(renderedAt)) {
    return true;
  }

  return Date.now() - renderedAt < MIN_SUBMIT_MS;
}
