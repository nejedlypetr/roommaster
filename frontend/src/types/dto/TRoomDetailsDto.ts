import { TRoomDto } from './TRoomDto';
import { TEquipment } from '../TEquipment';
import { TFaultLog } from '../TFaultLog';

export type TRoomDetailsDto = {
  roomData: TRoomDto;
  equipment: TEquipment[];
  faultLogs: TFaultLog[];
};
