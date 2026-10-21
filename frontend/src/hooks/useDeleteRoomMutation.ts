import { EBasicRoutes } from "@/enums/routes";
import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

const deleteRoom = async (roomId?: number) => {
    if (!roomId) return;
    const { data } = await api.delete(`${EBasicRoutes.ROOMS}/${roomId}`);
    return data;
}

type TDeleteRoomData = {
  roomId: number;
}

export const useDeleteRoomMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: ({ roomId }: TDeleteRoomData) => deleteRoom(roomId),
        onSuccess: () => {
            toast({
                title: 'Room deleted successfully',
            });
            // Invalidate and refetch rooms list
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
        },
        onError: () => {
            toast({
                title: 'Failed to delete room, try again later',
                variant: 'destructive',
            });
        },
    });
};