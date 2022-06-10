import { IsNotEmpty, IsString } from 'class-validator';

export class Category {
  readonly id?: number;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
