import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from 'src/services';
import { Note as NoteEntity } from '../entities';
import { Note as NoteDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  // Retrieve all active notes from the user requesting the endpoint
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(@Request() req): Promise<object> {
    const results = await this.noteService.getAll(req.user.id);
    return { results };
  }

  // Retrieve all archived notes from the user requesting the endpoint
  @UseGuards(AuthGuard('jwt'))
  @Get('/archive')
  async getAllArchived(@Request() req): Promise<object> {
    const results = await this.noteService.getAllArchived(req.user.id);
    return { results };
  }

  // Retrieve a specific note from the user requesting the endpoint
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getOne(@Param('id') id: number, @Request() req): Promise<object> {
    const results = await this.noteService.getById(id, req.user.id);
    return { results };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() note: NoteDto, @Request() req): Promise<object> {
    const result = await this.noteService.create(note, req.user.id);

    if (!result) throw new InternalServerErrorException();

    return { results: { msg: 'Note successfully created.', note: result } };
  }

  // Modify the archive state of a specified note
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/archive/:state')
  async archiveNote(
    @Param('id') id: number,
    @Param('state') state: boolean,
  ): Promise<object> {
    const result = await this.noteService.archive(id, state);

    if (!result) throw new InternalServerErrorException();

    return { results: { msg: 'Note successfully updated.' } };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() note: NoteDto,
  ): Promise<object> {
    const result = await this.noteService.update(note, id);

    if (!result) throw new InternalServerErrorException();

    return { results: { msg: 'Note successfully updated.' } };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<object> {
    const result = await this.noteService.delete(id);

    if (!result) throw new InternalServerErrorException();

    return { results: { msg: 'Note successfully deleted.' } };
  }
}
