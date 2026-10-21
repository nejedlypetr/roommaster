import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TFaultFormSchema } from '@/types/zodFormTypes/TZodFaultForm';
import { api } from '@/lib/axios';
import { EBasicRoutes } from '@/enums/routes';
import { toast } from './use-toast';

type TUseRoomFaultMutationArgs = {
  roomId: number;
};

export const useRoomFaultMutation = ({ roomId }: TUseRoomFaultMutationArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TFaultFormSchema) => {
      const response = await api.post(`${EBasicRoutes.ROOMS}/${roomId}/faults`, data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: 'Fault added successfully',
      });
      // Invalidate and refetch room details to get updated fault list
      queryClient.invalidateQueries({ queryKey: ['room', roomId] });
    },
    onError: () => {
      toast({
        title: 'Failed to add fault, try again later',
        variant: 'destructive',
      });
    },
  });
};