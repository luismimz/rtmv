"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DatePicker } from "@/components/features/reservations/DatePicker";
import {
  getAvailableTimesForDate,
  isRestaurantClosed,
  reservationSettings,
  restaurantServices,
  restaurantZones,
  type RestaurantZone,
  type ServiceType,
} from "@/app/data/restaurante-config";
type ReservationStep = 1 | 2 | 3 ;

const steps = [
  {number: 1,label: "Detalles",},
  {number: 2,label: "Fecha / Hora",},
  {number: 3,label: "Contacto",},
] as const;


export function ReservationFlow() {
  const [step, setStep] = useState<ReservationStep>(1);
  const [guests, setGuests] = useState<number>(reservationSettings.defaultGuests,);
  const [service, setService] = useState<ServiceType>("comida");
  const [zone, setZone] = useState<RestaurantZone>("terraza-acristalada");
  const [date, setDate] = useState("");
  const [time, setTime] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formRenderedAt, setFormRenderedAt] = useState(() => Date.now());
  const availableTimesForSelectedDate = date
  ? getAvailableTimesForDate(date)
  : [];
  const isClosedDay = isRestaurantClosed(date);
  const validationMessage = 
  !date ? "Selecciona una fecha para continuar" 
  : isClosedDay ? "Los lunes el restaurante permanece cerrado" 
  : !time ? "Selecciona una hora para continuar" : null;
