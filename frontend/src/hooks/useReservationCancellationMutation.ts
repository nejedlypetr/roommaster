import { EBasicRoutes } from "@/enums/routes";
import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

const cancelReservation = async (reservationId?: number) => {
    if (!reservationId) return;
    const { data } = await api.patch(`${EBasicRoutes.RESERVATIONS}/${reservationId}/cancel`);
    return data;
}

type TCancelReservationData = {
  reservationId: number;
}

export const useReservationCancellationMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: ({ reservationId }: TCancelReservationData) => cancelReservation(reservationId),
        onSuccess: () => {
            toast({
                title: 'Reservation cancelled successfully',
            });
            // Invalidate and refetch reservations list
            queryClient.invalidateQueries({ queryKey: ['reservations'] });
        },
        onError: () => {
            toast({
                title: 'Failed to cancel reservation, try again later',
                variant: 'destructive',
            });
        },
    });
};