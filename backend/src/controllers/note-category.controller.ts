import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
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
  async getCategories(@Param('noteId') noteId: number): Promise<object> {
    const results = await this.noteCategoryService.findCategoriesByNoteId(
      noteId,
    );

    return { results };
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/category/:categoryId/')
  async getNotes(@Param('categoryId') categoryId: number): Promise<object> {
    const results = await this.noteCategoryService.findNotesByCategoryId(
      categoryId,
    );

    return { results };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/note/:noteId/')
  async create(
    @Param('noteId') noteId: number,
    @Body() categories: NoteCategoryDto,
    @Request() req,
  ): Promise<object> {
    // Validate the ID from each category requested, if one doesn't exist, throw a not found exception
    const categoriesPromise = categories.categories.map((el) => {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.categoryService.getById(el, req.user.id));
        } catch (err) {
          reject(err);
        }
      });
    });

    // Wait the promises to resolve
    await Promise.all(categoriesPromise);

    // const exisintgCategories = categories.categories.map((el) => {
    //   return new Promise((resolve, reject) => {
    //     try {
    //       resolve(this.noteCategoryService.(el, req.user.id));
    //     } catch (err) {
    //       reject(err);
    //     }
    //   });
    // });

    const result = await this.noteCategoryService.create(noteId, categories);

    if (!result) throw new InternalServerErrorException();

    return { results: { msg: 'Operation completed successfully.' } };
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
