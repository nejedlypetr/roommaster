import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { EBasicRoutes } from '@/enums/routes';
import { toast } from './use-toast';
import {TFloorFormSchema} from "@/types/zodFormTypes/TZodFloorForm.ts";

export const useCreateFloorMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TFloorFormSchema) => {
            const response = await api.post(`${EBasicRoutes.FLOORS}`, data);
            return response.data;
        },
        onSuccess: () => {
            toast({
                title: 'Floor added successfully',
            });
            // Invalidate and refetch the rooms list to show the new room
            queryClient.invalidateQueries({ queryKey: ['floors'] });
        },
        onError: () => {
            toast({
                title: 'Failed to add floor, try again later',
                variant: 'destructive',
            });
        },
    });
};
