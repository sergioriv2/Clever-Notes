import { NotexCategory } from '../entities';
import { NOTE_CATEGORY_REPOSITORY as repo } from '../core/constants';

export const noteCategoryProviders = [
  {
    provide: repo,
    useValue: NotexCategory,
  },
];
