import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @Request() req) {
    const id = req.session.passport.user.userId;
    return this.groupService.createGroup(createGroupDto, id);
  }

  @UseGuards(AuthenticatedGuard)
  @Roles('OWNER', 'ADMIN', 'User')
  @Get('/:id')
  findGroup(@Param('id') id: string) {
    return this.groupService.findGroup(+id);
  }
  @UseGuards(AuthenticatedGuard)
  @Roles('OWNER', 'ADMIN', 'User')
  @Get('/:id/tasks')
  findGroupTasks(@Param('id') id: string) {
    return this.groupService.findTasks(+id);
  }
  @UseGuards(AuthenticatedGuard)
  @Roles('OWNER', 'ADMIN', 'User')
  @Get('/:id/roles')
  findGroupRoles(@Param('id') id: string) {
    return this.groupService.findRoles(+id);
  }
  @Roles('OWNER', 'ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Roles('OWNER')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.deleteGroup();
  }
}
