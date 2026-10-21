import { EBasicRoutes } from "@/enums/routes";
import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

const deleteBuilding = async (buildingId?: number) => {
    if (!buildingId) return;
    const { data } = await api.delete(`${EBasicRoutes.BUILDINGS}/${buildingId}`);
    return data;
}

type TDeleteBuildingData = {
  buildingId: number;
}

export const useDeleteBuildingMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: ({ buildingId }: TDeleteBuildingData) => deleteBuilding(buildingId),
        onSuccess: () => {
            toast({
                title: 'Building deleted successfully',
            });
            // Invalidate and refetch rooms list
            queryClient.invalidateQueries({ queryKey: ['buildings'] });
            queryClient.invalidateQueries({ queryKey: ['floors'] });
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
        },
        onError: () => {
            toast({
                title: 'Failed to delete building, try again later',
                variant: 'destructive',
            });
        },
    });
};