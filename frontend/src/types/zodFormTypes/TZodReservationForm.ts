import { z } from "zod";
import { EReservationPurpose } from "../enums";

export const reservationFormSchema = z.object({
  purpose: z.nativeEnum(EReservationPurpose, {
    errorMap: () => ({ message: "Invalid reservation purpose" }),
  }),
  startTimeSlot: z.number().min(0).max(360, "Time slot must be between 0 and 360"),
  endTimeSlot: z.number().min(0).max(360, "Time slot must be between 0 and 360"),
  reservationDate: z.date(),
  description: z.string().max(500, "Description must be 500 characters or less").optional(),
}).refine(data => data.startTimeSlot < data.endTimeSlot, {
  message: "Start time must be before end time",
  path: ["startTimeSlot"], //means to which field the error belongs to
});

export type TReservationFormSchema = z.infer<typeof reservationFormSchema>;
