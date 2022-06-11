import { IsNotEmpty, IsNumber } from 'class-validator';

export class NoteCategory {
  readonly id?: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  readonly categories: number[];
}
