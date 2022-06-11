import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../services';
import { Category as CategoryDto } from 'src/dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Get()
  async getAll(): Promise<object> {
    const results = await this.categoriesService.getAll();

    return { results };
  }
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() category: CategoryDto): Promise<object> {
    const results = await this.categoriesService.create(category);
    return { results };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('id')
  async update(
    @Body() category: CategoryDto,
    @Param('id') id: number,
  ): Promise<object> {
    const results = await this.categoriesService.update(category, id);

    if (!results) throw new InternalServerErrorException();

    return { results: { msg: 'Successfully updated.' } };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('id')
  async delete(@Param('id') id: number): Promise<object> {
    const results = await this.categoriesService.delete(id);
    if (!results) throw new InternalServerErrorException();

    return { results: { msg: 'Successfully deleted.' } };
  }
}
