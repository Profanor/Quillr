import { IsString, IsEmail } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
