import { EReservationPurpose, EReservationStatus } from './enums';

export type TReservation = {
  id: number;
  roomId: number;
  userId: number;
  purpose: EReservationPurpose;
  startTimeSlot: number;    //timeslot
  endTimeSlot: number;      //timeslot
  created: Date;
  description?: string;
  status: EReservationStatus;
  reservationDate: Date;
};
