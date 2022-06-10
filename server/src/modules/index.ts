import { CategoryModule } from './category.module';
import { NoteModule } from './note.module';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { DatabaseModule } from '../core/database/database.module';

export const Modules = [
  CategoryModule,
  DatabaseModule,
  NoteModule,
  UserModule,
  AuthModule,
];
