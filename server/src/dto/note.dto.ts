import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class Note {
  readonly id?: number;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsString()
  readonly content?: string;

  @IsBoolean()
  readonly archived: boolean;
}
