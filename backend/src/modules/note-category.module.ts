import { NoteCategoryController } from '../controllers';
import { Module } from '@nestjs/common';
import { noteCategoryProviders } from '../providers';
import { NoteCategoryService } from '../services';
import { NoteModule } from './note.module';
import { CategoryModule } from './category.module';

@Module({
  imports: [NoteModule, CategoryModule],
  controllers: [NoteCategoryController],
  providers: [NoteCategoryService, ...noteCategoryProviders],
  exports: [NoteCategoryService],
})
export class NoteCategoryModule {}
