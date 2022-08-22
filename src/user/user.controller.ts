import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.createUser(createUserDto);
      return 'user created';
    } catch (error) {
      throw new HttpException('Failed to Create User', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    try {
      await this.userService.updateUser({
        where: { id: req.session.passport.user.userId },
        data: { ...updateUserDto },
      });
      return 'user updated';
    } catch (error) {
      throw new HttpException('Failed to Update User', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Delete()
  async delete(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    try {
      let id = req.session.passport.user.userId;
      await this.userService.deleteUser({ id: Number(id) });
      req.session.destroy();
      return 'user deleted';
      return;
    } catch (error) {
      throw new HttpException('Failed to Delete User', HttpStatus.BAD_REQUEST);
    }
  }
}
