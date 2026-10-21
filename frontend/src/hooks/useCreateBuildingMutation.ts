import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TBuildingFormSchema } from '@/types/zodFormTypes/TZodBuildingForm';
import { api } from '@/lib/axios';
import { EBasicRoutes } from '@/enums/routes';
import { toast } from './use-toast';

export const useCreateBuildingMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TBuildingFormSchema) => {
            const response = await api.post(`${EBasicRoutes.BUILDINGS}`, data);
            return response.data;
        },
        onSuccess: () => {
            toast({
                title: 'Building added successfully',
            });
            // Invalidate and refetch the rooms list to show the new room
            queryClient.invalidateQueries({ queryKey: ['buildings'] });
        },
        onError: () => {
            toast({
                title: 'Failed to add building, try again later',
                variant: 'destructive',
            });
        },
    });
};
