import { z } from "zod";

export const companySchema = z.object({
  id: z.number(),
  name: z.string().optional(), //some fields are optional as i am not using them.
  address: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  employeeCount: z.number().optional(),
  industry: z.string().optional(),
  marketCap: z.number(),
  domain: z.string().optional(),
  logo: z.string().optional(),
  ceoName: z.string().optional(),
});

export type Company = z.infer<typeof companySchema>;
