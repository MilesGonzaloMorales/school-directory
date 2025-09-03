import { z } from "zod";

export const schoolSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  address: z.string().min(5, "Address is too short"),
  city: z.string().min(2, "City is too short"),
  state: z.string().min(2, "State is too short"),
  contact: z
    .string()
    .regex(/^\d{10}$/, "Contact must be exactly 10 digits"),
  email_id: z.string().email("Invalid email"),
});
