import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TEquipmentFormSchema } from '@/types/zodFormTypes/TZodEquipmentForm';
import { api } from '@/lib/axios';
import { EBasicRoutes } from '@/enums/routes';
import { toast } from './use-toast';

export const useCreateEquipmentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TEquipmentFormSchema) => {
            const { roomId, ...equipmentData } = data; // Extract roomId from the payload
            const response = await api.post(`${EBasicRoutes.ROOMS}/${roomId}/equipment`, equipmentData);
            return response.data;
        },
        onSuccess: () => {
            toast({
                title: 'Equipment added successfully',
            });
            // Invalidate and refetch the equipment list
            queryClient.invalidateQueries({ queryKey: ['equipment'] });
        },
        onError: () => {
            toast({
                title: 'Failed to add equipment, try again later',
                variant: 'destructive',
            });
        },
    });
};
