"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formRenderedAt] = useState(() => Date.now());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    try {
    const form = new FormData(event.currentTarget);
    const contactData = {
      fullName: form.get("fullName"),
      email: form.get("email"),
      phone: form.get("phone"),
      subject: form.get("subject"),
      message: form.get("message"),
      website: form.get("website"),
      formRenderedAt,
    };
    const response = await fetch("/api/contact",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(contactData),
    });
    if(!response.ok){
      const result = (await response.json()) as { error?:string};
      throw new Error(result.error ?? "No se pudo enviar el mensaje.")
    }
    setIsSubmitted(true);
  } catch (error){
    console.error("Error enviando contacto;", error);
    setSubmitError(
      error instanceof Error ? error.message : "No se pudo enviar el mensaje.",
    );
  } finally {
    setIsSubmitting(false);
  }
}
  if (isSubmitted) {
    return (
      <div className="flex min-h-96 flex-col items-center justify-center text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-3xl text-primary">
          ✓
        </div>
        <h2 className="mt-6 font-serif text-3xl font-semibold text-primary">
          Mensaje recibido
        </h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-foreground/65">
          Gracias por contactar con Tía María. Te responderemos lo antes
          posible.
        </p>
        <Button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="mt-8 rounded-sm border border-primary px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-background"
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      <div>
        <label
          htmlFor="contact-name"
          className="mb-2 block text-sm font-semibold text-foreground"
        >
          Nombre completo
        </label>
        <input
          id="contact-name"
          name="fullName"
          type="text"
          required
          autoComplete="name"
          placeholder="Ej. Ana García"
          className="w-full rounded-sm border border-border px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary"
        />
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ana@email.com"
            className="w-full rounded-sm border border-border px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary"
          />
        </div>
        <div>
          <label
            htmlFor="contact-phone"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            Teléfono
            <span className="ml-1 font-normal text-foreground/50">
              (opcional)
            </span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+34 600 000 000"
            className="w-full rounded-sm border border-border px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary"
          />
        </div>
      </div>
      <div className="mt-5">
        <label
          htmlFor="contact-subject"
          className="mb-2 block text-sm font-semibold text-foreground"
        >
          Asunto
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          defaultValue=""
          className="appearance-none w-full rounded-sm border border-border px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
        >
          <option value="" disabled>
            Selecciona un motivo
          </option>
          <option value="informacion">Información general</option>
          <option value="eventos">Celebraciones y eventos</option>
          <option value="reservas">Consulta sobre una reserva</option>
          <option value="carta">Carta y alérgenos</option>
          <option value="otros">Otros</option>
        </select>
      </div>
      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm font-semibold text-foreground"
        >
          Mensaje
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={1500}
          placeholder="Cuéntanos cómo podemos ayudarte..."
          className="w-full resize-none rounded-sm border border-border  px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary"
        />
      </div>
      {submitError && (
        <p className="mt-6 text-sm font-medium text-red-600" role="alert">
          {submitError}
        </p>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 w-full justify-center rounded-sm bg-primary px-6 py-3 font-semibold text-background transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </form>
  );
}