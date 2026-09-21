const MAX_TRACKED_KEYS = 5000;
const attempts = new Map<string, number[]>();

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  return (
    request.headers.get("cf-connecting-ip")?.trim() ||
    forwardedFor ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs);

  if (recent.length >= limit) {
    attempts.set(key, recent);
    return { limited: true, retryAfterSeconds: Math.ceil((recent[0] + windowMs - now) / 1000) };
  }

  if (!attempts.has(key) && attempts.size >= MAX_TRACKED_KEYS) {
    for (const [trackedKey, timestamps] of attempts) {
      if (timestamps.every((timestamp) => now - timestamp >= windowMs)) {
        attempts.delete(trackedKey);
      }
    }

    if (attempts.size >= MAX_TRACKED_KEYS) {
      attempts.delete(attempts.keys().next().value as string);
    }
  }

  recent.push(now);
  attempts.set(key, recent);

  return { limited: false, retryAfterSeconds: 0 };
}
