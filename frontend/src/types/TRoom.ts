import { ERoomType, EDepartment } from './enums';
import { TBuilding } from './TBuilding';
import { TEquipment } from './TEquipment';
import { TFaultLog } from './TFaultLog';
import { TFloor } from './TFloor';

export type TRoom = {
  id: number;
  roomType: ERoomType;
  roomNumber: number;
  openingTime: number; //timeslot?
  closingTime: number; //timeslot?
  capacity: number;
  description?: string;
  department: EDepartment;
  floor: TFloor;
  building: TBuilding;
  faultLogs: TFaultLog[];
  equipment: TEquipment[];
};
