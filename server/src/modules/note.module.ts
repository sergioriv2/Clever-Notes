import { Module } from '@nestjs/common';
import { NoteController } from '../controllers/note.controller';

@Module({
  controllers: [NoteController],
})
export class NoteModule {}
