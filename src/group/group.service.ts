import { Injectable } from '@nestjs/common';
import { Group, Prisma, Role } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { PrismaService } from 'src/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async createGroup(dto: CreateGroupDto, id: number): Promise<Group | null> {
    return this.prisma.group.create({
      data: {
        name: dto.name,
        users: {
          connect: [{ id }],
        },
        permissions: {
          create: [
            {
              userId: id,
              role: 'OWNER',
            },
          ],
        },
      },
    });
  }
  async deleteGroup(): Promise<Group | null> {
    return this.prisma.group.delete({
      where: {
        id: 3,
      },
    });
  }

  findGroupMembers(id: number): Promise<any> {
    return this.prisma.group.findUnique({
      where: { id },
      select: {
        users: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  findRoles(id: number): Promise<any> {
    return this.prisma.group.findUnique({
      where: { id },
      select: {
        permissions: {
          select: {
            userId: true,
            role: true,
          },
        },
      },
    });
  }
  findTasks(id: number): Promise<any> {
    return this.prisma.group.findUnique({
      where: {
        id,
      },
      select: {
        subGroup: {
          select: {
            id: true,
            task: true,
            due: true,
            users: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async findGroup(id: number): Promise<any> {
    return this.prisma.group.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        users: {
          select: { id: true, name: true },
        },
        subGroup: {
          select: {
            task: true,
            due: true,
            users: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
