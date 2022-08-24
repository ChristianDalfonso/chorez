import { Injectable } from '@nestjs/common';
import { Role, Prisma, Permission } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}
  async post(
    permissionWhereUniqueInput: Prisma.PermissionWhereUniqueInput,
  ): Promise<Permission | null> {
    return this.prisma.permission.findUnique({
      where: {
        userId_groupId: {
          userId: 1,
          groupId: 1,
        },
      },
    });
  }
}
