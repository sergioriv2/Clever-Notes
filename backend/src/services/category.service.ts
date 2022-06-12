import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from 'src/core/constants';
import { Category } from 'src/entities';
import { Category as CategoryDto } from '../dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
  ) {}

  // Get all categories
  async getAll(userId: number): Promise<Category[]> {
    return await this.categoryRepository.findAll<Category>({
      where: { deletedAt: null, userId },
      attributes: ['id', 'description'],
    });
  }

  // Get a single category
  async getById(id: number, userId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne<Category>({
      where: { deletedAt: null, userId, id },
    });

    if (!category)
      throw new NotFoundException(`Category with id ${id} Not found`);

    return category;
  }

  // Create a new category
  async create(category: CategoryDto, userId: number): Promise<Category> {
    const date = new Date();
    return await this.categoryRepository.create<Category>({
      description: category.description,
      userId,
      createdAt: date,
      updatedAt: date,
    });
  }

  // Update a category
  async update(category: CategoryDto, id: number): Promise<boolean> {
    const data = await this.categoryRepository.findOne<Category>({
      where: { id },
    });

    if (!data) throw new NotFoundException('Category not found.');

    data.set({
      ...category,
      updatedAt: new Date(),
    });

    await data.save();

    return true;
  }

  // Delete a category
  async delete(id: number): Promise<boolean> {
    const data = await this.categoryRepository.findOne<Category>({
      where: { id },
    });

    if (!data) throw new NotFoundException('Category not found.');

    await data.destroy();

    return true;
  }
}
