import { IsBoolean, IsString, IsOptional, IsNotEmpty } from 'class-validator';
export class Note {
  readonly id?: number;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly content?: string;

  @IsBoolean()
  @IsOptional()
  readonly archived: boolean;
}
