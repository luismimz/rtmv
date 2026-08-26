import { z } from "zod";

import {
  availableTimes,
  isReservationTimeAvailable,
  reservationSettings,
  restaurantServices,
  restaurantZones,
} from "@/app/data/restaurante-config";

const serviceValues = restaurantServices.map(
  (service) => service.value,
) as [string, ...string[]];

const zoneValues = restaurantZones.map(
  (zone) => zone.value,
) as [string, ...string[]];

const timeValues = [...availableTimes] as [string, ...string[]];

export const reservationSchema = z
  .object({
    guests: z
      .number()
      .int()
      .min(reservationSettings.minGuests)
      .max(reservationSettings.maxGuests),

    service: z.enum(serviceValues),

    zone: z.enum(zoneValues),

    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/),

    time: z.enum(timeValues),

    customer: z.object({
      fullName: z.string().trim().min(2).max(100),
      phone: z.string().trim().min(6).max(30),
      email: z.email().max(254),
    }),

    notes: z.string().trim().max(1000).nullable().optional(),
  })
  .superRefine((reservation, context) => {
    if (
      !isReservationTimeAvailable(
        reservation.date,
        reservation.time,
      )
    ) {
      context.addIssue({
        code: "custom",
        path: ["time"],
        message: "La fecha u hora seleccionada no está disponible.",
      });
    }
  });

export type ReservationData = z.infer<
  typeof reservationSchema
>;