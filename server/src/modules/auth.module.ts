import { Module } from '@nestjs/common';
import { AuthService } from '../services';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../controllers/local.strategy';
import { AuthController } from 'src/controllers/auth.controller';
import { JwtStrategy } from '../controllers/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  // exports: [AuthService],
})
export class AuthModule {}
