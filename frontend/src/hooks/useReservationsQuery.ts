import { EBasicRoutes } from "@/enums/routes";
import { api } from "@/lib/axios";
import { TReservation } from "@/types/TReservation";
import { useQuery } from "@tanstack/react-query";

const fetchReservations = async (userId?: number): Promise<TReservation[]> => {
    if (!userId) {
        return [];
    }
    const { data } = await api.get(`${EBasicRoutes.RESERVATIONS}${userId ? `${EBasicRoutes.USERS}/${userId}` : ''}`);
    return data;
}

type TUseReservationsQuery = {
    userId?: number;
}

export const useReservationsQuery = ({ userId }: TUseReservationsQuery) => {
    return useQuery({
        queryKey: ['reservations', userId],
        queryFn: () => fetchReservations(userId),
    })
}