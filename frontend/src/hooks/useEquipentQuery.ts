import { EBasicRoutes } from "@/enums/routes";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import {TEquipment} from "@/types/TEquipment.ts";
import {TEquipmentDto} from "@/types/dto/TEquipmentDto.ts";

const fetchEquipment = async (): Promise<TEquipment[]> => {
    const { data } = await api.get(`${EBasicRoutes.EQUIPMENT}`);
    console.log("data", data);
    return transformEquipmentResponse(data);
}

export const useEquipmentQuery = () => {
    return useQuery({
        queryKey: ['equipment'],
        queryFn: fetchEquipment,
        retry: false,
    })
}

const transformEquipmentResponse = (equipment: TEquipmentDto[]): TEquipment[] => {
    return equipment.map((equipment) => ({
        id: equipment.id,
        equipmentType: equipment.equipmentType,
        quantity: equipment.quantity,
        roomId: equipment.roomId,
    }))
}