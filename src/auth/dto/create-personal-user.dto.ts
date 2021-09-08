import { IsNotEmpty } from 'class-validator';

export class CreatePersonalUserDto {
  @IsNotEmpty()
  description: string;
}
