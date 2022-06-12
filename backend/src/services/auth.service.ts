/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User as UserDto } from '../dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, pass: string): Promise<any> {
    // Find user by email
    const user = await this.userService.findByEmail(email);

    // User not found
    if (!user) return null;

    // Check password
    const resultCompare = await this.comparePassword(pass, user.password);

    // Password doesn't match
    if (!resultCompare) return null;

    const { password, ...result } = user['dataValues'];

    return result;
  }

  async login(user: UserDto) {
    const payload = { id: user.id, email: user.email };

    console.log(payload);

    const token = await this.jwtService.signAsync(payload);

    return { token };
  }

  async signup(user: UserDto): Promise<any> {
    // Hash password
    const pass = user.password;
    const hashPass = await bcrypt.hash(pass, parseInt(process.env.HASH_ROUNDS));

    // Create new user
    const newUser = await this.userService.create({
      ...user,
      password: hashPass,
    });

    const { password, ...data } = newUser['dataValues'];

    // Generate JWT from the user
    const token = await this.jwtService.signAsync(data);

    return { user: data, token };
  }

  private async comparePassword(
    password: string,
    dbPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, dbPassword);
  }
}
