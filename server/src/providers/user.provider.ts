import { User } from '../entities';
import { USER_REPOSITORY } from '../core/constants';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
