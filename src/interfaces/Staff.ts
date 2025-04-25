import { Permission } from "./Permission";
import { Role } from "./Role";

export interface Staff {
  id: number;
  name: string;
  birthday: Date;
  email: string;
  role: Role;
  permissions: Permission[];
  createAt: Date;
  updateAt: Date;
}
