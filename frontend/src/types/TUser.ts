import { EDepartment, EUserRole } from './enums';

export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: EDepartment;
  isHeadOfDepartment: boolean;
  role: EUserRole;
};