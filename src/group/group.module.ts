import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { PrismaService } from 'src/prisma.service';
import { PermissionService } from './permission.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, PrismaService, PermissionService],
})
export class GroupModule {}
