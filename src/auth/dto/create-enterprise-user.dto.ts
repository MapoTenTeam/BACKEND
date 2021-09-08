import { IsNotEmpty } from 'class-validator';

export class CreateEnterpriseUserDto {
  @IsNotEmpty()
  description: string;
}
