import { EEquipmentType } from './enums';

export type TEquipment = {
  id: number;
  equipmentType: EEquipmentType;
  quantity: number;
  roomId: number;
};
