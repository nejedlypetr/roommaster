import { z } from "zod";

export const floorFormSchema = z.object({
  floorNumber: z.preprocess((val) => {
    if (typeof val === "string") return Number(val); // Parse string to number
    return val;
  }, z.number().positive("Floor number must be positive")),
  buildingId: z.number().positive("Building ID must be positive"),
});

export type TFloorFormSchema = z.infer<typeof floorFormSchema>;
