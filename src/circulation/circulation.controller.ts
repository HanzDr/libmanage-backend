import { Controller, Post, Patch } from '@nestjs/common';
import { CirculationService } from './circulation.service';
import { BorrowBookDto } from './dto/borrow-book-dto';
import { ReturnBookDto } from './dto/return-book-dto';

@Controller('circulation')
export class CirculationController {
  constructor(private circulationService: CirculationService) {}

  @Post('borrow')
  async borrowBook(borrowBookDto: BorrowBookDto) {
    return this.circulationService.borrowBook(borrowBookDto);
  }

  @Patch()
  async returnBook(returnBookDto: ReturnBookDto) {
    return this.circulationService.returnBook(returnBookDto);
  }
}
