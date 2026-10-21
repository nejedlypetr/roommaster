import { z } from "zod";
import {EReservationPurpose} from "../enums";

export const quickReservationFormSchema = z.object({
  roomId: z.number(),
  purpose: z.nativeEnum(EReservationPurpose, {
    errorMap: () => ({ message: "Invalid purpose type" }),
  }),
  reservationDate: z.date(),
  startTimeSlot: z.number().min(0, "Opening time must be at least 0").max(95, "Opening time must be at most 95"),
  endTimeSlot: z.number().min(0, "Closing time must be at least 0").max(95, "Closing time must be at most 95"),
  description: z.string().max(500, "Description must be 500 characters or less").optional(),
}).refine((data) => data.startTimeSlot < data.endTimeSlot, {
  message: "Opening time must be before closing time",
  path: ["openingTime"],
});

export type TQuickReservationFormSchema = z.infer<typeof quickReservationFormSchema>;
