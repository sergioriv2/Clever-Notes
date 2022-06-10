import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class User {
  readonly id?: number;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
