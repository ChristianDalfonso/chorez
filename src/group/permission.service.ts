import { Injectable } from '@nestjs/common';
import { Permission, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Permission as PermissionEnt } from './entities';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  createPermission(data: PermissionEnt): Promise<Permission | null> {
    return this.prisma.permission.create({
      data,
    });
  }

  findAll() {
    return `This action returns all group`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
