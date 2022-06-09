import { Sequelize } from 'sequelize-typescript';

import { Note } from 'src/modules/note/note.entity';
import { NotexCategory } from 'src/modules/note-category/note-category.entity';
import { User } from 'src/modules/user/user.entity';
import { Category } from 'src/modules/category/category.entity';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      console.log(config);
      const sequelize = new Sequelize(config);
      sequelize.addModels([Note, NotexCategory, User, Category]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
