import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NOTE_CATEGORY_REPOSITORY } from 'src/core/constants';
import { NotexCategory } from '../entities';
import { NoteCategory } from '../dto/';

@Injectable()
export class NoteCategoryService {
  constructor(
    @Inject(NOTE_CATEGORY_REPOSITORY)
    private readonly noteCategoryRepository: typeof NotexCategory,
  ) {}

  async findOne(id: number): Promise<NotexCategory> {
    const result = await this.noteCategoryRepository.findOne({ where: { id } });

    if (!result) throw new NotFoundException();

    return result;
  }

  async create(noteId: number, noteCategory: NoteCategory): Promise<boolean> {
    // Create a new promise for each category
    const promises = noteCategory.categories.map((el) => {
      return new Promise((resolve, reject) => {
        try {
          resolve(
            this.noteCategoryRepository.create({ noteId, categoryId: el }),
          );
        } catch (err) {
          reject(err);
        }
      });
    });

    // Wait the promises
    await Promise.all(promises);

    return true;
  }

  async delete(id: number): Promise<boolean> {
    await this.noteCategoryRepository.destroy({ where: { id } });

    return true;
  }
}
