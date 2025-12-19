import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
export class BorrowBookDto {
  @IsString()
  @IsNotEmpty()
  bookCopyId: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsDateString()
  expectedDateReturned: string;
}
