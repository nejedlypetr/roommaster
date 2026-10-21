import { EBasicRoutes } from "@/enums/routes";
import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

const deleteEquipment = async (equipmentId?: number) => {
    if (!equipmentId) return;
    const { data } = await api.delete(`${EBasicRoutes.EQUIPMENT}/${equipmentId}`);
    return data;
}

type TDeleteEquipmentData = {
    equipmentId: number;
}

export const useDeleteEquipmentMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: ({ equipmentId }: TDeleteEquipmentData) => deleteEquipment(equipmentId),
        onSuccess: () => {
            toast({
                title: 'Equipment deleted successfully',
            });
            // Invalidate and refetch Equipment list
            queryClient.invalidateQueries({ queryKey: ['equipment'] });
        },
        onError: () => {
            toast({
                title: 'Failed to delete equipment, try again later',
                variant: 'destructive',
            });
        },
    });
};