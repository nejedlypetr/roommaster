import { z } from "zod";
import { ERoomType, EDepartment } from "../enums";

export const roomFormSchema = z.object({
  roomType: z.nativeEnum(ERoomType, {
    errorMap: () => ({ message: "Invalid room type" }),
  }),
  roomNumber: z.preprocess((val) => {
    if (typeof val === "string") return Number(val); // Parse string to number
    return val;
  }, z.number().positive("Room number must be positive")),
  openingTime: z.number().min(0, "Opening time must be at least 0").max(95, "Opening time must be at most 95"),
  closingTime: z.number().min(0, "Closing time must be at least 0").max(95, "Closing time must be at most 95"),
  capacity: z.preprocess((val) => {
    if (typeof val === "string") return Number(val); // Parse string to number
    return val;
  }, z.number().positive("Capacity must be positive")),
  description: z.string().max(500, "Description must be 500 characters or less").optional(),
  department: z.nativeEnum(EDepartment, {
    errorMap: () => ({ message: "Invalid department" }),
  }),
  floorId: z.preprocess((val) => {
    if (typeof val === "string") return Number(val); // Parse string to number
    return val;
  }, z.number().positive("Floor ID must be positive")),
}).refine((data) => data.openingTime < data.closingTime, {
  message: "Opening time must be before closing time",
  path: ["openingTime"],
});

export type TRoomFormSchema = z.infer<typeof roomFormSchema>;
