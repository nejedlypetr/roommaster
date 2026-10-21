import { StateCreator } from 'zustand';
import { TReservation } from '../types/TReservation';

export interface ReservationSlice {
  reservations: TReservation[];
  setReservations: (reservations: TReservation[]) => void;
  addReservation: (reservation: TReservation) => void;
  removeReservation: (reservationId: number) => void;
}

export const createReservationSlice: StateCreator<ReservationSlice> = (set) => ({
  reservations: [],
  setReservations: (reservations) => set({ reservations }),
  addReservation: (reservation) => 
    set((state) => ({ reservations: [...state.reservations, reservation] })),
  removeReservation: (reservationId) => 
    set((state) => ({
      reservations: state.reservations.filter(r => r.id !== reservationId)
    })),
});
