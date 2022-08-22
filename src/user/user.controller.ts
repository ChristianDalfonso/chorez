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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    let createdUser = await this.userService.createUser(createUserDto);
    return createdUser.username;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('update')
  async update(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    // let createdUser = await this.userService.updateUser(updateUserDto);
    // return createdUser.username;
    console.log(req.session);
  }
}
