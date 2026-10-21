import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TReservationFormSchema } from '@/types/zodFormTypes/TZodReservationForm';
import { format } from 'date-fns';
import { api } from '@/lib/axios';
import { EBasicRoutes } from '@/enums/routes';
import { toast } from './use-toast';
import { AxiosError } from 'axios';

type TCreateReservationArgs = {
  roomId: number;
  onSuccess?: (date: Date) => void;
};

type TReservationPayload = {
  roomId: number;
  purpose: string;
  startTimeSlot: number;
  endTimeSlot: number;
  reservationDate: string; // ISO date string
  description?: string;
};

export const useReservationMutation = ({ roomId, onSuccess }: TCreateReservationArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TReservationFormSchema) => {
      const payload: TReservationPayload = {
        roomId,
        purpose: data.purpose,
        startTimeSlot: data.startTimeSlot,
        endTimeSlot: data.endTimeSlot,
        reservationDate: format(data.reservationDate, 'yyyy-MM-dd'),
        description: data.description
      };

      const response = await api.post(EBasicRoutes.RESERVATIONS, payload);
      return response.data;
    },
    onSuccess: (_, variables) => {
      toast({
        title: "Success!",
        description: "Your room reservation has been created.",
        variant: "default",
      });

      // Invalidate room bookings query for the specific date
      queryClient.invalidateQueries({
        queryKey: ['roomBookings', roomId, format(variables.reservationDate, 'yyyy-MM-dd')]
      });

      onSuccess?.(variables.reservationDate);
    },
    onError: (error: AxiosError) => {
      return error?.response?.data || "Failed to create reservation. Please try again.";
    }
  });
};