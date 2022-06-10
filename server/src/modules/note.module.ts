import { Module } from '@nestjs/common';
import { notesProviders } from 'src/providers';
import { NoteController } from '../controllers/note.controller';
import { NoteService } from '../services/note.service';

@Module({
  controllers: [NoteController],
  providers: [NoteService, ...notesProviders],
  exports: [NoteService],
})
export class NoteModule {}
