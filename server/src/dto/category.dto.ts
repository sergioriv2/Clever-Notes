import { IsNotEmpty } from 'class-validator';

export class Category {
  readonly id: number;

  @IsNotEmpty()
  readonly description: string;
}
