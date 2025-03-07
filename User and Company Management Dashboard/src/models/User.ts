import { z } from "zod";

export const userSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    username: z.string().min(1, "username is required"),
    password: z.string().min(1, "password is required"),
    email: z.string().email("Invalid email"),
    company: z.string(),
    address: z.string(),
    zip: z.coerce.number(),
    state: z.string(),
    country: z.string(),
    phone: z.coerce.number().min(10,"Please enter correct phone number!"),
  })
  .partial();

export type User = z.infer<typeof userSchema>;
