import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaClient } from 'src/generated/prisma/client';
import { UpdateReservationStatusDto } from './dto/update-reservation-status-dto';
import { ReserveBookCopyDto } from './dto/reserve-book-copy-dto';
@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaClient) {}
  async reserveBookCopy(bookCopyId: string, dto: ReserveBookCopyDto) {
    const { customerId, expectedDateBorrowed, expectedDateReturned } = dto;

    const isAvailable = await this.checkBookCopyAvailabilityOnReservedDate(
      bookCopyId,
      expectedDateBorrowed,
      expectedDateReturned,
    );

    if (!isAvailable) {
      throw new ConflictException('Book Copy is not available for those dates');
    }

    const reserved = await this.prisma.bookReserve.create({
      data: {
        customerId,
        bookCopyId,
        expectedDateBorrowed,
        expectedDateReturned,
        status: 'RESERVED',
      },
    });

    return { message: 'Book Reserved Successfully', reservedCopy: reserved };
  }

  async cancelBookCopyReservation(bookReservationId: string) {
    const cancelledBookReservation = await this.prisma.bookReserve.update({
      where: {
        id: bookReservationId,
      },
      data: { status: 'CANCELLED' },
    });
    return {
      message: 'Cancelled the reservation successfully',
      cancelledBookId: cancelledBookReservation.id,
    };
  }

  async checkBookCopyAvailabilityOnReservedDate(
    bookCopyId: string,
    expectedDateBorrowed: Date,
    expectedDateReturned: Date,
  ): Promise<boolean> {
    // 1) conflicts with active loan?
    const conflictingLoan = await this.prisma.bookLoan.findFirst({
      where: {
        bookCopyId,
        dateReturned: null,
        expectedDateReturned: { gt: expectedDateBorrowed },
      },
      select: { id: true },
    });

    if (conflictingLoan) return false;

    // 2) conflicts with existing reservation? (date overlap)
    const conflictingReserve = await this.prisma.bookReserve.findFirst({
      where: {
        bookCopyId,
        status: { not: 'CANCELLED' },
        AND: [
          { expectedDateBorrowed: { lt: expectedDateReturned } },
          { expectedDateReturned: { gt: expectedDateBorrowed } },
        ],
      },
      select: { id: true },
    });

    return !conflictingReserve;
  }
}
