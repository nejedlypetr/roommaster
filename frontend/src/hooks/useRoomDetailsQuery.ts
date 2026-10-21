import { EBasicRoutes } from "@/enums/routes";
import { api } from "@/lib/axios";
import { TRoomDetailsDto } from "@/types/dto/TRoomDetailsDto";
import { TRoom } from "@/types/TRoom";
import { useQuery } from "@tanstack/react-query";

const fetchRoomDetail = async (roomId: number): Promise<TRoom> => {
    const { data } = await api.get(`${EBasicRoutes.ROOMS}/${roomId}`);
    return transformRoomDetailResponse(data);
}

export const useRoomDetailsQuery = (roomId: number) => {
    return useQuery({
        queryKey: ['room', roomId],
        queryFn: () => fetchRoomDetail(roomId),
    })
}

const transformRoomDetailResponse = (response: TRoomDetailsDto): TRoom => {
    return {
        id: response.roomData.roomId,
        roomType: response.roomData.roomType,
        roomNumber: response.roomData.roomNumber,
        openingTime: response.roomData.openingTime,
        closingTime: response.roomData.closingTime,
        capacity: response.roomData.capacity,
        description: response.roomData.roomDescription,
        department: response.roomData.department,
        floor: {
            id: response.roomData.floorId,
            floorNumber: response.roomData.floorNumber,
        },
        building: {
            id: response.roomData.buildingId,
            name: response.roomData.buildingName,
            street: response.roomData.buildingStreet,
            city: response.roomData.buildingCity,
            postalCode: response.roomData.buildingPostalCode,
        },
        faultLogs: response.faultLogs,
        equipment: response.equipment,
    }
}
