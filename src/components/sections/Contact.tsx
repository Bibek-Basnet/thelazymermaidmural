"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  SERVICE_OPTIONS,
  contactSchema,
  type ContactFormValues,
} from "@/lib/contact";

function ContactForm() {
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      location: "",
      service: "",
      wallSize: "",
      budget: "",
      message: "",
      company: "",
    },
  });

  useEffect(() => {
    const fromQuery = searchParams.get("service");
    if (fromQuery && SERVICE_OPTIONS.some((s) => s.slug === fromQuery)) {
      setValue("service", fromQuery);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: ContactFormValues) => {
    setServerError(null);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.message ?? "The message couldn't be sent.");
    }
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) =>
    handleSubmit(onSubmit)(event).catch((error: unknown) => {
      setServerError(
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong. Please try again, or email Sarah.thelazymermaid@gmail.com directly."
      );
    });

  if (isSubmitSuccessful) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-full min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-white p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-coral"
          aria-hidden="true"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-mango"
          aria-hidden="true"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="pointer-events-none absolute right-8 bottom-4 h-16 w-16 rounded-full bg-lagoon"
          aria-hidden="true"
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "backOut" }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-lagoon"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <motion.path
              d="M6 14.5L11.5 20L22 8"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
            />
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="relative mt-5 font-(--font-fraunces) text-xl font-bold text-ink"
        >
          Message sent!
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="relative mt-2 max-w-xs text-sm text-ink-soft"
        >
          Thanks for reaching out - Sarah will be in touch soon to arrange a
          free consultation.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submitForm} className="rounded-2xl bg-white p-6 lg:p-8">
      {/* Honeypot: invisible to people, bots fill it and get silently dropped. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="mb-1.5 block text-sm font-bold text-ink">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            {...register("name")}
            className="w-full rounded-lg border border-ink/15 bg-cream px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-magenta focus:outline-none"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-coral">{errors.name.message}</p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@email.com"
            {...register("email")}
            className="w-full rounded-lg border border-ink/15 bg-cream px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-magenta focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-coral">{errors.email.message}</p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="location" className="mb-1.5 block text-sm font-bold text-ink">
            Location
          </label>
          <input
            id="location"
            type="text"
            placeholder="Tauranga, NZ"
            {...register("location")}
            className="w-full rounded-lg border border-ink/15 bg-cream px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-magenta focus:outline-none"
          />
          {errors.location && (
            <p className="mt-1 text-xs text-coral">{errors.location.message}</p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="service" className="mb-1.5 block text-sm font-bold text-ink">
            Service
          </label>
          <select
            id="service"
            {...register("service")}
            className="w-full rounded-lg border border-ink/15 bg-cream px-3.5 py-2.5 text-sm text-ink focus:border-magenta focus:outline-none"
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.slug} value={opt.slug}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1 text-xs text-coral">{errors.service.message}</p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="wallSize" className="mb-1.5 block text-sm font-bold text-ink">
            Wall size{" "}
            <span className="font-normal text-ink-soft">
              (I can measure on-site)
            </span>
          </label>
          <input
            id="wallSize"
            type="text"
            placeholder="e.g. 4m x 2.5m"
            {...register("wallSize")}
            className="w-full rounded-lg border border-ink/15 bg-cream px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-magenta focus:outline-none"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="budget" className="mb-1.5 block text-sm font-bold text-ink">
            Budget range <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <input
            id="budget"
            type="text"
            placeholder="e.g. 800–1200 NZD"
            {...register("budget")}
            className="w-full rounded-lg border border-ink/15 bg-cream px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-magenta focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-bold text-ink">
            Tell me about your project
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Describe the space, your mural concept, and anything else that helps me picture it..."
            {...register("message")}
            className="w-full resize-none rounded-lg border border-ink/15 bg-cream px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-magenta focus:outline-none"
          />
          {errors.message && (
            <p className="mt-1 text-xs text-coral">{errors.message.message}</p>
          )}
        </div>
      </div>

      {serverError && (
        <p
          role="alert"
          className="mt-5 rounded-lg bg-coral/10 px-4 py-3 text-sm font-semibold text-coral"
        >
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-magenta px-6 py-3.5 text-sm font-bold text-cream transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Sending..." : "Send message"}
        {!isSubmitting && (
          <i
            className="ti ti-arrow-right text-base transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </button>
    </form>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="bg-peach px-6 py-20 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
            Contact
          </p>
          <h2 className="mt-2 font-[var(--font-fraunces)] text-3xl font-bold text-magenta lg:text-4xl">
            Let&apos;s create something
          </h2>

          <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
            Murals are such a unique and impactful creative solution to draw
            attention, create a feature or express your brand.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            Whether it&apos;s for your business, home or anything in between,
            I&apos;d love to hear from you and create something perfect for
            your space.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            Let&apos;s take the first step to bring your mural idea to life -
            I can&apos;t wait to find out more about your project!
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="mt-8 rounded-2xl bg-lagoon/15 p-5 lg:p-6"
          >
            <p className="flex items-center gap-2 font-[var(--font-fraunces)] text-base font-bold text-ink">
              <i className="ti ti-bulb text-lg text-lagoon" aria-hidden="true" />
              Stuck on what to include in your message?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Most of my clients start by describing the space, the mural
              concept, dimensions, deadlines and anything else you&apos;d like
              to throw in there that will help me to envision your dream
              mural!
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Once you have shared this information with me, I&apos;ll be in
              touch to arrange a free consultation and quote upon meeting you
              and viewing your space.
            </p>
          </motion.div>
        </div>

        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </div>
    </section>
  );
}