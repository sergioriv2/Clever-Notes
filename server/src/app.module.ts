import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule, AuthModule } from './modules';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [AuthController, AppController],
  providers: [AppService],
})
export class AppModule {}
