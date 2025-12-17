import { IsOptional, IsString } from 'class-validator';

export class BookFilterDto {
  @IsOptional()
  @IsString()
  bookTitle?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsString()
  language?: string;
}
