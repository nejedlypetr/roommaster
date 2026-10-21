import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TRoomFormSchema } from '@/types/zodFormTypes/TZodRoomForm';
import { api } from '@/lib/axios';
import { EBasicRoutes } from '@/enums/routes';
import { toast } from './use-toast';

export const useCreateRoomMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TRoomFormSchema) => {
            const response = await api.post(`${EBasicRoutes.ROOMS}`, data);
            return response.data;
        },
        onSuccess: () => {
            toast({
                title: 'Room added successfully',
            });
            // Invalidate and refetch the rooms list to show the new room
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
        },
        onError: () => {
            toast({
                title: 'Failed to add room, try again later',
                variant: 'destructive',
            });
        },
    });
};
