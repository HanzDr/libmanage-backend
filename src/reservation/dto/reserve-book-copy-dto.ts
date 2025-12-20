import { IsDate, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class ReserveBookCopyDto {
  @IsUUID()
  customerId: string;

  @Type(() => Date)
  @IsDate()
  expectedDateBorrowed: Date;

  @Type(() => Date)
  @IsDate()
  expectedDateReturned: Date;
}
