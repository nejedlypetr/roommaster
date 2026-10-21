import {TUser} from "@/types/TUser.ts";

export type TUserDto = {
  // User properties
  id: TUser['id'];
  firstName: TUser['firstName'];
  lastName: TUser['lastName'];
  email: TUser['email'];
  department: TUser['department'];
  role: TUser['role'];
  isHeadOfDepartment: TUser['isHeadOfDepartment'];
};
