import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaClient } from 'src/generated/prisma/client';
import { BorrowBookDto } from './dto/borrow-book-dto';
import { ReturnBookDto } from './dto/return-book-dto';

@Injectable()
export class CirculationService {
  constructor(private prisma: PrismaClient) {}

  async borrowBook(borrowBookDto: BorrowBookDto) {
    const { customerId, bookCopyId, expectedDateReturned } = borrowBookDto;

    const isAvailable = await this.checkBookCopyAvailability(
      borrowBookDto.bookCopyId,
    );

    if (!isAvailable) {
      throw new ConflictException('Book copy is not available');
    }

    const [loanedBook] = await this.prisma.$transaction([
      this.prisma.bookLoan.create({
        data: {
          customerId,
          bookCopyId,
          dateBorrowed: new Date(),
          status: 'LOANED',
          expectedDateReturned: new Date(expectedDateReturned),
        },
      }),
      this.prisma.bookCopy.update({
        where: { id: bookCopyId },
        data: { status: 'LOANED' },
      }),
    ]);

    return {
      message: 'Book borrowed successfully',
      loanedBook,
    };
  }

  async returnBook(returnBookDto: ReturnBookDto) {
    const { customerId, bookCopyId, dateReturned } = returnBookDto;

    const isLoanActive = await this.prisma.bookLoan.findFirst({
      where: {
        customerId,
        bookCopyId,
        dateReturned: null,
      },
    });

    if (!isLoanActive) throw new BadRequestException('Cannot Find Active Loan');

    const [returnedLoan, updatedBookCopy] = await this.prisma.$transaction([
      this.prisma.bookLoan.update({
        where: {
          id: isLoanActive.id,
        },
        data: {
          dateReturned: new Date(),
        },
      }),
      this.prisma.bookCopy.update({
        where: {
          id: bookCopyId,
        },
        data: { status: 'AVAILABLE' },
      }),
    ]);

    return {
      loan: returnedLoan,
      copy: updatedBookCopy,
    };
  }

  async checkBookCopyAvailability(bookId: string) {
    if (!bookId) {
      throw new BadRequestException('Book ID is required');
    }

    const availableCopy = await this.prisma.bookCopy.findFirst({
      where: {
        bookId,
        status: 'AVAILABLE',
        deletedAt: null,
      },
    });

    return !!availableCopy;
  }
}
