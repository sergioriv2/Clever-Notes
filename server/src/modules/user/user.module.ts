import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { usersProviders } from './user.provider';

@Module({
  providers: [UserService, ...usersProviders],
  exports: [UserService],
})
export class UserModule {}
