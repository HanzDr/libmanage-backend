import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaClient } from 'src/generated/prisma/client';
import { BorrowBookDto } from './dto/borrow-book-dto';
import { ReturnBookDto } from './dto/return-book-dto';
import { ReputationService } from 'src/reputation/reputation.service';

@Injectable()
export class CirculationService {
  constructor(
    private prisma: PrismaClient,
    private reputationSerivce: ReputationService,
  ) {}

  async borrowBook(bookCopyId: string, borrowBookDto: BorrowBookDto) {
    const { customerId, expectedDateReturned } = borrowBookDto;

    const isBookCopyAvailable = await this.checkBookCopyAvailability(
      borrowBookDto.bookCopyId,
    );

    if (!isBookCopyAvailable) {
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
      this.prisma.customer.update({
        where: {
          id: customerId,
        },
        data: {
          booksLoanedCount: { increment: 1 },
        },
      }),
    ]);

    return {
      message: 'Book borrowed successfully',
      loanedBook,
    };
  }

  async returnBook(bookCopyId: string, returnBookDto: ReturnBookDto) {
    const { customerId } = returnBookDto;

    // Check is the book loaned exists
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

    if (!returnedLoan.dateReturned) {
      throw new Error('dateReturned was not set after returning loan');
    }

    const updatedCustomerReputationScore =
      await this.reputationSerivce.updateCustomerReputationScore(
        customerId,
        returnedLoan.dateReturned,
        returnedLoan.expectedDateReturned,
      );

    return {
      loan: returnedLoan,
      copy: updatedBookCopy,
      customer: updatedCustomerReputationScore,
    };
  }

  async checkBookCopyAvailability(bookCopyId: string) {
    if (!bookCopyId) {
      throw new BadRequestException('Book ID is required');
    }

    const availableCopy = await this.prisma.bookCopy.findFirst({
      where: {
        id: bookCopyId,
        status: 'AVAILABLE',
        deletedAt: null,
      },
    });

    return !!availableCopy;
  }
}
