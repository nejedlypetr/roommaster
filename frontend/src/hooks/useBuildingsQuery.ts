import { EBasicRoutes } from "@/enums/routes";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import {TBuilding} from "@/types/TBuilding.ts";
import {TBuildingDto} from "@/types/dto/TBuildingDto.ts";

const fetchBuildings = async (): Promise<TBuilding[]> => {
    const { data } = await api.get(`${EBasicRoutes.BUILDINGS}`);
    console.log("data", data);
    return transformBuildingsResponse(data);
}

export const useBuildingsQuery = () => {
    return useQuery({
        queryKey: ['buildings'],
        queryFn: fetchBuildings,
        retry: false,
    })
}

const transformBuildingsResponse = (buildings: TBuildingDto[]): TBuilding[] => {
    return buildings.map((building) => ({
        id: building.id,
        name: building.name,
        street: building.street,
        city: building.city,
        postalCode: building.postalCode,
    }))
}