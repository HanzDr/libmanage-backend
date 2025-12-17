import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  bookTitle: string;

  @IsDateString()
  @IsOptional()
  publishedAt: string;

  @IsString()
  genre: string;

  @IsString()
  @IsOptional()
  edition: string;

  @IsString()
  language: string;

  @IsString()
  @IsOptional()
  isbn: string;
}
