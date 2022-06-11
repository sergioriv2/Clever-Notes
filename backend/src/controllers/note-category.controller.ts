import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CategoryService, NoteCategoryService, NoteService } from '../services';
import { NoteCategory as NoteCategoryDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';
import { NotexCategory } from '../entities/note-category.entity';

@Controller('note-category')
export class NoteCategoryController {
  constructor(
    private readonly noteCategoryService: NoteCategoryService,
    private readonly categoryService: CategoryService,
    private readonly noteService: NoteService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/note/:noteId/')
  async getOne(@Param('noteId') noteId: number): Promise<NotexCategory> {
    return await this.noteCategoryService.findOne(noteId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/note/:noteId/')
  async create(
    @Param('noteId') noteId: number,
    @Body() categories: NoteCategoryDto,
    @Request() req,
  ): Promise<object> {
    // Validate the ID from the note requested, if it doesn't exist, throw a not found exception
    await this.noteService.getById(noteId, req.user.id);

    // Validate the ID from each category requested, if one doesn't exist, throw a not found exception
    const categoriesPromise = categories.categories.map((el) => {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.categoryService.getById(el));
        } catch (err) {
          reject(err);
        }
      });
    });

    // Wait the promises to resolve
    await Promise.all(categoriesPromise);

    const result = await this.noteCategoryService.create(noteId, categories);

    if (!result) throw new InternalServerErrorException();

    return { results: { msg: 'Opertaion completed successfully.' } };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<object> {
    await this.noteCategoryService.findOne(id);

    const result = await this.noteCategoryService.delete(id);

    if (!result) throw new InternalServerErrorException();

    return { results: { msg: 'Opertaion completed successfully.' } };
  }
}