function resetReservation() {
  setStep(1);
  setGuests(2);
  setService(restaurantServices[0].value);
  setZone(restaurantZones[0].value);
  setDate("");
  setTime(null);
  setFullName("");
  setPhone("");
  setEmail("");
  setNotes("");
  setHoneypot("");
  setIsSubmitted(false);
  setSubmitError(null);
  setFormRenderedAt(Date.now());
}
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setSubmitError(null);
  setIsSubmitting(true);
  const reservationData = {
    guests,
    service,
    zone,
    date,
    time,
    customer: {
      fullName,
      phone,
      email,
    },
    notes: notes.trim() || null,
    website: honeypot,
    formRenderedAt,
  };

  try {
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });

    if (!response.ok) {
      const result = (await response.json()) as { error?: string };
      throw new Error(result.error ?? "No se pudo enviar la reserva.");
    }

    setIsSubmitted(true);
  } catch (error) {
    console.error("Error enviando reserva:", error);
    setSubmitError(
      error instanceof Error ? error.message : "No se pudo enviar la reserva.",
    );
  } finally {
    setIsSubmitting(false);
  }
}
  return(
    <div className="w-full">
      {/*progreso*/}
      <div className="relative mb-10">
        <div className="absolute left-0 top-4 h-px w-full bg-border"/>
        <div className="absolute left-0 top-4 h-px bg-primary transition-all duration-300"
            style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",}}
            />
        <div className="relative flex justify-between">
          {steps.map((item) =>{
            const isActive = item.number <= step;
            return (
              <div key={item.number} className="flex flex-col items-center gap-2 bg-white px-2">
                <div className={`flex size-8 items-center justify-center rounded-full border text-sm font-semibold transition-colors
                ${isActive ? "border-primary bg-primary text-background" : "border-border bg-white text-foreground/50"}`}>
                  {item.number}
                </div>
                <span className={`flex  items-center justify-center text-sm font-semibold transition-colors
                ${isActive ? "text-primary" : "text-foreground/50"}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/*Paso 1*/}
      {step === 1 && (
  <div>
    <h3 className="font-serif text-2xl font-semibold text-primary">
      Detalles de la reserva
    </h3>
    <p className="mt-2 text-sm leading-6 text-foreground/65">
      Indícanos cuántas personas sois y dónde os gustaría sentaros.
    </p>
    <div className="mt-8 grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="reservation-guests"className="mb-2 block text-sm font-semibold text-foreground">
          Comensales
        </label>
        <select
        id="reservation-guests"
        value={guests}
        onChange={(event) => setGuests(Number(event.target.value))}
        className="appearance-none w-full rounded-sm border border-border bg-white px-4 py-3 text-foreground outline-none transition-colors focus:border-primary">
        {Array.from({
      length:
        reservationSettings.maxGuests -
        reservationSettings.minGuests +
        1,
    },
    (_, index) => reservationSettings.minGuests + index,
  ).map((guest) => (
    <option key={guest} value={guest}>{guest} {guest === 1 ? "persona" : "personas"}</option>
  ))}
</select>
      </div>
      <div>
        <label htmlFor="reservation-service" className="mb-2 block text-sm font-semibold text-foreground" >
          Tipo de servicio
        </label>
        <select
          id="reservation-service"
          value={service}
          onChange={(event) => setService(event.target.value as ServiceType)}
          className="appearance-none w-full rounded-sm border border-border bg-white px-4 py-3 text-foreground outline-none transition-colors focus:border-primary">
          {restaurantServices.map((item)=>(
            <option key={item.value} value={item.value}>{item.name}</option>
          ))}
        </select>
      </div>
    </div>
    <fieldset className="mt-8">
      <legend className="text-sm font-semibold text-foreground">
        Selecciona una zona
      </legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {restaurantZones.map((item) => {
          const isSelected = zone === item.value;

          return (
            <label
              key={item.value}
              className={`cursor-pointer rounded-md border p-4 transition-colors ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <input
                type="radio"
                name="reservation-zone"
                value={item.value}
                checked={isSelected}
                onChange={() => setZone(item.value)}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-primary"
                      : "border-foreground/30"
                  }`}
                >
                  {isSelected && (
                    <span className="size-2.5 rounded-full bg-primary" />
                  )}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-foreground/60">
                    {item.description}
                  </span>
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
    <Button
      type="button"
      onClick={() => setStep(2)}
      className="mt-8 w-full justify-center rounded-sm bg-primary px-6 py-3 font-semibold text-background transition-colors hover:bg-primary-hover"
    >
      Continuar a fecha y hora
    </Button>
  </div>)}
      {/*Paso 2*/}
      {step === 2 && (
        <div>
          <h3 className="font-serif text-2xl font-semibold text-primary">Fecha y hora</h3>
          <p className="mt-2 text-sm leading-6 text-foreground/65">
          Indícanos cuándo quieres venir a visitarnos.
          </p>
          <div className="mt-8">
            <label htmlFor="reservation-date" className="mb-2 block text-sm font-semibold text-foreground">Fecha</label>
            <DatePicker
              id="reservation-date"
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
                setTime(null);
              }}
              isDateDisabled={(candidate) =>
                candidate < new Date().toISOString().split("T")[0] || isRestaurantClosed(candidate)
              }
              hasError={isClosedDay}
            />
          </div>
          <fieldset className="mt-8">
            <legend className="text-sm font-semibold text-foreground">Hora</legend>
            <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {availableTimesForSelectedDate.map((availableTime) => {
                return (
                  <button
                    key={availableTime}
                    type="button"
                    disabled={!date || isClosedDay}
                    onClick={() => setTime(availableTime)}
                    className={`rounded-sm border px-4 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 
                      ${time === availableTime
                      ? "border-primary bg-primary text-background"
                      : "border-border bg-background text-foreground hover:bg-primary/50"
                  }`}>
                  {availableTime}
                </button>
              );
              })}
            </div>
          </fieldset>
          {validationMessage && (
              <p className={`mt-6 text-sm font-medium 
                ${isClosedDay ? "text-red-600" : "text-foreground/60"}`}
                role={isClosedDay ? "alert" : undefined}>
                {validationMessage}
              </p>
            )}
          <div className="mt-8 flex gap-3">
            <Button
              type="button"
              onClick={() => setStep(1)}
              className="w-1/3 justify-center rounded-sm border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-background/50">
              Atrás
            </Button>            
            <Button
              type="button"
              onClick={() => setStep(3)}
              disabled={!date || !time || isClosedDay} 
              className="w-2/3 justify-center rounded-sm bg-primary px-6 py-3 font-semibold text-background transition-colors hover:bg-primary-hover">
              Continuar a tus datos
            </Button>
          </div>
        </div>
      )}
      {/* Paso 3 */}
      {step === 3 && !isSubmitted && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
          />
          <h3 className="font-serif text-2xl font-semibold text-primary">Tus datos</h3>
          <p className="mt-2 text-sm leading-6 text-foreground/65">
          Indícanos tus datos para confirmar la reserva.
          </p>
          <div className="mt-8">
            <label
            htmlFor="reservation-name"
            className="mb-2 block text-sm font-semibold text-foreground">
              Nombre completo
            </label>
            <input
            id="reservation-name"
            type="text"
            value={fullName}
            onChange={(event)=> setFullName(event.target.value)}
            required
            autoComplete="name"
            placeholder="Ej.Ana García"
            className="w-full rounded-sm border border-border bg-white px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary"
            />
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label
              htmlFor="reservation-phone"
              className="mb-2 block text-sm font-semibold text-foreground">
                Teléfono
              </label>
              <input
              id="reservation-phone"
              type="tel"
              value={phone}
              onChange={(event)=> setPhone(event.target.value)}
              required
              autoComplete="tel"
              placeholder="+34 600 000 000"
              className="w-full rounded-sm border border-border bg-white px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary"/>
            </div>
            <div>
        <label
          htmlFor="reservation-email"
          className="mb-2 block text-sm font-semibold text-foreground">
          Email
        </label>
        <input
          id="reservation-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
          placeholder="ana@email.com"
          className="w-full rounded-sm border border-border bg-white px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary"
        />
      </div>
    </div>
    <div className="mt-5">
      <label
        htmlFor="reservation-notes"
        className="mb-2 block text-sm font-semibold text-foreground">
        Peticiones especiales
        <span className="ml-1 font-normal text-foreground/50">
          (opcional)
        </span>
      </label>
      <textarea
        id="reservation-notes"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        rows={3}
        placeholder="Alergias, trona para bebé, movilidad reducida..."
        className="w-full resize-none rounded-sm border border-border bg-white px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary"/>
    </div>
    {submitError && (
      <p className="mt-6 text-sm font-medium text-red-600" role="alert">
        {submitError}
      </p>
    )}
    <div className="mt-8 flex gap-3">
      <Button
        type="button"
        onClick={() => setStep(2)}
        disabled={isSubmitting}
        className="w-1/3 justify-center rounded-sm border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50">
        Atrás
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-2/3 justify-center rounded-sm bg-primary px-6 py-3 font-semibold text-background transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50">
        {isSubmitting ? "Enviando..." : "Confirmar reserva"}
      </Button>
    </div>
  </form>
      )}
      {isSubmitted && (
  <div className="py-8 text-center">
    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-3xl text-primary">
      ✓
    </div>
    <h3 className="mt-6 font-serif text-3xl font-semibold text-primary">
      ¡Reserva recibida!
    </h3>
    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-foreground/65">
      Gracias, {fullName}. Hemos recibido tu solicitud para el día {date} a
      las {time}.
    </p>
    <p className="mt-2 text-sm text-foreground/65">
      Te enviaremos la confirmación a {email}.
    </p>
    <Button
  type="button"
  onClick={resetReservation}
  className="mt-8 justify-center rounded-sm bg-primary px-6 py-3 font-semibold text-background transition-colors hover:bg-primary-hover"
>
  Hacer otra reserva
</Button>
  </div>
)}
      {/*fin paso 3 */}
</div>
  );
}
