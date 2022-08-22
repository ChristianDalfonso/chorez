import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  username: string;
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
