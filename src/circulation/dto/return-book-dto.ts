import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class ReturnBookDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsDateString()
  dateReturned: string;
}
