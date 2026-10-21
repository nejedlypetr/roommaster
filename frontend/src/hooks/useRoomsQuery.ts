import { EBasicRoutes } from "@/enums/routes";
import { api } from "@/lib/axios";
import { TRoomDto } from "@/types/dto/TRoomDto";
import { TRoom } from "@/types/TRoom";
import { useQuery } from "@tanstack/react-query";

const fetchRooms = async (): Promise<TRoom[]> => {
    const { data } = await api.get(`${EBasicRoutes.ROOMS}`);
    console.log("data", data);
    return transformRoomsResponse(data);
}

export const useRoomsQuery = () => {
    return useQuery({
        queryKey: ['rooms'],
        queryFn: fetchRooms,
        retry: false,
    })
}

const transformRoomsResponse = (rooms: TRoomDto[]): TRoom[] => {
    return rooms.map((room) => ({
        id: room.roomId,
        roomType: room.roomType,
        roomNumber: room.roomNumber,
        openingTime: room.openingTime,
        closingTime: room.closingTime,
        capacity: room.capacity,
        description: room.roomDescription,
        department: room.department,
        floor: {
            id: room.floorId,
            floorNumber: room.floorNumber,
        },
        building: {
            id: room.buildingId,
            name: room.buildingName,
            street: room.buildingStreet,
            city: room.buildingCity,
            postalCode: room.buildingPostalCode,
        },
        faultLogs: [],
        equipment: [],
    }))
}