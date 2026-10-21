import { EBasicRoutes } from "@/enums/routes";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { TFaultLog } from "@/types/TFaultLog.ts";
import { TFaultDto } from "@/types/dto/TFaultDto.ts";
import {TFaultLogSimple} from "@/types/TFaultLogSimple.ts";
import {TFaultLogDtoSimple} from "@/types/dto/TFaultLogDtoSimple.ts";

const fetchFaultLogs = async (): Promise<TFaultLogSimple[]> => {
    const { data } = await api.get(`${EBasicRoutes.FAULTS}`);
    console.log("data", data);
    return transformFaultLogsResponse(data);
}

export const useFaultLogsQuery = () => {
    return useQuery({
        queryKey: ['faultLogs'],
        queryFn: fetchFaultLogs,
        retry: false,
    })
}

const transformFaultLogsResponse = (faultLogs: TFaultLogDtoSimple[]): TFaultLogSimple[] => {
    return faultLogs.map((faultLog) => ({
        id: faultLog.id,
        roomId: faultLog.roomId,
        description: faultLog.description,
        cause: faultLog.cause,
        created: faultLog.created,
        resolved: faultLog.resolved,
    }));
};
