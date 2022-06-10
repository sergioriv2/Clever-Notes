import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
  constructor(private noteService: NoteService) {}

  @Get()
  async getAll(): Promise<NoteEntity[]> {
    return await this.noteService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<NoteEntity> {
    return await this.noteService.getById(id);
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

    if (!result) throw new NotFoundException();

    return { msg: 'Successfully updated.' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<object> {
    const result = await this.noteService.delete(id);

    if (!result) throw new NotFoundException();

    return { msg: 'Successfully updated.' };
  }
}
