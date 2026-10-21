import { EBasicRoutes } from "@/enums/routes";
import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

const resolveFaultLog = async (faultLogId?: number, roomId?: number) => {
    if (!faultLogId || !roomId) return;

    // Include the request body
    const { data } = await api.patch(`${EBasicRoutes.ROOMS}/${roomId}/faults/${faultLogId}/resolve`, {
        resolved: true, // Payload for the request body
    });

    return data;
};

type TResolveFaultLogData = {
    faultLogId: number;
    roomId: number;
};

export const useResolveFaultLogMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: ({ faultLogId, roomId }: TResolveFaultLogData) => resolveFaultLog(faultLogId, roomId),
        onSuccess: () => {
            toast({
                title: 'Fault log resolved successfully',
            });
            // Invalidate and refetch fault logs
            queryClient.invalidateQueries({ queryKey: ['faultLogs'] });
        },
        onError: () => {
            toast({
                title: 'Failed to resolve fault log, try again later',
                variant: 'destructive',
            });
        },
    });
};
