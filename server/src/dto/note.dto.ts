import { IsNotEmpty, IsBoolean, IsString, IsOptional } from 'class-validator';

export class Note {
  readonly id?: number;

  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly content?: string;

  @IsBoolean()
  @IsOptional()
  readonly archived: boolean;
}
