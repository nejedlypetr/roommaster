import {TEquipment} from "@/types/TEquipment.ts";

// TODO. delete, probably obsolete
export type TEquipmentDto = {
  // Equipment properties
  id: TEquipment['id'];
  equipmentType: TEquipment['equipmentType'];
  quantity: TEquipment['quantity'];
  roomId: TEquipment['roomId'];
};
