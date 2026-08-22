"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const contactData = {
      fullName: form.get("fullName"),
      email: form.get("email"),
      phone: form.get("phone"),
      subject: form.get("subject"),
      message: form.get("message"),
    };
    console.log(
      "Datos del formulario de contacto:",
      JSON.stringify(contactData, null, 2),
    );
    setIsSubmitted(true);
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
          className="w-full rounded-sm border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary"
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
            className="w-full rounded-sm border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary"
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
            className="w-full rounded-sm border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary"
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
          className="w-full rounded-sm border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
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
          className="w-full resize-none rounded-sm border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary"
        />
      </div>
      <Button
        type="submit"
        className="mt-8 w-full justify-center rounded-sm bg-primary px-6 py-3 font-semibold text-background transition-colors hover:bg-primary-hover"
      >
        Enviar mensaje
      </Button>
    </form>
  );
}