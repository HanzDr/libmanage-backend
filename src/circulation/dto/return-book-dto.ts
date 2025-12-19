import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class ReturnBookDto {
  @IsString()
  @IsNotEmpty()
  bookCopyId: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsDateString()
  dateReturned: string;
}
