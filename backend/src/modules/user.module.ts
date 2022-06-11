import { UserService } from '../services/user.service';
import { Module } from '@nestjs/common';
import { usersProviders } from '../providers/user.provider';

import { UserController } from '../controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
  exports: [UserService],
})
export class UserModule {}
