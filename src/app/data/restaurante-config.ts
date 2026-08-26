export const restaurantServices = [
  { value: "comida", name: "Comida" },
  { value: "cena", name: "Cena" },
  { value: "tapeo", name: "Tapeo y raciones" },
] as const;

export const restaurantZones = [
  {
    value: "terraza-acristalada",
    name: "Terraza acristalada",
    description:
      "Con luz natural y vistas al exterior, climatizada para cualquier época del año.",
  },
  {
    value: "terraza",
    name: "Terraza",
    description: "Al aire libre, ideal para disfrutar del buen tiempo.",
  },
  {
    value: "interior",
    name: "Interior",
    description:
      "Un ambiente tranquilo y acogedor para disfrutar de tu comida.",
  },
  {
    value: "barra",
    name: "Barra",
    description: "Ideal para tapeo, raciones y cañas.",
  },
  {
    value: "privado",
    name: "Privado",
    description:
      "Salón privado ideal para cumpleaños, comuniones y eventos de empresa.",
  },
] as const;

export const availableTimes = [
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
] as const;

export const closedWeekdays: readonly number[] = [1]; //lunes [1]
export const reservationSettings = {
  timeZone: "Europe/Madrid",
  minGuests: 1,
  maxGuests: 13,
  defaultGuests: 2,
  minimumNoticeMinutes: 60,
} as const;

export type AvailableTime = (typeof availableTimes)[number];
export function isRestaurantClosed(dateValue: string) {
  if (!isValidDate(dateValue)) {
    return true;
  }

  const [year, month, day] = dateValue.split("-").map(Number);
  const selectedDate = new Date(Date.UTC(year, month - 1, day));

  return closedWeekdays.includes(selectedDate.getUTCDay());
}

export function isReservationTimeAvailable(
  dateValue: string,
  timeValue: string,
  now = new Date(),
) {
  if (
    !isValidDate(dateValue) ||
    isRestaurantClosed(dateValue) ||
    !availableTimes.includes(timeValue as AvailableTime)
  ) {
    return false;
  }

  const restaurantNow = getRestaurantNow(now);

  if (dateValue < restaurantNow.date) {
    return false;
  }

  if (dateValue > restaurantNow.date) {
    return true;
  }

  const [hours, minutes] = timeValue.split(":").map(Number);
  const reservationMinutes = hours * 60 + minutes;

  return (
    reservationMinutes >=
    restaurantNow.minutes + reservationSettings.minimumNoticeMinutes
  );
}

export function getAvailableTimesForDate(dateValue: string) {
  return availableTimes.filter((time) =>
    isReservationTimeAvailable(dateValue, time),
  );
}

function getRestaurantNow(now: Date) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: reservationSettings.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const parts = Object.fromEntries(
    formatter
      .formatToParts(now)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  ) as Record<string, string>;

  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  };
}

function isValidDate(dateValue: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    return false;
  }

  const [year, month, day] = dateValue.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}
export type ServiceType =
  (typeof restaurantServices)[number]["value"];

export type RestaurantZone =
  (typeof restaurantZones)[number]["value"];