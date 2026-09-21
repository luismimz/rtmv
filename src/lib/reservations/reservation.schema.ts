import { z } from "zod";

export const reservationSchema = z.object({
  guests: z.number().int().min(1).max(200),
  service: z.string().trim().min(1).max(60),
  zone: z.string().trim().min(1).max(80),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  customer: z.object({
    fullName: z.string().trim().min(2).max(100),
    phone: z.string().trim().min(6).max(30),
    email: z.email().max(254),
  }),
  notes: z.string().trim().max(1000).nullable().optional(),
});

export type ReservationData = z.infer<typeof reservationSchema>;
