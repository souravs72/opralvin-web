import { z } from "zod";

export const leadInput = z
  .object({
    name: z.string().trim().min(2),
    phone: z.string().regex(/^\+91[6-9]\d{9}$/),
    email: z.string().email(),
    company: z.string().trim().min(2),
    consent: z.literal(true),
    company_website: z.string().optional(),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    landing_page: z.string().optional(),
    segment: z.string().optional(),
    assessment_score: z.number().optional(),
    calculator_result: z.unknown().optional(),
    turnstile_token: z.string().optional(),
  })
  .refine((value) => !value.company_website, { message: "Rejected.", path: ["company_website"] });

export type LeadInput = z.infer<typeof leadInput>;
