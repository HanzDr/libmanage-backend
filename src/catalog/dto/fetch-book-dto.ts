import { IsNumber, IsOptional, Min } from 'class-validator';
import { BookFilterDto } from './book-filter-dto';

export class FetchBookDto extends BookFilterDto {
  @IsNumber()
  @IsOptional()
  @Min(1)
  page: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  limit: number;
}
