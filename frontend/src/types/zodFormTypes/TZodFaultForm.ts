import { z } from "zod";

export const faultFormSchema = z.object({
  cause: z.string().min(1, "Cause is required").max(100, "Cause must be 100 characters or less"),
  description: z.string().min(1, "Description is required").max(500, "Description must be 500 characters or less"),
});

export type TFaultFormSchema = z.infer<typeof faultFormSchema>;