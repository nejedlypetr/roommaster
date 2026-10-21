import { EBasicRoutes } from '@/enums/routes';
import { api } from '@/lib/axios';
import { TRoomReservationDto } from '@/types/dto/TRoomReservationDto';
import { EReservationPurpose, EReservationStatus } from '@/types/enums';
import { arrayToDate } from '@/utils/dateUtils';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

const fetchRoomBookings = async (roomId: number, date?: Date): Promise<TRoomReservationDto[]> => {
  if (!date){
    return [];
  }
  
  const formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
  const { data } = await api.get(
    `${EBasicRoutes.RESERVATIONS}${EBasicRoutes.ROOMS}/${roomId}`, { params: { date: formattedDate } }
  );
  return data.map(mapReservationResponse);
}

type TUseRoomBookingsQueryArgs = {
  roomId: number;
  date?: Date;
};

export const useRoomBookingsQuery = ({ roomId, date }: TUseRoomBookingsQueryArgs) => {
  return useQuery({
    queryKey: ['roomBookings', roomId, format(date ?? new Date(), 'yyyy-MM-dd')],
    queryFn: () => fetchRoomBookings(roomId, date),
    enabled: !!date,
  });
};

type TRawReservationResponse = {
  id: number;
  roomId: number;
  userId: number;
  firstName: string;
  lastName: string;
  purpose: string;
  startTimeSlot: number;
  endTimeSlot: number;
  created: number[];
  description: string;
  status: string;
  reservationDate: number[];
};


export const mapReservationResponse = (raw: TRawReservationResponse): TRoomReservationDto => ({
  id: raw.id,
  roomId: raw.roomId,
  user: {
    firstName: raw.firstName,
    lastName: raw.lastName,
  },
  userId: raw.userId,
  purpose: raw.purpose as EReservationPurpose,
  status: raw.status as EReservationStatus,
  startTimeSlot: raw.startTimeSlot,
  endTimeSlot: raw.endTimeSlot,
  created: arrayToDate(raw.created),
  reservationDate: arrayToDate(raw.reservationDate),
  description: raw.description,
});