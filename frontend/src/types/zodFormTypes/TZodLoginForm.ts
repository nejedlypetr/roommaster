import { z } from "zod";

export type TLoginForm = {
  email: string;
  password: string;
};

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type TLoginFormSchema = z.infer<typeof loginFormSchema>;
