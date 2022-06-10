import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NOTE_REPOSITORY } from 'src/core/constants';
import { Note } from 'src/entities';
import { Note as NoteDto } from '../dto';

@Injectable()
export class NoteService {
  constructor(
    @Inject(NOTE_REPOSITORY)
    private readonly noteRepository: typeof Note,
  ) {}

  async getById(id: number): Promise<Note> {
    const data = await this.noteRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!data) throw new NotFoundException('Note not found.');

    return data;
  }

  async create(note: NoteDto, id: number): Promise<Note> {
    const date = new Date();

    return await this.noteRepository.create<Note>({
      ...note,
      userId: id,
      createdAt: date,
      updatedAt: date,
    });
  }

  async getAll(): Promise<Note[]> {
    return await this.noteRepository.findAll<Note>({
      where: { deletedAt: null },
    });
  }
  async update(note: NoteDto, id: number): Promise<boolean> {
    const data = await this.noteRepository.findOne<Note>({
      where: { id, deletedAt: null },
    });

    if (!data) throw new NotFoundException('Note not found.');

    data.set({
      content: note.content,
      title: note.title,
      archived: note.archived,
      updatedAt: new Date(),
    });

    await data.save();

    return true;
  }

  async delete(id: number): Promise<boolean> {
    const data = await this.noteRepository.findOne<Note>({
      where: { id, deletedAt: null },
    });

    if (!data) throw new NotFoundException('Note not found.');

    await data.destroy();

    return true;
  }
}
