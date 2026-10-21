import { z } from "zod";

export const buildingFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be 100 characters or less"),
  street: z.string().min(1, "Street is required").max(100, "Street must be 100 characters or less"),
  city: z.string().min(1, "City is required").max(100, "City must be 100 characters or less"),
  postalCode: z.string().min(1, "Postal code is required").max(20, "Postal code must be 20 characters or less"),
});

export type TBuildingFormSchema = z.infer<typeof buildingFormSchema>;
