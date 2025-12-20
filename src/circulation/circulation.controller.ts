import { Controller, Post, Patch, Param, Body } from '@nestjs/common';
import { CirculationService } from './circulation.service';
import { BorrowBookDto } from './dto/borrow-book-dto';
import { ReturnBookDto } from './dto/return-book-dto';

@Controller('circulation')
export class CirculationController {
  constructor(private circulationService: CirculationService) {}

  @Post('loans/:bookCopyId/borrow')
  async borrowBook(
    @Param('bookCopyId') bookCopyId: string,
    @Body() borrowBookDto: BorrowBookDto,
  ) {
    return this.circulationService.borrowBook(bookCopyId, borrowBookDto);
  }

  @Patch('loans/:bookCopyId/return')
  async returnBook(
    @Param('bookCopyId') bookCopyId: string,
    @Body() returnBookDto: ReturnBookDto,
  ) {
    return this.circulationService.returnBook(bookCopyId, returnBookDto);
  }
}
