import { EBasicRoutes } from "@/enums/routes";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import {TUser} from "@/types/TUser.ts";
import {TUserDto} from "@/types/dto/TUserDto.ts";

const fetchUsers = async (): Promise<TUser[]> => {
    const { data } = await api.get(`${EBasicRoutes.USERS}`);
    console.log("data", data);
    return transformUsersResponse(data);
}

export const useUsersQuery = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        retry: false,
    })
}

const transformUsersResponse = (users: TUserDto[]): TUser[] => {
    return users.map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        department: user.department,
        role: user.role,
        isHeadOfDepartment: user.isHeadOfDepartment,
    }))
}