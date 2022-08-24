import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { Prisma, Permission } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    try {
      const result = await this.prisma.permission.findUnique({
        where: {
          userId_groupId: {
            userId: +request.user.userId,
            groupId: +request.params.id,
          },
        },
        select: {
          role: true,
        },
      });
      return matchRoles(roles, result.role);
    } catch (error) {
      return false;
    }
  }
}
function matchRoles(roles: Role[], role): boolean {
  console.log(roles, role);

  return roles.includes(role);
}
