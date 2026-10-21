import { EBasicRoutes } from "@/enums/routes";
import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

const deleteFloor = async (floorId?: number) => {
    if (!floorId) return;
    const { data } = await api.delete(`${EBasicRoutes.FLOORS}/${floorId}`);
    return data;
}

type TDeleteFloorData = {
  floorId: number;
}

export const useDeleteFloorMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: ({ floorId }: TDeleteFloorData) => deleteFloor(floorId),
        onSuccess: () => {
            toast({
                title: 'Floor deleted successfully',
            });
            // Invalidate and refetch rooms list
            queryClient.invalidateQueries({ queryKey: ['floors'] });
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
        },
        onError: () => {
            toast({
                title: 'Failed to delete floor, try again later',
                variant: 'destructive',
            });
        },
    });
};