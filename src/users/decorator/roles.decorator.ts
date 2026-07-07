import { SetMetadata } from "@nestjs/common";
import { UserType } from "../user-role.enum";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserType[]) => SetMetadata(ROLES_KEY, roles);
