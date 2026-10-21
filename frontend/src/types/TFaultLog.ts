import { TRoom } from './TRoom';

export type TFaultLog = {
  id: number;
  room: TRoom;
  cause: string;
  description: string;
  faultDate: Date;
  created: Date;
  resolved: boolean;
};