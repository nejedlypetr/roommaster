import { create } from 'zustand';
import { createUserSlice, UserSlice } from './userSlice';
import { createRoomSlice, RoomSlice } from './roomSlice';
import { createReservationSlice, ReservationSlice } from './reservationSlice';

type StoreState = UserSlice & RoomSlice & ReservationSlice;

export const useStore = create<StoreState>((...a) => ({
  ...createUserSlice(...a),
  ...createRoomSlice(...a),
  ...createReservationSlice(...a),
}));
