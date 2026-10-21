import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { EBasicRoutes } from '@/enums/routes';
import { toast } from './use-toast';
import { TQuickReservationFormSchema } from "@/types/zodFormTypes/TZodQuickReservationForm.ts";
import { format } from "date-fns";
import { AxiosError } from "axios";

export const useQuickReservationMutation = () => {
    const queryClient = useQueryClient();

    type TQuickReservationPayload = {
        roomId: number;
        purpose: string;
        startTimeSlot: number;
        endTimeSlot: number;
        reservationDate: string; // ISO date string
        description?: string;
    };

    return useMutation({
        mutationFn: async (data: TQuickReservationFormSchema) => {
            const payload: TQuickReservationPayload = {
                roomId: data.roomId,
                purpose: data.purpose,
                startTimeSlot: data.startTimeSlot,
                endTimeSlot: data.endTimeSlot,
                reservationDate: format(data.reservationDate, 'yyyy-MM-dd'),
                description: data.description
            };

            const response = await api.post(EBasicRoutes.RESERVATIONS, payload);
            return response.data;
        },
        onSuccess: () => {
            toast({
                title: 'Reservation created successfully',
            });
            // Invalidate and refetch the reservations list to show the new room
            queryClient.invalidateQueries({ queryKey: ['reservations'] });
        },
        onError: (error: AxiosError) => {
            let errorMessage = "Failed to create reservation. Please try again.";

            // Check for known error responses
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = "Invalid input. Please check your reservation details.";
                        break;
                    case 401:
                        errorMessage = "You are not authorized to make this reservation.";
                        break;
                    case 409:
                        errorMessage = "Room is not available for the selected date and time slots.";
                        break;
                    default:
                        errorMessage = "An unexpected error occurred. Please try again.";
                        break;
                }
            }

            // Show detailed error to the user
            toast({
                title: 'Failed to create reservation',
                description: errorMessage,
                variant: 'destructive',
            });
        },
    });
};
