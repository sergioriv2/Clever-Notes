import { Note } from '../entities';
import { NOTE_REPOSITORY as repo } from '../core/constants';

export const notesProviders = [
  {
    provide: repo,
    useValue: Note,
  },
];
