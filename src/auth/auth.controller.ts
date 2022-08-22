import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './local.auth.guard';

@Controller('auth')
export class AuthController {
  //Post / Login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    return { User: req.user, msg: 'User logged in' };
  }
}
