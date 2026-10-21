import { TRoomReservationDto } from "@/types/dto/TRoomReservationDto";
import { TRoomReservationTableRow } from "@/types/TRoomReservationTableRow";

const formatTimeSlot = (slot: number): string => {
  const hours = Math.floor(slot / 4);
  const minutes = (slot % 4) * 15;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const createRoomSchedule = (
  reservations: TRoomReservationDto[],
  openingTimeSlot: number,
  closingTimeSlot: number
): TRoomReservationTableRow[] => {
  const schedule: TRoomReservationTableRow[] = [];
  const sortedReservations = [...reservations].sort((a, b) => a.startTimeSlot - b.startTimeSlot);
  
  const openingHour = openingTimeSlot; 
  const closingHour = closingTimeSlot; 
  let currentTimeSlot = openingHour;

  sortedReservations.forEach((reservation) => {
    if (currentTimeSlot < reservation.startTimeSlot) {
      schedule.push({
        time: `${formatTimeSlot(currentTimeSlot)} - ${formatTimeSlot(reservation.startTimeSlot)}`,
        user: 'FREE',
        purpose: '--'
      });
    }

    schedule.push({
      time: `${formatTimeSlot(reservation.startTimeSlot)} - ${formatTimeSlot(reservation.endTimeSlot)}`,
      user: `${reservation.user.firstName} ${reservation.user.lastName}`,
      purpose: reservation.purpose
    });

    currentTimeSlot = reservation.endTimeSlot;
  });

  if (currentTimeSlot < closingHour) {
    schedule.push({
      time: `${formatTimeSlot(currentTimeSlot)} - ${formatTimeSlot(closingHour)}`,
      user: 'FREE',
      purpose: '--'
    });
  }

  return schedule;
};
