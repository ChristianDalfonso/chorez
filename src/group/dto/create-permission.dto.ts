import { Role } from '@prisma/client';
export class CreatePermissionDto {
  userId: number;
  groupId: number;
  role: Role;
}
