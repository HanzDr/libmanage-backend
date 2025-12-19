import { IsNotEmpty, IsString } from 'class-validator';

export class AddBookCopyDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  bookId: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
