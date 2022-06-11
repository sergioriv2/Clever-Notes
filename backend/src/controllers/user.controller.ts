/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '../entities';
import { UserService } from '../services/user.service';
import { User as UserDto } from '../dto/user.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(): string {
    return 'Hello world';
  }
}
