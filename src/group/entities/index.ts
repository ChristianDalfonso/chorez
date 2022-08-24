import { Role } from '@prisma/client';

export interface Permission {
  userId: number;
  groupId: number;
  role: Role;
}
