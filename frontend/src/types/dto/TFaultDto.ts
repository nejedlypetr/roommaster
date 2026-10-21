import { TFaultLog } from '../TFaultLog';
import { ERoomType, EDepartment } from '../enums';

export type TFaultDto = {
  // Fault properties
  fault_id: TFaultLog['id'];
  cause: TFaultLog['cause'];
  description: TFaultLog['description'];
  fault_date: TFaultLog['faultDate'];
  created: TFaultLog['created'];
  resolved: TFaultLog['resolved'];

  // Room properties
  room_id: number;
  room_name: string;
  room_number: number;
  room_type: ERoomType;
  room_department: EDepartment;

  // Floor properties
  floor_id: number;
  floor_number: number;

  // Building properties
  building_id: number;
  building_name: string;
  building_street: string;
  building_city: string;
  building_postal_code: string;
};
