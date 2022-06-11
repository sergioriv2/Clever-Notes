import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthService } from 'src/services';
import { User as UserDto } from '../dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const token = await this.authService.login(req.user);

    return { token };
  }

  @Post('signup')
  async signup(@Body() user: UserDto) {
    const token = await this.authService.signup(user);
    return { token };
  }
}
