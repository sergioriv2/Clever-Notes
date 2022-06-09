import { Injectable, Inject } from '@nestjs/common';

import { User } from './user.entity';
import { USER_REPOSITORY } from 'src/core/constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  //   async loginUser(): User {}
}
