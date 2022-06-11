import { Injectable, Inject, BadRequestException } from '@nestjs/common';

import { User } from '../entities';
import { USER_REPOSITORY } from 'src/core/constants';
import { User as UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
  ) {}

  async logIn(email: string, password: string): Promise<User> {
    return this.userRepository.findOne({ where: { email, password } });
  }

  async create(user: UserDto): Promise<any> {
    const findUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (findUser !== null)
      throw new BadRequestException('An user with this email already exists.');

    const date = new Date();

    // Create new user
    return await this.userRepository.create<User>({
      ...user,
      createdAt: date,
      updatedAt: date,
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  //   async loginUser(): User {}
}
