import { z } from "zod";
import {EEquipmentType} from "@/types/enums.ts";

export const equipmentFormSchema = z.object({
  equipmentType: z.nativeEnum(EEquipmentType, {
    errorMap: () => ({ message: "Invalid equipment type" }),
  }),
  quantity: z.preprocess((val) => {
    if (typeof val === "string") return Number(val); // Parse string to number
    return val;
  }, z.number().positive("quantity must be positive")),
  roomId: z.preprocess((val) => {
    if (typeof val === "string") return Number(val); // Parse string to number
    return val;
  }, z.number().positive("Room Id must be positive")),
});

export type TEquipmentFormSchema = z.infer<typeof equipmentFormSchema>;
