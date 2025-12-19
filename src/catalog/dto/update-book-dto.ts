import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  bookTitle?: string;

  @IsDateString()
  @IsOptional()
  publishedAt?: string;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsString()
  @IsOptional()
  edition?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  language?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  isbn?: string;
}
