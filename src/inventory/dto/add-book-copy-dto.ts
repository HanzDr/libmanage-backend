import { IsNotEmpty, IsString } from 'class-validator';

export class AddBookCopyDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}
