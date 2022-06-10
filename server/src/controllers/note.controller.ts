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

  // Retrieve all notes from the user requesting the endpoint
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(@Request() req): Promise<object> {
    const results = await this.noteService.getAll(req.user.id);
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
  async create(@Body() note: NoteDto, @Request() req): Promise<NoteEntity> {
    return await this.noteService.create(note, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() note: NoteDto,
  ): Promise<object> {
    const result = await this.noteService.update(note, id);

    if (!result) throw new InternalServerErrorException();

    return { results: { msg: 'Successfully updated.' } };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<object> {
    const result = await this.noteService.delete(id);

    if (!result) throw new InternalServerErrorException();

    return { results: { msg: 'Successfully updated.' } };
  }
}
