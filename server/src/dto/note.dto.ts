import { IsNotEmpty } from 'class-validator';

export class Note {
  readonly id: number;

  @IsNotEmpty()
  readonly title: string;

  readonly content: string;

  readonly archived: boolean;
}
