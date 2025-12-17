import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class BookPaginationDto {
  @IsNumber()
  @IsOptional()
  @Min(1)
  page: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  limit: number;
}
