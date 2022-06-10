import { Category } from '../entities';
import { CATEGORY_REPOSITORY as repo } from '../core/constants';

export const categoriesProviders = [
  {
    provide: repo,
    useValue: Category,
  },
];
