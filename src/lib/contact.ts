import { z } from "zod";

export const SERVICE_OPTIONS = [
  { slug: "commercial-murals", label: "Commercial murals" },
  { slug: "public-art", label: "Public art" },
  { slug: "community-projects", label: "Community projects" },
  { slug: "school-artwork", label: "School artwork" },
  { slug: "interactive-artwork", label: "Interactive artwork" },
  { slug: "branded-spaces", label: "Branded spaces" },
] as const;

export function serviceLabel(slug: string): string {
  return SERVICE_OPTIONS.find((option) => option.slug === slug)?.label ?? slug;
}

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your name").max(200),
  email: z.email("Enter a valid email").max(320),
  location: z.string().min(2, "Enter your location").max(300),
  service: z.string().min(1, "Select a service").max(100),
  wallSize: z.string().max(300).optional(),
  budget: z.string().max(300).optional(),
  message: z
    .string()
    .min(10, "Tell me a bit more about your project")
    .max(5000),
  // Honeypot — hidden from humans; bots that fill it are silently dropped.
  company: z.string().max(300).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
