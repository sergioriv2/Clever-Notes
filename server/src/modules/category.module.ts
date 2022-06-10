import { Module } from '@nestjs/common';
import { CategoryController } from 'src/controllers';
import { CategoryService } from 'src/services';
import { categoriesProviders } from '../providers';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, ...categoriesProviders],
  exports: [CategoryService],
})
export class CategoryModule {}
