import { Permission, SubGroup, User } from '@prisma/client';

export class CreateGroupDto {
  name: string;
  users: User[];
  //   subGroup: SubGroup[];
  permissions: Permission[];
}
