import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from '../services';
import { Category as CategoryDto } from 'src/dto';
import { Category as CategoryEntity } from 'src/entities';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Get()
  async getAll(): Promise<object> {
    const results = await this.categoriesService.getAll();

    return { results };
  }

  @Post()
  async create(@Body() category: CategoryDto): Promise<object> {
    const results = await this.categoriesService.create(category);
    return { results };
  }

  @Put('id')
  async update(
    @Body() category: CategoryDto,
    @Param('id') id: number,
  ): Promise<object> {
    const results = await this.categoriesService.update(category, id);

    if (!results) throw new InternalServerErrorException();

    return { results: { msg: 'Successfully updated.' } };
  }

  @Delete('id')
  async delete(@Param('id') id: number): Promise<object> {
    const results = await this.categoriesService.delete(id);
    if (!results) throw new InternalServerErrorException();

    return { results: { msg: 'Successfully deleted.' } };
  }
}
