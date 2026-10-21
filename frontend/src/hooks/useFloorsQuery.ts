import { EBasicRoutes } from "@/enums/routes";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import {TFloor} from "@/types/TFloor.ts";
import {TFloorDto} from "@/types/dto/TFloorDto.ts";

const fetchFloors = async (): Promise<TFloor[]> => {
    const { data } = await api.get(`${EBasicRoutes.FLOORS}`);
    console.log("data", data);
    return transformFloorsResponse(data);
}

export const useFloorsQuery = () => {
    return useQuery({
        queryKey: ['floors'],
        queryFn: fetchFloors,
        retry: false,
    })
}

const transformFloorsResponse = (floors: TFloorDto[]): TFloor[] => {
    return floors.map((floor) => ({
        id: floor.id,
        floorNumber: floor.floorNumber,
        buildingId: floor.buildingId
    }))
}