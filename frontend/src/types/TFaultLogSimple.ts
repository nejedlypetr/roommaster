export type TFaultLogSimple = {
  id: number;
  roomId: number;
  description: string;
  cause: string;
  created: Date;
  resolved: boolean;
};
