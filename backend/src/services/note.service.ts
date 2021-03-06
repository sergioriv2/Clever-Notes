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

  // Get a note by ID
  async getById(id: number, userId: number): Promise<Note> {
    const data = await this.noteRepository.findOne<Note>({
      where: { id, userId, deletedAt: null },
      attributes: ['title', 'content', 'id'],
    });

    if (!data) throw new NotFoundException('Note not found.');

    return data;
  }

  // Create a new note
  async create(note: NoteDto, id: number): Promise<Note> {
    const date = new Date();

    return await this.noteRepository.create<Note>({
      content: note.content,
      title: note.title,
      userId: id,
      createdAt: date,
      updatedAt: date,
    });
  }

  // Change the archived note state
  async archive(id: number, archive: boolean): Promise<boolean> {
    const data = await this.noteRepository.findOne<Note>({
      where: { id, deletedAt: null },
    });

    if (!data) throw new NotFoundException('Note not found.');

    data.set({
      archived: archive,
      updatedAt: new Date(),
    });

    await data.save();

    return true;
  }

  // Get all active notes from the user
  async getAll(userId: number): Promise<Note[]> {
    return await this.noteRepository.findAll<Note>({
      where: { deletedAt: null, userId, archived: false },
      attributes: ['id', 'title', 'content', 'updatedAt', 'createdAt'],
    });
  }

  // Get all active notes from the user
  async getAllArchived(userId: number): Promise<Note[]> {
    return await this.noteRepository.findAll<Note>({
      where: { deletedAt: null, userId, archived: true },
      attributes: ['id', 'title', 'content', 'updatedAt', 'createdAt'],
    });
  }

  // Update a note
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

  // Delete a note by ID
  async delete(id: number): Promise<boolean> {
    const data = await this.noteRepository.findOne<Note>({
      where: { id, deletedAt: null },
    });

    if (!data) throw new NotFoundException('Note not found.');

    await data.destroy();

    return true;
  }
}
