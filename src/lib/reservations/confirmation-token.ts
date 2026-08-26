import { createHmac, timingSafeEqual } from "crypto";
import type { ReservationData } from "@/lib/reservations/reservation.schema";

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type ReservationTokenPayload = {
  reservation: ReservationData;
  issuedAt: number;
};

export function createReservationToken(reservation: ReservationData) {
  const secret = getSecret();
  const payload: ReservationTokenPayload = {
    reservation,
    issuedAt: Date.now(),
  };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(payloadBase64, secret);
  return `${payloadBase64}.${signature}`;
}

export function verifyReservationToken(token: string): ReservationData | null {
  const secret = getSecret();
  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) {
    return null;
  }

  const expectedSignature = sign(payloadBase64, secret);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  let payload: ReservationTokenPayload;
  try {
    payload = JSON.parse(Buffer.from(payloadBase64, "base64url").toString("utf-8"));
  } catch {
    return null;
  }

  if (Date.now() - payload.issuedAt > TOKEN_TTL_MS) {
    return null;
  }

  return payload.reservation;
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function getSecret() {
  const secret = process.env.RESERVATION_TOKEN_SECRET;
  if (!secret) {
    throw new Error("Falta RESERVATION_TOKEN_SECRET.");
  }
  return secret;
}
