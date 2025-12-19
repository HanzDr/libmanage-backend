import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBookCopyStatusDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
